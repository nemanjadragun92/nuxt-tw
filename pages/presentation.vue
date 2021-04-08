<template>
  <div class="presentation">
    <div class="presentation__wrapper">
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
        <nuxt-child />
        <div class="watermark">
          <img src="/images/logo-blue.svg" alt="Logo" />
          <span>Egoditor</span>
        </div>
        <div class="presentation__pagination">
          <button
            :disabled="currentSlide <= 1"
            type="button"
            @click="slidePrev"
          >
            <span class="material-icons-outlined"> skip_previous </span>
          </button>
          <button
            type="button"
            :disabled="currentSlide >= totalSlides"
            @click="slideNext"
          >
            <span class="material-icons-outlined"> skip_next </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IContentDocument } from '@nuxt/content/types/content'
import { PresentationInterface } from '~/interfaces/PresentationInterface'

@Component({
  layout: 'presentation',
})
export default class PresentationBase extends Vue {
  // Data
  slides: PresentationInterface[] | IContentDocument[] = []
  scrollOffsetValue: number = 0
  showButtonPrev: boolean = false
  showButtonNext: boolean = true

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
      .fetch<PresentationInterface[]>()
  }

  // Getters
  get currentSlide(): number {
    return +this.$route.params.id
  }

  get totalSlides(): number {
    return this.slides.length
  }

  // Methods
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
    @apply w-full h-full max-w-[1280px] max-h-full p-2;
    @apply md:w-[85%] md:h-[80%] md:max-h-[768px] md:p-0;
    @apply bg-gray-100;
    @apply dark:bg-gray-800;
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
      @apply h-10;
      @apply flex items-center;
      @apply overflow-auto;
      scroll-behavior: smooth;
      width: calc(100% - 5rem);
      &::-webkit-scrollbar {
        display: none;
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
    @apply absolute bottom-4 right-12 z-10;
    @apply md:right-4;
    @apply flex items-center;
    button {
      @apply flex items-center justify-center mx-1;
      @apply focus:outline-none focus:text-blue-400;
      @apply disabled:opacity-50 disabled:cursor-not-allowed;
      &:not(:disabled) {
        @apply hover:text-green-600;
      }
    }
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
