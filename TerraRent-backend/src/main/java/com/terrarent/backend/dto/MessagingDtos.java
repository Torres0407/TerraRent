package com.terrarent.backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CreateConversationRequest {
    private Long recipientId;
    private Long propertyId;
    private String initialMessage;
}

@Data
public class SendMessageRequest {
    private String content;
}

@Data
public class ConversationDto {
    private Long id;
    private Long propertyId;
    private Long participant1Id;
    private Long participant2Id;
    private String lastMessage;
    private LocalDateTime lastMessageAt;
    private boolean hasUnreadMessages;
}

@Data
public class MessageDto {
    private Long id;
    private Long conversationId;
    private Long senderId;
    private String content;
    private LocalDateTime sentAt;
    private boolean isRead;
}