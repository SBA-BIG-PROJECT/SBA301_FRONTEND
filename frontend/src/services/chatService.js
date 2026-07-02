import apiClient from './api'

const chatService = {
  // Create a new chat session
  createSession: () => apiClient.post('/chat/sessions'),

  // Get all sessions for the current user
  getSessions: () => apiClient.get('/chat/sessions'),

  // Get session details with message history
  getSession: (sessionId) => apiClient.get(`/chat/sessions/${sessionId}`),

  // Send a message to a session and get AI response
  sendMessage: (sessionId, message) =>
    apiClient.post(`/chat/sessions/${sessionId}/messages`, { message }),

  // Delete a session
  deleteSession: (sessionId) => apiClient.delete(`/chat/sessions/${sessionId}`),
}

export default chatService
