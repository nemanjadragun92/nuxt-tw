<template>
  <div
    class="bg-gradient-to-r from-purple-900 to-indigo-900 text-white min-h-screen flex items-center"
  >
    <div class="container mx-auto p-4 flex flex-wrap items-center">
      <div class="w-full md:w-5/12 text-center p-4">
        <img src="/images/not-found.svg" alt="Not Found" />
      </div>
      <div class="w-full md:w-7/12 text-center md:text-left p-4">
        <div
          class="text-6xl font-medium mb-1"
          v-text="returnError.statusCode"
        />
        <div class="text-xl md:text-3xl font-medium">
          {{ returnError.message }}
        </div>
        <div class="block mt-6">
          <nuxt-link
            to="/"
            class="inline-block border border-white rounded py-2 px-4"
            >Go Home</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'clean',
  props: ['error'], // you can set a custom layout for the error page
  computed: {
    returnError() {
      return Object(this.error)
    },
  },
}
</script>
