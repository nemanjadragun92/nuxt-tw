<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="font-bold mb-12">Child data `$route`</h1>
      <pre class="text-left">
      {{ returnRouteData }}
    </pre
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PagesExamplesPostsIdChild extends Vue {
  // Getters

  get returnRouteData(): {
    fullPath: string
    name: string
    params: {
      id: string
      child: string
    }
    path: string
  } {
    return {
      fullPath: this.$route.fullPath! as string,
      name: this.$route.name! as string,
      params: this.$route.params! as {
        id: string
        child: string
      },
      path: this.$route.path! as string,
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
