import { api } from '../client';
import { SendMessageRequest } from '../types/requests';
import {
    ConversationResponse,
    MessageResponse
} from '../types/responses';

export const messagingApi = {
  /**
   * Get all conversations for current user
   * GET /api/conversations
   */
  getConversations: () => 
    api.get<ConversationResponse[]>('/conversations'),

  /**
   * Get messages in a specific conversation
   * GET /api/conversations/{id}/messages
   */
  getConversationMessages: (conversationId: number) => 
    api.get<MessageResponse[]>(`/conversations/${conversationId}/messages`),

  /**
   * Send a message
   * POST /api/messages
   */
  sendMessage: (data: SendMessageRequest) => 
    api.post<MessageResponse>('/messages', data),

  /**
   * Get all messages (alternative endpoint)
   * GET /api/messages
   */
  getAllMessages: () => 
    api.get<MessageResponse[]>('/messages'),
};