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
    await this.$fetch()
  }

  slide: PresentationInterface | null = null
  async fetch() {
    try {
      this.slide = await this.$content(
        `slides/${this.$route.params.id}`
      ).fetch<any>()
    } catch (e) {
      // Redirect to first slide if current slide doesnt exist
      await this.$nuxt.context.redirect('/presentation')
    }
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
}
</script>

<style lang="scss" scoped>
.slide {
  @apply p-4 pb-0 h-full;
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
