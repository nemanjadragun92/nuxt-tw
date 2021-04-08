<template>
  <div>
    Slide id: {{ $route.params.id }}

    <pre>
    {{ slide }}
  </pre
    >
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
}
</script>
