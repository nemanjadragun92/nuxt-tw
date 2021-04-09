<template>
  <div class="list">
    <div>
      <ul
        v-for="(item, itemIndex) in data.list"
        :key="itemIndex"
        class="list-none md:list-disc"
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
    li {
      @apply text-base md:text-2xl;
    }
  }
}
</style>
