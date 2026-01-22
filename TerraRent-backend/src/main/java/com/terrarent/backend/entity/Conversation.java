package com.terrarent.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "conversations")
@Data
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "participant1_id", nullable = false)
    private User participant1;

    @ManyToOne
    @JoinColumn(name = "participant2_id", nullable = false)
    private User participant2;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    private String lastMessage;

    private LocalDateTime lastMessageAt;

    private LocalDateTime createdAt;
}