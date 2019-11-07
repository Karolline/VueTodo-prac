<template>
    <div class="post-view-page">
        <div class="post-view">
            <div>
                <h1>{{ post.title }}</h1>
                <span>{{ post.id }}</span>
                <strong>{{ post.user.name }} . {{ post.createdAt }}</strong>
            </div>
            <p>{{ post.contents }}</p>
        </div>
        <router-link :to="{ name: 'PostListPage' }">목록</router-link>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'PostViewPage',
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    created () {
        this.fetchPost(`${ this.postId }`)
        .catch(err => {
            alert(err.response.data.msg)
            this.$router.back()
        })
    },
    computed: {
        ...mapState([ 'post' ])
    },
    methods: {
        ...mapActions([ 'fetchPost' ])
    }
}
</script>