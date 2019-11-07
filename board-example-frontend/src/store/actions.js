import api from '@/api'
import { FETCH_POST_LIST, FETCH_POST, SET_ACCESS_TOKEN, SET_MY_INFO } from './mutation-types'

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
    },
    signin ({ commit }, payload) {
        const {email, password} = payload
        return api.post('/auth/signin', {email, password})
        .then(res => {
            const {accessToken} = res.data
            commit(SET_ACCESS_TOKEN, accessToken)
            return api.get('/users/me') // 헤더에 token이 저장되었으므로 사용자 정보 로드 가능
        }).then(res => {
            commit(SET_MY_INFO, res.data)
        })
    },
    signinByToken ({ commit }, token) {
        commit(SET_ACCESS_TOKEN, token)
        return api.get('/users/me')
        .then(res => {
            commit(SET_MY_INFO, res.data)
        })
    }
}