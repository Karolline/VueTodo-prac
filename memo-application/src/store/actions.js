import axios from 'axios';
import { FETCH_MEMOS, ADD_MEMO, DELETE_MEMO, EDIT_MEMO } from './mutations-types';

const memoAPICore = axios.create({
    baseURL: 'http://localhost:8000/api/memos'
});

// function 앞에 export, 없애도 되나? 
export function fetchMemos ({ commit }) {
    memoAPICore.get('/')
    .then(res => {
        // API호출 결과 데이터를 payload로 삼아 FECH_MEMOS라는 mutation을 커밋한다
        commit(FETCH_MEMOS, res.data);
    })
}

export function addMemo ({ commit}, payload) {
    memoAPICore.post('/', payload)
    .then(res => {
        commit(ADD_MEMO, res.data);
    });
}

export function deleteMemo ({ commit }, id) {
    memoAPICore.delete(`/${id}`)
    .then(() => {
        commit(DELETE_MEMO, id);
    })
}

export function updateMemo ({ commit }, payload) {
    const {id, content} = payload;
    memoAPICore.put(`${id}`, {content})
    .then(() => {
        commit(EDIT_MEMO, payload);
    })
}

export default {
    fetchMemos,
    addMemo,
    deleteMemo,
    updateMemo
}