<template>
  <div class="default">
    <div class="max-h-full">
      <p v-if="data.description" v-html="data.description" />
      <template v-if="data.image">
        <a :href="data.image" target="_blank">
          <img :src="data.image" :alt="data.title" :class="[data.imageClass]" />
        </a>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PresentationInterface } from '~/interfaces/PresentationInterface'

@Component({
  layout: 'presentation',
})
export default class SliderTypeDefault extends Vue {
  @Prop({ required: true })
  data!: PresentationInterface
}
</script>

<style lang="scss" scoped>
.default {
  @apply flex items-center justify-center text-center h-full;
  p {
    @apply text-base md:text-2xl;
    @apply max-w-[75%] m-auto mb-6;
    ::v-deep {
      code {
        @apply text-blue-600;
        &:before,
        &:after {
          content: '`';
        }
      }
    }
  }
  a {
    @apply block;
  }
}
</style>
