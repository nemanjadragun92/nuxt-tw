<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10">
        <div class="text-center">
          <h1
            class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Welcome to protected route!
          </h1>
        </div>
        <div class="m-7">
          <button
            type="button"
            class="w-full py-3 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            @click="onLogout"
          >
            {{ 'Logout' }}
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="alert"
      class="alert flex flex-row items-center bg-blue-200 p-5 rounded border-b-2 border-blue-300"
    >
      <div
        class="alert-icon flex items-center bg-blue-100 border-2 border-blue-500 justify-center h-10 w-10 flex-shrink-0 rounded-full"
      >
        <span class="text-blue-500">
          <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <div class="alert-content ml-4">
        <div class="alert-title font-semibold text-lg text-blue-800">
          Welcome, {{ fullName }}!
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserInterface } from '~/store/auth'

@Component({
  middleware: ['auth'],
})
export default class ExamplesMiddlewareProtected extends Vue {
  alert: boolean = true

  // Hooks
  mounted() {
    // Fake alert and hide it after 3 seconds
    setTimeout(() => {
      this.alert = false
    }, 3000)
  }

  // Getters
  get user(): UserInterface {
    return this.$store.state.auth.user!
  }

  get fullName(): string {
    const { firstName, lastName } = this.user
    return `${firstName} ${lastName}`
  }

  // Methods
  async onLogout() {
    await this.$store.commit('auth/LOGOUT')
    await this.$router.push('/examples/middleware')
  }
}
</script>

<style lang="scss" scoped>
.alert {
  @apply fixed top-2 right-2 z-50;
}
</style>
