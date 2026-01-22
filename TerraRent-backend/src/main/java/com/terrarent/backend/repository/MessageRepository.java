package com.terrarent.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.terrarent.backend.entity.Message;
import com.terrarent.backend.entity.User;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySender(User sender);

    List<Message> findByReceiver(User receiver);

    List<Message> findBySenderAndReceiver(User sender, User receiver);
}