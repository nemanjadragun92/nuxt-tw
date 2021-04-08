<template>
  <div>
    <template v-if="data.image">
      <a :href="data.image" target="_blank">
        <img :src="data.image" :alt="data.title" />
      </a>
    </template>
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
