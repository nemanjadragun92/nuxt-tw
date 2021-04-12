<template>
  <div class="intro">
    <div>
      <template v-if="returnImage">
        <img :src="returnImage" :alt="data.title" />
      </template>
      <h1>{{ data.title }}</h1>
      <h3>{{ data.description }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import get from 'lodash/get'
import { PresentationInterface } from '~/interfaces/PresentationInterface'

@Component({
  layout: 'presentation',
})
export default class SliderTypeFinish extends Vue {
  @Prop({ required: true })
  data!: PresentationInterface

  // Getters
  get returnImage(): string {
    let imageType = 'light'
    if (this.$store.state.darkMode) {
      imageType = 'dark'
    }
    return get(this.data.imageVariant, imageType) as string
  }
}
</script>

<style lang="scss" scoped>
.intro {
  @apply flex items-center justify-center text-center;
  img {
    @apply block max-w-xs;
  }
  h1 {
    @apply text-3xl lg:text-4xl font-bold mt-6;
  }
  h3 {
    @apply text-2xl lg:text-3xl font-medium mt-2 lg:mt-4 opacity-50;
  }
}
</style>
