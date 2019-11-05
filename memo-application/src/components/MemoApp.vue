<template>
    <div class="memo-app">
        <memo-form @addMemo="addMemo" />
        <ul class="memo-list">
        <memo v-for="memo in memos"
                :key="memo.id"
                :memo="memo"
                @deleteMemo = "deleteMemo"
                @updateMemo = "updateMemo" />
        </ul>
    </div>
</template>

<script>
import MemoForm from "./MemoForm";
import Memo from "./Memo";
import axios from "axios";
const memoAPICore = axios.create({
    baseURL: 'http://localhost:8000/api/memos'
});

export default {
    name: 'MemoApp',
    components: {
        MemoForm,
        Memo
    },
    data () {
        return {
            memos: []
        };
    },
    methods: {
        addMemo (payload) {
            memoAPICore.post('/', payload)
            .then(res => {
                this.memos.push(res.data);
            })
        },
        deleteMemo (id) {
            const targetIndex = this.memos.findIndex(v => v.id === id);
            memoAPICore.delete(`/${id}`)
            .then(() => {
                this.memos.splice(targetIndex, 1);
            });
        },
        updateMemo (payload) {
            const {id, content} = payload;
            const targetIndex = this.memos.findIndex(v => v.id === id);
            const targetMemo = this.memos[targetIndex];
            memoAPICore.put(`/${id}`, {content})
            .then(() => {
                this.memos.splice(targetIndex, 1, {...targetMemo, content});
            })
        }
    },
    created () {
        memoAPICore.get('/')
        .then(res => {
            this.memos = res.data;
        })
    }
}
</script>

<style scoped>
.memo-list {
    padding: 20px 0;
    margin: 0;
}

</style>