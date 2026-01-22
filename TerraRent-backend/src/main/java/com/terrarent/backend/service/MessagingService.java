package com.terrarent.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.terrarent.backend.dto.ConversationDto;
import com.terrarent.backend.dto.CreateConversationRequest;
import com.terrarent.backend.dto.MessageDto;
import com.terrarent.backend.dto.SendMessageRequest;
import com.terrarent.backend.entity.Conversation;
import com.terrarent.backend.entity.Message;
import com.terrarent.backend.entity.Property;
import com.terrarent.backend.entity.User;
import com.terrarent.backend.exception.ResourceNotFoundException;
import com.terrarent.backend.repository.ConversationRepository;
import com.terrarent.backend.repository.MessageRepository;
import com.terrarent.backend.repository.PropertyRepository;
import com.terrarent.backend.repository.UserRepository;

@Service
public class MessagingService {

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    public ConversationDto createConversation(CreateConversationRequest request) {
        User currentUser = getCurrentUser();
        User recipient = userRepository.findById(request.getRecipientId())
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found"));

        Property property = null;
        if (request.getPropertyId() != null) {
            property = propertyRepository.findById(request.getPropertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        }

        // Check if conversation already exists
        Conversation existingConversation = conversationRepository
                .findByParticipants(currentUser.getId(), recipient.getId(), request.getPropertyId());

        if (existingConversation != null) {
            return convertToConversationDto(existingConversation);
        }

        Conversation conversation = new Conversation();
        conversation.setParticipant1(currentUser);
        conversation.setParticipant2(recipient);
        conversation.setProperty(property);
        conversation.setCreatedAt(LocalDateTime.now());

        Conversation savedConversation = conversationRepository.save(conversation);

        // Send initial message if provided
        if (request.getInitialMessage() != null && !request.getInitialMessage().trim().isEmpty()) {
            Message initialMessage = new Message();
            initialMessage.setConversation(savedConversation);
            initialMessage.setSender(currentUser);
            initialMessage.setContent(request.getInitialMessage());
            initialMessage.setSentAt(LocalDateTime.now());
            initialMessage.setIsRead(false);

            messageRepository.save(initialMessage);

            savedConversation.setLastMessage(request.getInitialMessage());
            savedConversation.setLastMessageAt(LocalDateTime.now());
            conversationRepository.save(savedConversation);
        }

        return convertToConversationDto(savedConversation);
    }

    public List<ConversationDto> getConversations() {
        User currentUser = getCurrentUser();
        List<Conversation> conversations = conversationRepository.findByParticipant(currentUser.getId());
        return conversations.stream()
                .map(this::convertToConversationDto)
                .collect(Collectors.toList());
    }

    public List<MessageDto> getMessages(Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

        User currentUser = getCurrentUser();
        if (!conversation.getParticipant1().getId().equals(currentUser.getId()) &&
            !conversation.getParticipant2().getId().equals(currentUser.getId())) {
            throw new SecurityException("Unauthorized to view this conversation");
        }

        List<Message> messages = messageRepository.findByConversationIdOrderBySentAtAsc(conversationId);
        return messages.stream()
                .map(this::convertToMessageDto)
                .collect(Collectors.toList());
    }

    public MessageDto sendMessage(Long conversationId, SendMessageRequest request) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

        User currentUser = getCurrentUser();
        if (!conversation.getParticipant1().getId().equals(currentUser.getId()) &&
            !conversation.getParticipant2().getId().equals(currentUser.getId())) {
            throw new SecurityException("Unauthorized to send message in this conversation");
        }

        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(currentUser);
        message.setContent(request.getContent());
        message.setSentAt(LocalDateTime.now());
        message.setIsRead(false);

        Message savedMessage = messageRepository.save(message);

        // Update conversation's last message
        conversation.setLastMessage(request.getContent());
        conversation.setLastMessageAt(LocalDateTime.now());
        conversationRepository.save(conversation);

        return convertToMessageDto(savedMessage);
    }

    public void markAsRead(Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

        User currentUser = getCurrentUser();
        if (!conversation.getParticipant1().getId().equals(currentUser.getId()) &&
            !conversation.getParticipant2().getId().equals(currentUser.getId())) {
            throw new SecurityException("Unauthorized to access this conversation");
        }

        List<Message> unreadMessages = messageRepository.findByConversationIdAndSenderIdNotAndIsReadFalse(
                conversationId, currentUser.getId());
        unreadMessages.forEach(message -> message.setIsRead(true));
        messageRepository.saveAll(unreadMessages);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    private ConversationDto convertToConversationDto(Conversation conversation) {
        ConversationDto dto = new ConversationDto();
        dto.setId(conversation.getId());
        dto.setPropertyId(conversation.getProperty() != null ? conversation.getProperty().getId() : null);
        dto.setParticipant1Id(conversation.getParticipant1().getId());
        dto.setParticipant2Id(conversation.getParticipant2().getId());
        dto.setLastMessage(conversation.getLastMessage());
        dto.setLastMessageAt(conversation.getLastMessageAt());

        User currentUser = getCurrentUser();
        Long otherParticipantId = conversation.getParticipant1().getId().equals(currentUser.getId()) ?
                conversation.getParticipant2().getId() : conversation.getParticipant1().getId();
        boolean hasUnreadMessages = messageRepository.existsByConversationIdAndSenderIdAndIsReadFalse(
                conversation.getId(), otherParticipantId);
        dto.setHasUnreadMessages(hasUnreadMessages);

        return dto;
    }

    private MessageDto convertToMessageDto(Message message) {
        MessageDto dto = new MessageDto();
        dto.setId(message.getId());
        dto.setConversationId(message.getConversation().getId());
        dto.setSenderId(message.getSender().getId());
        dto.setContent(message.getContent());
        dto.setSentAt(message.getSentAt());
        dto.setRead(message.isRead());
        return dto;
    }
}