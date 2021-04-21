<template>
  <div class="container flex mx-auto w-full items-center justify-center p-10">
    <ul class="flex flex-col">
      <li
        v-for="(post, postIndex) in posts"
        :key="postIndex"
        class="border-gray-400 flex flex-row mb-2"
        @click="$router.push(`/examples/posts/${post.id}`)"
      >
        <div
          class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4"
          >
            📖
          </div>
          <div class="flex-1 pl-1">
            <div class="font-medium" v-text="post.title" />
            <div class="text-gray-600 text-sm" v-text="post.body" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

interface DataInterface {
  userId?: string
  id: string
  title: string
  body: number
}

@Component
export default class PagesExamplesPostsIndex extends Vue {
  // Data
  posts: DataInterface[] = []

  // Hooks
  async fetch() {
    try {
      this.posts = await this.$axios.$get(
        'https://jsonplaceholder.typicode.com/posts'
      )
    } catch {
      console.error('Could not fetch any post')
    }
  }

  // SEO
  head() {
    return {
      title: 'Dynamic routing',
    }
  }
}
</script>
