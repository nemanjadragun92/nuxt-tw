<template>
  <div class="slide">
    <transition name="slide-fade">
      <component :is="renderComponent" :data="returnSlideData" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { PresentationInterface } from '~/interfaces/PresentationInterface'

@Component({
  layout: 'presentation',
})
export default class PresentationSlide extends Vue {
  @Watch('$route.params.id')
  async onSlideChange() {
    await this.getSlideData()
  }

  slide: PresentationInterface | null = null
  async fetch() {
    await this.getSlideData()
  }

  // Getters
  get returnSlideData(): PresentationInterface | {} {
    return Object(this.slide)
  }

  get renderComponent(): any {
    let component = 'default'
    const { type } = this.returnSlideData as PresentationInterface
    if (type) {
      component = type
    }
    // @ts-ignore
    return () => import(`@/components/slider/type/${component}`)
  }

  // Methods
  async getSlideData() {
    try {
      this.slide = await this.$content(
        `slides/${this.$route.params.id}`
      ).fetch<any>()
    } catch (e) {
      // Redirect to first slide if current slide doesnt exist
      await this.$nuxt.context.redirect('/presentation')
    }
  }

  // SEO
  head() {
    const data = this.returnSlideData as PresentationInterface
    return {
      title: data.navigationTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: data.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: data.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: data.description,
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  @apply overflow-auto;
  @apply px-4 pt-8 h-full;
  ::v-deep {
    & > * {
      @apply h-full;
    }
    img {
      @apply block max-w-full max-h-full m-auto;
    }
  }
}
// Transition
.slide-fade-enter-active,
.slide-fade-leave-active {
  @apply transition duration-200;
}
.slide-fade-enter,
.slide-fade-leave-to {
  @apply opacity-0;
}
</style>
