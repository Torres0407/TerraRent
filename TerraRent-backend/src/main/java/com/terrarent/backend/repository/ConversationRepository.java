package com.terrarent.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.terrarent.backend.entity.Conversation;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("SELECT c FROM Conversation c WHERE (c.participant1.id = :userId OR c.participant2.id = :userId)")
    List<Conversation> findByParticipant(@Param("userId") Long userId);

    @Query("SELECT c FROM Conversation c WHERE " +
           "((c.participant1.id = :user1Id AND c.participant2.id = :user2Id) OR " +
           "(c.participant1.id = :user2Id AND c.participant2.id = :user1Id)) AND " +
           "(:propertyId IS NULL OR c.property.id = :propertyId)")
    Conversation findByParticipants(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id, @Param("propertyId") Long propertyId);
}