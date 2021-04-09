<template>
  <div class="credentials">
    <div>
      <h6>Published: {{ returnCredentials.date }}</h6>
      <h1>{{ returnCredentials.publisher.name }}</h1>
      <h3>{{ returnCredentials.publisher.role }}</h3>
      <div class="mt-6">
        <a
          v-if="returnCredentials.social.github"
          :href="returnCredentials.social.github"
          target="_blank"
        >
          <i class="material-icons">link</i>
          <span class="text-blue-500 font-bold">LinkedIn</span>
        </a>
        <a
          v-if="returnCredentials.social.github"
          class="ml-2"
          :href="returnCredentials.social.github"
          target="_blank"
        >
          <i class="material-icons">link</i>
          <span class="text-blue-500 font-bold">Github</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PresentationInterface } from '~/interfaces/PresentationInterface'

@Component({
  layout: 'presentation',
})
export default class SliderTypeCredentials extends Vue {
  @Prop({ required: true })
  data!: PresentationInterface

  // Getters
  get returnCredentials(): PresentationInterface {
    return this.data
  }
}
</script>

<style lang="scss" scoped>
.credentials {
  @apply flex items-center justify-center text-center;
  h1 {
    @apply text-4xl lg:text-6xl font-bold mt-4;
  }
  h3 {
    @apply font-medium mt-2 lg:text-2xl;
  }
  h6 {
    @apply text-xs inline-block px-2 py-1 rounded;
    @apply bg-blue-500 text-primary-50;
  }
  a {
    @apply transition duration-200;
    @apply hover:text-blue-700;
  }
}
</style>
