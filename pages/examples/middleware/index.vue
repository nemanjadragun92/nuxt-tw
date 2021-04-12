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
                v-model.trim="$v.email.$model"
                type="email"
                name="email"
                placeholder="you@company.com"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <template v-if="error">
                <div v-if="!$v.email.required" class="error">
                  Email is required
                </div>
                <div v-else-if="!$v.email.email" class="error">
                  Email is invalid
                </div>
              </template>
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
                v-model.trim="$v.password.$model"
                type="password"
                name="password"
                placeholder="Your Password"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <template v-if="error">
                <div v-if="!$v.password.required" class="error">
                  Password is required
                </div>
              </template>
            </div>
            <div class="mb-6">
              <button
                :disabled="loading"
                type="submit"
                class="w-full py-3 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ loading ? 'Loading...' : 'Sign in' }}
              </button>
            </div>
          </form>
          <nuxt-link
            class="text-sm text-purple-500"
            to="/examples/middleware/protected"
            >Click here to go to protected route</nuxt-link
          >
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
import { required, email } from 'vuelidate/lib/validators'
import { Component, Vue } from 'nuxt-property-decorator'
import { validationMixin } from 'vuelidate'
import { UserInterface } from '~/store/auth'

@Component({
  mixins: [validationMixin],
  middleware: ['login'],
  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
    },
  },
})
export default class ExamplesMiddleware extends Vue {
  users: UserInterface[] = []
  email: string = ''
  password: string = ''
  loading: boolean = false
  error: { title: string; message: string } | null = null

  // Hooks
  async fetch() {
    await this.getUsers()
  }

  // Methods
  async getUsers() {
    try {
      this.users = await this.$content(`users`).fetch<any>()
    } catch (e) {
      console.error('Could not fetch users')
    }
  }

  async onLogin() {
    this.loading = true
    const userAccount = this.users.find(
      (user) =>
        user.email === this.$v.email.$model &&
        user.password === this.$v.password.$model
    )
    this.$v.$touch()
    if (this.$v.$invalid) {
      this.error = {
        title: 'Form invalid!',
        message: 'Email or password is invalid. Please check the form...',
      }
    } else if (!userAccount) {
      this.error = {
        title: 'Wrong details!',
        message: 'Your account details are wrong. Please try again...',
      }
    } else {
      await this.$store.commit('auth/SET_USER', userAccount)
      await this.$router.push('/examples/middleware/protected')
    }

    // Reset error after 3 seconds
    setTimeout(() => {
      this.error = null
      this.loading = false
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.alert {
  @apply fixed top-2 right-2 z-50;
}
.error {
  @apply text-red-500 mt-1 text-xs;
}
</style>
