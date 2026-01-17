import { useEffect, useState } from 'react';
import { handleApiError } from '../../api/client';
import { SendMessageRequest } from '../../api/types/requests';
import { ConversationResponse, MessageResponse } from '../../api/types/responses';
import { messagingService } from './functions';

/**
 * Hook to get all conversations
 */
export const useConversations = () => {
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await messagingService.getConversations();
      setConversations(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return { conversations, loading, error, refetch: fetchConversations };
};

/**
 * Hook to get messages in a conversation
 */
export const useConversationMessages = (conversationId: number | null) => {
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!conversationId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await messagingService.getConversationMessages(conversationId);
      setMessages(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  return { messages, loading, error, refetch: fetchMessages };
};

/**
 * Hook to send a message
 */
export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (data: SendMessageRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const message = await messagingService.sendMessage(data);
      return message;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};