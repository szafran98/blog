<template>
  <div class="post-form-container">
    <form action="" class="post-form" @submit.prevent="addPost(postContent)">
      <textarea
        name="new-post-input"
        id="new-post-input"
        cols="30"
        rows="10"
        v-model="postContent"
      ></textarea>
      <button type="submit">Add post</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePosts } from '@/composable/usePosts'

export default defineComponent({
  name: 'PostForm',
  setup() {
    const { addPost } = usePosts()

    const postContent = ref('')

    return {
      addPost,
      postContent,
    }
  },
})
</script>

<style scoped></style>
