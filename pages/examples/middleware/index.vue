<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10">
        <div class="text-center">
          <h1
            class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Sign in
          </h1>
        </div>
        <div class="m-7">
          <form @submit.prevent="onLogin">
            <div class="mb-4">
              <label
                for="email"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >Email Address</label
              >
              <input
                id="email"
                v-model.trim="email"
                type="email"
                name="email"
                placeholder="you@company.com"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div class="mb-6">
              <div class="flex mb-2">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-400"
                  >Password</label
                >
              </div>
              <input
                id="password"
                v-model.trim="password"
                type="password"
                name="password"
                placeholder="Your Password"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div class="mb-6">
              <button
                type="submit"
                class="w-full py-3 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      v-if="error"
      class="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300"
    >
      <div
        class="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full"
      >
        <span class="text-red-500">
          <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <div class="alert-content ml-4">
        <div class="alert-title font-semibold text-lg text-red-800">
          {{ error.title }}
        </div>
        <div class="alert-description text-sm text-red-600">
          {{ error.message }}
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
export default class ExamplesMiddleware extends Vue {
  users: UserInterface[] = []
  email: string = ''
  password: string = ''
  error: { title: string; message: string } | null = null

  // Hooks
  async fetch() {
    await this.getUsers()
  }

  // Methods
  async getUsers() {
    try {
      this.users = await this.$content(`users`).fetch<any>()
      console.log('log', this.users)
    } catch (e) {
      console.log('error')
    }
  }

  onLogin() {
    const userAccount = this.users.find(
      (user) => user.email === this.email && user.password === this.password
    )
    if (!userAccount) {
      this.error = {
        title: 'Wrong details!',
        message: 'Your account details are wrong. Please try again...',
      }
    } else {
      console.log('ready to login')
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  @apply fixed top-2 right-2 z-50;
}
</style>
