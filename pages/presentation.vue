<template>
  <div class="presentation">
    <div class="presentation__wrapper" :class="{ fullscreen: fullscreenMode }">
      <div class="presentation__navigation">
        <button
          :class="{
            hidden: !showButtonPrev,
          }"
          class="presentation__navigation-prev"
          type="button"
          @click="onScroll('prev')"
        >
          <i class="material-icons">navigate_before</i>
        </button>
        <ul ref="presentationScrollNavigation">
          <li
            v-for="slide in slides"
            :key="slide.slug"
            :tabindex="slide.slug"
            :class="{
              active: isActive(slide.slug),
            }"
            @click="goToSlide(slide.slug)"
            @keypress.enter="goToSlide(slide.slug)"
          >
            {{ slide.navigationTitle }}
          </li>
        </ul>
        <button
          class="presentation__navigation-next"
          type="button"
          :class="{
            hidden: !showButtonNext,
          }"
          @click="onScroll('next')"
        >
          <i class="material-icons">navigate_next</i>
        </button>
      </div>
      <div class="presentation__container">
        <div v-if="formatTime" class="countdown">
          <span v-text="formatTime" /><i
            class="material-icons-outlined"
            @click="resetCountdown(true)"
            >restart_alt</i
          >
        </div>
        <nuxt-child />
        <div class="watermark">
          <img src="/images/logo-blue.svg" alt="Logo" />
          <span>Egoditor</span>
        </div>
        <div
          class="presentation__pagination"
          :class="{ fullscreen: fullscreenMode }"
        >
          <button class="fullscreen" type="button" @click="toggleFullScreen">
            <span
              class="material-icons-outlined"
              v-text="fullscreenMode ? 'fullscreen_exit' : 'fullscreen'"
            />
          </button>
          <button
            :disabled="currentSlide <= 1"
            type="button"
            @click="slidePrev"
          >
            <span class="material-icons-outlined">skip_previous</span>
          </button>
          <span
            class="text-sm opacity-50 pointer-events-none"
            v-text="returnSliderRange"
          />
          <button
            type="button"
            :disabled="currentSlide >= totalSlides"
            @click="slideNext"
          >
            <span class="material-icons-outlined">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { IContentDocument } from '@nuxt/content/types/content'
import { PresentationInterface } from '~/interfaces/PresentationInterface'

@Component({
  layout: 'presentation',
})
export default class PresentationBase extends Vue {
  @Watch('countdown')
  onWatchCountdown(val: number) {
    if (!val) {
      this.$router.push('/thank-you')
    }
  }

  // Data
  slides: PresentationInterface[] | IContentDocument[] = []
  scrollOffsetValue: number = 0
  showButtonPrev: boolean = false
  showButtonNext: boolean = true
  fullscreenMode: boolean = false
  countdown: number | null = null
  countdownInterval: any = null

  // Hooks
  validate({ params, redirect }: { params: { id: string }; redirect: any }) {
    // If param doesnt exist in route redirect to first slide
    if (!params.id) {
      return redirect('/presentation/slide/1')
    }
    return true
  }

  async fetch() {
    this.slides = await this.$content('slides')
      .sortBy('slug', 'asc')
      .fetch<any>()
  }

  mounted() {
    const savedCountdown = window.localStorage.getItem('countdown')
    if (savedCountdown) {
      this.countdown = +savedCountdown
    } else if (this.countdownInterval === null) {
      const timeInSeconds = prompt(
        'How much time you need for presentation? (seconds) // By default smart slide timer will be user'
      )
      if (timeInSeconds) {
        this.countdown = +timeInSeconds
      } else {
        const smartSliderTimer = (this.slides as PresentationInterface[])
          .map((obj) => obj.time)
          .reduce((a, b) => a + b, 0)
        this.countdown = smartSliderTimer || 60
      }
    }
    this.onCountdown()
    document.addEventListener('fullscreenchange', () => {
      this.fullscreenMode = !!document.fullscreenElement
    })
  }

  beforeDestroy() {
    document.removeEventListener('fullscreenchange', () => {
      this.fullscreenMode = !!document.fullscreenElement
    })
  }

  // Getters
  get returnSliderRange(): string {
    return `${this.currentSlide}/${this.totalSlides}`
  }

  get currentSlide(): number {
    return +this.$route.params.id
  }

  get totalSlides(): number {
    return this.slides.length
  }

