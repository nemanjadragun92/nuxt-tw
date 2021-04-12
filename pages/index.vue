<template>
  <div class="flex justify-center h-screen bg-gray-100">
    <div class="w-full h-full md:p-10 p-0 overflow-auto">
      <div
        class="bg-white mx-auto md:max-w-sm md:shadow md:rounded overflow-hidden h-full md:h-auto"
      >
        <div class="sm:flex sm:items-center p-3">
          <div class="flex-grow">
            <div class="flex justify-between items-center mb-2">
              <h1 class="px-2 font-bold">Nuxt.js + Tailwind</h1>
              <div class="flex items-center">
                <nuxt-link
                  v-if="refreshSlider"
                  :to="{
                    path: '/presentation/slide/1',
                    query: {
                      start: true,
                    },
                  }"
                  class="focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm flex items-center transition duration-200 mr-2"
                >
                  <i class="material-icons-outlined relative" style="left: -1px"
                    >refresh</i
                  >
                </nuxt-link>
                <nuxt-link
                  :to="slideUrl"
                  class="focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 pr-2 rounded text-sm flex items-center transition duration-200"
                >
                  <span class="mr-1">Present</span>
                  <i class="material-icons-outlined">play_arrow</i>
                </nuxt-link>
              </div>
            </div>
            <input
              v-model="keyword"
              type="text"
              placeholder="Search for example..."
              class="my-2 w-full text-sm bg-gray-200 text-grey-darkest rounded h-10 p-3 focus:outline-none"
            />
            <div class="w-full mt-1">
              <div v-if="!returnData.length" class="text-xs">No results...</div>
              <div
                v-for="(item, itemIndex) in returnData"
                v-else
                :key="itemIndex"
                class="flex items-center cursor-pointer my-1 hover:bg-gray-100 rounded"
              >
                <div class="w-8 flex items-center justify-center">
                  <i class="material-icons-outlined text-sm text-blue-500"
                    >remove</i
                  >
                </div>
                <nuxt-link
                  :to="item.link"
                  class="block w-full py-2 text-sm focus:outline-none focus:text-blue-600"
                >
                  {{ item.navigationTitle }}
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
import { PresentationInterface } from '~/interfaces/PresentationInterface'

@Component({
  fetchDelay: 1000,
})
export default class PagesIndex extends Vue {
  // Data
  keyword: string = ''
  slides: PresentationInterface[] = []
  countdown: boolean = false
  slideUrl: string = '/presentation/slide'

  // Hooks
  async fetch() {
    this.slides = await this.$content('slides')
      .sortBy('order', 'asc')
      .fetch<any>()
    // Map slides to create link
    this.slides = this.slides.map((slide) => {
      slide.link = `/presentation/slide/${slide.slug}`
      return slide
    })
  }

  mounted() {
    this.countdown = !!window.localStorage.getItem('countdown')
    const slideSlug = window.localStorage.getItem('slide')
    if (slideSlug) {
      this.slideUrl += `/${slideSlug}`
    } else {
      this.slideUrl += '/1'
    }
  }

  // Getters
  get returnData(): PresentationInterface[] {
    if (this.keyword) {
      return this.slides.filter((obj) => {
        return this.keyword
          .toLowerCase()
          .split(' ')
          .every((word) => obj.navigationTitle.toLowerCase().includes(word))
      })
    }
    return this.slides
  }

  get refreshSlider(): boolean {
    return this.countdown
  }
}
</script>
