import apiClient from './api'

const commentService = {
  createComment: async (movieId, data) => {
    const response = await apiClient.post(`/comment/movies/${movieId}`, data)
    return response.data
  },

  getRootComments: async (movieId, { page = 0, size = 10 } = {}) => {
    const response = await apiClient.get(`/comment/movies/${movieId}`, {
      params: { page, size }
    })
    return response.data
  },

  getReplies: async (commentId, { page = 0, size = 10 } = {}) => {
    const response = await apiClient.get(`/comment/${commentId}/replies`, {
      params: { page, size }
    })
    return response.data
  },

  updateComment: async (commentId, data) => {
    const response = await apiClient.put(`/comment/${commentId}`, data)
    return response.data
  },

  deleteComment: async (commentId) => {
    await apiClient.delete(`/comment/${commentId}`)
  },

  toggleLike: async (commentId) => {
    const response = await apiClient.post(`/comment/${commentId}/like`)
    return response.data
  }
}

export default commentService
