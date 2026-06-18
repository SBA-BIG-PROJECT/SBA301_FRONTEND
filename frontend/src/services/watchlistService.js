import apiClient from './api'

/**
 * Watchlist Service
 * Handle API calls related to watchlist
 */
const watchlistService = {
  /**
   * Add movie to watchlist
   * POST /watchlist/{movieId}
   * @param {number} movieId
   * @returns {Promise} WatchlistDto
   */
  async addToWatchlist(movieId) {
    const response = await apiClient.post(`/watchlist/${movieId}`)
    return response.data
  },

  /**
   * Get user's watchlist
   * GET /watchlist
   * @param {Object} params - { page, size }
   * @returns {Promise} PageResponse<WatchlistDto>
   */
  async getMyWatchlist({ page = 0, size = 20 } = {}) {
    const response = await apiClient.get('/watchlist', {
      params: { page, size }
    })
    return response.data
  },

  /**
   * Check if movie is in watchlist
   * GET /watchlist/check/{movieId}
   * @param {number} movieId
   * @returns {Promise} { isInWatchlist: boolean }
   */
  async checkInWatchlist(movieId) {
    const response = await apiClient.get(`/watchlist/check/${movieId}`)
    return response.data
  },

  /**
   * Remove movie from watchlist
   * DELETE /watchlist/{movieId}
   * @param {number} movieId
   * @returns {Promise}
   */
  async removeFromWatchlist(movieId) {
    const response = await apiClient.delete(`/watchlist/${movieId}`)
    return response.data
  }
}

export default watchlistService
