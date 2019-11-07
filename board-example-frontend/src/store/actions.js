import api from '@/api'
import { FETCH_POST_LIST, FETCH_POST } from './mutation-types'

export default {
    fetchPostList ({ commit }) {
        return api.get('/posts')
        .then(res => {
            commit(FETCH_POST_LIST, res.data)
        })
    },
    fetchPost ({ commit }, postId) { // 패러미터 있을 경우
        return api.get(`/posts/${postId}`)
        .then(res => {
            commit(FETCH_POST, res.data)
        })
    }
}