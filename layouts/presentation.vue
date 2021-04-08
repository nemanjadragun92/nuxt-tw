<template>
  <div class="layout-presentation">
    <Nuxt />
    <button type="button" class="theme-switch" @click="onThemeSwitch(false)">
      <i class="material-icons">dark_mode</i>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LayoutPresentation extends Vue {
  // Hooks
  mounted() {
    this.onThemeSwitch(true)
  }

  // Methods
  async onThemeSwitch(init: boolean) {
    if (!init) {
      await this.$store.commit('TOGGLE_DARK_MODE')
    }
    const { darkMode } = this.$store.state
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }

  // SEO
  head() {
    return {
      meta: [
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Nuxt.js + Tailwind Demo Slider',
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: 'Nuxt.js + Tailwind Demo Slider',
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-presentation {
  @apply h-screen w-screen;
  @apply bg-primary-100 text-primary-900;
  @apply dark:bg-primary-900 dark:text-primary-50;
  @apply transition duration-200;
}
.theme-switch {
  @apply fixed right-2 bottom-2 z-50 rounded;
  @apply flex items-center justify-center;
  @apply w-10 h-10;
  @apply bg-gray-900 text-primary-50;
  @apply dark:bg-gray-100 dark:text-primary-900;
  @apply transition duration-200;
  @apply opacity-50 hover:opacity-100;
  i {
    @apply text-2xl;
  }
}
</style>