  get formatTime(): boolean | string {
    if (this.countdown === null) {
      return false
    }
    const duration = this.countdown
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600)
    const mins = ~~((duration % 3600) / 60)
    const secs = ~~duration % 60
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = ''
    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '')
    ret += '' + secs
    return ret
  }

  // Methods
  onCountdown() {
    this.countdownInterval = setInterval(() => {
      if (typeof this.countdown === 'number') {
        this.countdown--
      }
      if (!this.countdown) {
        this.resetCountdown(false)
      } else {
        window.localStorage.setItem('countdown', this.countdown!.toString())
      }
    }, 1000)
  }

  resetCountdown(reload: boolean = false) {
    if (!reload) {
      this.countdown = null
    }
    window.localStorage.removeItem('countdown')
    clearInterval(this.countdownInterval)
    if (reload) {
      location.reload()
    }
  }

  onScroll(scrollType: 'prev' | 'next') {
    const element = this.$refs.presentationScrollNavigation as HTMLElement
    const elWidth = element.offsetWidth
    let leftScrollOffset = elWidth - 150
    if (scrollType === 'prev') {
      leftScrollOffset = -leftScrollOffset
    }
    this.scrollOffsetValue += leftScrollOffset
    if (this.scrollOffsetValue > elWidth) {
      this.scrollOffsetValue = elWidth
    } else if (this.scrollOffsetValue < 0) {
      this.scrollOffsetValue = 0
    }
    element.scrollBy({
      left: leftScrollOffset,
      behavior: 'smooth',
    })
    this.showButtonPrev = this.scrollOffsetValue >= 1
    this.showButtonNext = this.scrollOffsetValue !== elWidth
  }

  goToSlide(slide: string) {
    this.$router.push({ path: `/presentation/slide/${slide}` })
  }

  slidePrev() {
    let currentSlide = this.currentSlide
    if (currentSlide > 1) {
      currentSlide--
      this.goToSlide(currentSlide.toString())
    }
  }

  slideNext() {
    let currentSlide = this.currentSlide
    if (currentSlide < this.totalSlides) {
      currentSlide++
      this.goToSlide(currentSlide.toString())
    }
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  isActive(id: string): boolean {
    return id === this.$route.params.id
  }
}
</script>

<style lang="scss" scoped>
.presentation {
  @apply h-full w-full;
  @apply flex items-center justify-center;
  @apply bg-gray-200;
  @apply dark:bg-gray-900;
  &__wrapper {
    @apply overflow-hidden;
    @apply w-full h-full max-w-[1280px] max-h-full;
    @apply md:w-[85%] md:h-[80%] md:max-h-[768px];
    @apply bg-gray-100;
    @apply dark:bg-gray-800;
    &.fullscreen {
      @apply md:w-full md:h-full md:max-w-full md:max-h-full;
    }
  }
  &__navigation {
    @apply relative;
    @apply bg-gray-100;
    @apply dark:bg-gray-800;
    @apply flex items-center;
    &:after {
      content: '';
      @apply absolute top-0 right-0 bottom-0 left-0;
      @apply opacity-90;
      @apply bg-gradient-to-r from-transparent to-gray-200;
      @apply dark:to-gray-900;
      @apply pointer-events-none;
    }
    ul {
      scroll-behavior: smooth;
      width: calc(100% - 5rem);
      @apply h-10;
      @apply flex items-center;
      @apply overflow-auto;
      &::-webkit-scrollbar {
        @apply hidden;
      }
      li {
        white-space: nowrap;
        @apply ml-2 cursor-pointer text-sm;
        @apply flex items-center;
        @apply transition duration-200;
        @apply focus:outline-none focus:text-blue-500;
        @apply hover:text-green-600;
        &:not(:last-child):after {
          font-family: 'Material Icons';
          content: 'arrow_forward';
          @apply ml-1.5;
          @apply text-primary-900;
          @apply dark:text-primary-50;
        }
        &.active {
          @apply text-green-600;
        }
      }
    }
    &-prev,
    &-next {
      @apply relative z-10;
      @apply flex items-center justify-center;
      @apply transition duration-200;
      @apply focus:outline-none focus:text-blue-400;
      @apply w-10 h-10;
      @apply bg-gray-100;
      @apply dark:bg-gray-800;
      @apply hover:text-green-600;
      &.hidden {
        @apply opacity-5 cursor-not-allowed;
      }
    }
    &-next {
      @apply ml-2;
    }
  }
  &__container {
    height: calc(100% - 2.5rem);
    @apply relative pb-16;
  }
  &__pagination {
    @apply absolute bottom-4 right-14 z-10;
    @apply md:right-4;
    @apply flex items-center;
    &.fullscreen {
      @apply right-16;
    }
    button {
      @apply flex items-center justify-center mx-1;
      @apply focus:outline-none focus:text-blue-400;
      @apply disabled:opacity-50 disabled:cursor-not-allowed;
      &:not(:disabled) {
        @apply hover:text-green-600;
      }
      &.fullscreen {
        @apply hidden;
        @apply md:flex;
      }
    }
  }
}
.countdown {
  @apply absolute top-2 right-2 z-10;
  @apply text-xs font-medium;
  @apply flex items-center;
  span {
    @apply pointer-events-none;
  }
  i {
    @apply text-base ml-1 cursor-pointer hover:text-green-600;
    line-height: 0;
  }
}
.watermark {
  @apply absolute bottom-4 left-4 z-10;
  @apply flex items-center;
  img {
    @apply block w-8;
  }
  span {
    @apply ml-2 font-medium;
  }
}
</style>
