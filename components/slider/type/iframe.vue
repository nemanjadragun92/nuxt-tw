<template>
  <div class="iframe">
    <iframe
      v-if="data.source"
      :src="data.source"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      class="w-full h-full overflow-hidden"
    />
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
.iframe {
  @apply flex items-center justify-center text-center h-full;
}
</style>
