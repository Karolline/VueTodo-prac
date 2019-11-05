<template>
    <div class="post-list-page">
        <h1>포스트 게시글</h1>
        <post-list />
    </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
export default {
    name: 'PostListPage',
    components: { PostList }
}
</script>