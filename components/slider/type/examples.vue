<template>
  <div class="examples">
    <div class="max-h-full">
      <p v-if="data.description" v-html="data.description" />
      <nuxt-link :to="data.link" target="_blank">Show example</nuxt-link>
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
.examples {
  @apply flex items-center justify-center text-center h-full;
  p {
    @apply text-base md:text-2xl;
    @apply max-w-[75%] m-auto mb-8;
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
    @apply inline-block transition duration-200 cursor-pointer;
    @apply py-3 px-4 bg-blue-500 font-medium rounded shadow-md hover:bg-blue-600 focus:outline-none;
    @apply text-primary-50;
    @apply dark:text-primary-900;
  }
}
</style>
