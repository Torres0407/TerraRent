import { messagingApi } from '../../api/endpoints/messaging';
import { SendMessageRequest } from '../../api/types/requests';
import { ConversationResponse, MessageResponse } from '../../api/types/responses';

/**
 * Messaging Service
 * Handles messaging business logic
 */
export const messagingService = {
  /**
   * Get all conversations for current user
   */
  async getConversations(): Promise<ConversationResponse[]> {
    const response = await messagingApi.getConversations();
    return response.data;
  },

  /**
   * Get messages in a specific conversation
   */
  async getConversationMessages(conversationId: number): Promise<MessageResponse[]> {
    const response = await messagingApi.getConversationMessages(conversationId);
    return response.data;
  },

  /**
   * Send a message
   */
  async sendMessage(data: SendMessageRequest): Promise<MessageResponse> {
    const response = await messagingApi.sendMessage(data);
    return response.data;
  },

  /**
   * Get all messages
   */
  async getAllMessages(): Promise<MessageResponse[]> {
    const response = await messagingApi.getAllMessages();
    return response.data;
  },
};