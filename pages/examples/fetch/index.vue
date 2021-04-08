<template>
  <div
    class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5"
  >
    <div
      class="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
      style="max-width: 500px"
    >
      <div class="w-full pt-1 pb-6">
        <div
          class="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg"
        >
          <img
            :src="returnImage"
            alt="Chuck Norris icon"
            class="object-cover"
          />
        </div>
      </div>
      <div class="w-full mb-4">
        <div class="text-sm text-gray-600 text-center px-5">
          <p v-if="$fetchState.pending">Generating new joke...</p>
          <p v-else-if="$fetchState.error">
            Chuck Norris: I won't let you generate any more jokes!
          </p>
          <p v-else v-text="data.value" />
        </div>
      </div>
      <div class="w-full text-center">
        <p class="text-md text-indigo-500 font-bold text-center">
          Chuck Norris
        </p>
        <p class="text-xs text-gray-500 text-center">@chuck.norris</p>
        <button
          class="bg-indigo-500 rounded-full font-bold text-white px-4 py-2 transition duration-300 ease-in-out hover:bg-indigo-600 mt-4 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          :disabled="disableJokeGenerator"
          @click="$fetch"
        >
          {{
            disableJokeGenerator
              ? 'No more jokes for you!'
              : 'Generate new joke'
          }}
        </button>
        <nuxt-link v-if="disableJokeGenerator" class="block text-xs mt-2" to="/"
          >Return to homepage</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

interface DataInterface {
  value: string
}

@Component({
  fetchDelay: 1000,
})
export default class ExamplesFetch extends Vue {
  // Data
  data: DataInterface | {} = {}
  jokeLimit: number = 5
  jokeCount: number = 0

  // Hooks
  async fetch() {
    this.jokeCount++
    await this.generateJoke()
  }

  // Getters
  get disableJokeGenerator(): boolean {
    return this.jokeCount > this.jokeLimit
  }

  get returnImage(): string {
    return this.disableJokeGenerator
      ? '/images/examples/chuck-norris-limit.jpeg'
      : '/images/examples/chuck-norris.jpeg'
  }

  // Methods
  async generateJoke() {
    try {
      let url = 'https://api.chucknorris.io/jokes/random'
      if (this.jokeCount > this.jokeLimit) {
        url += '/error' // Reproduce error just as an example
      }
      this.data = await this.$axios.$get(url)
    } catch (e) {
      throw new Error('Joke not found')
    }
  }
}
</script>
