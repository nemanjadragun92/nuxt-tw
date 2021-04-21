<template>
  <div
    v-if="$fetchState.pending"
    class="w-screen h-screen flex items-center justify-center"
  >
    Loading data...
  </div>
  <article v-else-if="post" class="py-12 px-4 max-w-3xl m-auto">
    <h1
      class="text-4xl text-center mb-4 font-semibold font-heading font-semibold"
      v-text="post.title"
    />
    <p class="text-center">
      <span>Wed 21. Apr, by</span>
      <a role="button" class="ml-1 text-indigo-600 hover:underline"
        >Nemanja Dragun</a
      >
    </p>

    <div class="mt-12 mb-4">
      <p class="whitespace-pre-wrap" v-html="post.body" />
    </div>
    <div class="flex justify-between">
      <nuxt-link
        :to="`/examples/posts/${$route.params.id}/my-dynamic-child-route-${$route.params.id}`"
        >Go to child route of post</nuxt-link
      >
      <nuxt-link to="/examples/posts">Go back</nuxt-link>
    </div>
  </article>
  <div v-else class="w-screen h-screen flex items-center justify-center">
    No results
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
export default class PagesExamplesPostsId extends Vue {
  // Data
  post: DataInterface | null = null

  // Hooks
  async fetch() {
    try {
      this.post = await this.$axios.$get(
        `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
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
