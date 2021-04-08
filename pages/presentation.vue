<template>
  <div>
    Parent presentation
    <ul>
      <li
        v-for="(slide, slideIndex) in slides"
        :key="slide.slug"
        @click="$router.push({ path: `/presentation/slide/${slide.slug}` })"
      >
        Slide {{ slideIndex + 1 }}
      </li>
    </ul>
    <nuxt-child />
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
  slides: PresentationInterface[] | IContentDocument[] = []
  validate({ params, redirect }: { params: { id: string }; redirect: any }) {
    // If param doesnt exist in route redirect to first slide
    if (!params.id) {
      return redirect('/presentation/slide/1')
    }
    return true
  }

  async fetch() {
    this.slides = await this.$content('slides').fetch<PresentationInterface[]>()
  }
}
</script>
