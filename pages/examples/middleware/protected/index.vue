<template>
  <div>Protected route</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: ['auth'],
})
export default class ExamplesMiddlewareProtected extends Vue {}
</script>
