import apiClient from './api'

/**
 * Review Service
 * Handle API calls related to reviews and ratings
 */
const reviewService = {
  /**
   * Create new review for movie
   * POST /movies/{movieId}/reviews
   * @param {number} movieId
   * @param {Object} data - { rating, comment }
   * @returns {Promise} ReviewDto
   */
  async createReview(movieId, data) {
    const response = await apiClient.post(`/movies/${movieId}/reviews`, data)
    return response.data
  },

  /**
   * Get movie's reviews
   * GET /movies/{movieId}/reviews
   * @param {number} movieId
   * @param {Object} params - { page, size }
   * @returns {Promise} PageResponse<ReviewDto>
   */
  async getReviews(movieId, { page = 0, size = 10 } = {}) {
    const response = await apiClient.get(`/movies/${movieId}/reviews`, {
      params: { page, size }
    })
    return response.data
  },

  /**
   * Get movie rating summary
   * GET /movies/{movieId}/rating
   * @param {number} movieId
   * @returns {Promise} RatingSummaryDto { averageRating, totalReviews }
   */
  async getMovieRating(movieId) {
    const response = await apiClient.get(`/movies/${movieId}/rating`)
    return response.data
  },

  /**
   * Update review
   * PUT /reviews/{reviewId}
   * @param {number} reviewId
   * @param {Object} data - { rating, comment }
   * @returns {Promise} ReviewDto
   */
  async updateReview(reviewId, data) {
    const response = await apiClient.put(`/reviews/${reviewId}`, data)
    return response.data
  },

  /**
   * Delete review
   * DELETE /reviews/{reviewId}
   * @param {number} reviewId
   * @returns {Promise}
   */
  async deleteReview(reviewId) {
    const response = await apiClient.delete(`/reviews/${reviewId}`)
    return response.data
  }
}

export default reviewService
