import apiClient from './api'

/**
 * Notification Service
 * Handle API calls related to notifications
 */
const notificationService = {
  /**
   * Get notifications
   * GET /notifications
   * @param {Object} params - { page, size }
   * @returns {Promise} PageResponse<NotificationDto>
   */
  async getNotifications({ page = 0, size = 10 } = {}) {
    const response = await apiClient.get('/notifications', {
      params: { page, size }
    })
    return response.data
  },

  /**
   * Get unread notification count
   * GET /notifications/unread-count
   * @returns {Promise} number
   */
  async getUnreadCount() {
    const response = await apiClient.get('/notifications/unread-count')
    return response.data
  },

  /**
   * Mark notification as read
   * PATCH /notifications/{notificationId}/read
   * @param {number} notificationId
   * @returns {Promise}
   */
  async markAsRead(notificationId) {
    const response = await apiClient.patch(`/notifications/${notificationId}/read`)
    return response.data
  },

  /**
   * Mark all notifications as read
   * PUT /notifications/read-all
   * @returns {Promise}
   */
  async markAllAsRead() {
    const response = await apiClient.put('/notifications/read-all')
    return response.data
  },

  /**
   * Delete notification
   * DELETE /notifications/{notificationId}
   * @param {number} notificationId
   * @returns {Promise}
   */
  async deleteNotification(notificationId) {
    const response = await apiClient.delete(`/notifications/${notificationId}`)
    return response.data
  }
}

export default notificationService
