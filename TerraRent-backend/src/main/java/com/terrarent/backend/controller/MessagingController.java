package com.terrarent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terrarent.backend.service.MessagingService;

@RestController
@RequestMapping("/api/messaging")
@PreAuthorize("hasAnyRole('RENTER', 'LANDLORD')")
public class MessagingController {

    @Autowired
    private MessagingService messagingService;

    @PostMapping("/conversations")
    public ResponseEntity<ConversationDto> createConversation(@RequestBody CreateConversationRequest request) {
        ConversationDto conversation = messagingService.createConversation(request);
        return ResponseEntity.ok(conversation);
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationDto>> getConversations() {
        List<ConversationDto> conversations = messagingService.getConversations();
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/conversations/{conversationId}/messages")
    public ResponseEntity<List<MessageDto>> getMessages(@PathVariable Long conversationId) {
        List<MessageDto> messages = messagingService.getMessages(conversationId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/conversations/{conversationId}/messages")
    public ResponseEntity<MessageDto> sendMessage(@PathVariable Long conversationId, @RequestBody SendMessageRequest request) {
        MessageDto message = messagingService.sendMessage(conversationId, request);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/conversations/{conversationId}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long conversationId) {
        messagingService.markAsRead(conversationId);
        return ResponseEntity.ok().build();
    }
}