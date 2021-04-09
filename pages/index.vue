<template>
  <div class="flex justify-center h-screen bg-gray-100">
    <div class="w-full h-full md:p-10 p-0 overflow-auto">
      <div
        class="bg-white mx-auto md:max-w-sm md:shadow-lg md:rounded-lg overflow-hidden h-full md:h-auto"
      >
        <div class="sm:flex sm:items-center p-3">
          <div class="flex-grow">
            <div class="flex justify-between items-center mb-2">
              <h1 class="px-2 font-bold">Nuxt.js + Tailwind</h1>
              <nuxt-link
                to="/presentation/slide/1"
                target="_blank"
                class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 pr-2 rounded text-sm flex items-center transition duration-200"
              >
                <span class="mr-1">Present</span>
                <i class="material-icons-outlined">play_arrow</i>
              </nuxt-link>
            </div>
            <input
              v-model="keyword"
              type="text"
              placeholder="Search for example..."
              class="my-2 w-full text-sm bg-gray-200 text-grey-darkest rounded h-10 p-3 focus:outline-none"
            />
            <div class="w-full mt-1">
              <div
                v-for="(item, itemIndex) in returnData"
                :key="itemIndex"
                class="flex items-center cursor-pointer my-1 hover:bg-gray-100 rounded"
              >
                <div class="w-8 flex items-center justify-center">
                  <i class="material-icons-outlined text-sm text-blue-500"
                    >remove</i
                  >
                </div>
                <nuxt-link
                  :to="`/examples/${item.slug}`"
                  class="block w-full hover:text-blue-dark py-2 text-sm"
                >
                  {{ item.title }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

interface DataInterface {
  title: string
  slug: string
}

@Component({
  fetchDelay: 1000,
})
export default class PagesIndex extends Vue {
  // Data
  data: DataInterface[] = [
    {
      title: 'Middleware',
      slug: 'middleware',
    },
    {
      title: 'Fetch',
      slug: 'fetch',
    },
  ]

  keyword: string = ''

  // Getters
  get returnData() {
    if (this.keyword) {
      return this.data.filter((obj) => {
        return this.keyword
          .toLowerCase()
          .split(' ')
          .every((word) => obj.title.toLowerCase().includes(word))
      })
    }
    return this.data
  }
}
</script>
