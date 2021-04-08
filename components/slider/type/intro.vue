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
import { PresentationInterface } from '~/interfaces/PresentationInterface'

@Component({
  layout: 'presentation',
})
export default class SliderTypeIntro extends Vue {
  @Prop({ require: true })
  data!: PresentationInterface

  // Getters
  get returnImage(): string {
    let imageType = 'light'
    if (this.$store.state.darkMode) {
      imageType = 'dark'
    }
    return this.data.image[imageType]
  }
}
</script>

<style lang="scss" scoped>
.intro {
  @apply flex items-center justify-center text-center;
  h1 {
    @apply text-4xl font-bold mt-6;
  }
  h3 {
    @apply text-2xl font-medium mt-2;
  }
}
</style>
