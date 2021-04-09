<template>
  <div class="list">
    <div class="max-h-full">
      <ul
        v-for="(item, itemIndex) in data.list"
        :key="itemIndex"
        class="list-none"
      >
        <li v-html="item.description" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PresentationInterface } from '~/interfaces/PresentationInterface'

@Component({
  layout: 'presentation',
})
export default class SliderTypeList extends Vue {
  @Prop({ required: true })
  data!: PresentationInterface
}
</script>

<style lang="scss" scoped>
.list {
  @apply flex items-center justify-center text-left h-full;
  ul {
    @apply max-w-[90%] md:max-w-[75%] m-auto;
    li {
      @apply relative text-base lg:text-2xl pl-4 md:pl-6 mb-1 lg:mb-2;
      &:before {
        font-family: 'Material Icons';
        content: 'star';
        @apply absolute left-0 text-xs lg:text-sm top-1 lg:top-1.5 text-blue-600;
      }
    }
  }
}
</style>
