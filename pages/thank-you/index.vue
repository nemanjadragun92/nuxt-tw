<template>
  <div
    v-if="!finished"
    class="w-screen h-screen flex items-center justify-center p-8"
  >
    <div class="w-full max-w-4xl">
      <div
        class="coding px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased bg-gray-800 pb-6 pt-4 rounded-lg leading-normal overflow-hidden"
      >
        <div class="top mb-2 flex">
          <div class="h-3 w-3 bg-red-500 rounded-full" />
          <div class="ml-2 h-3 w-3 bg-yellow-300 rounded-full" />
          <div class="ml-2 h-3 w-3 bg-green-500 rounded-full" />
        </div>
        <div
          v-for="(item, itemIndex) in data"
          :key="itemIndex"
          class="mt-4 flex"
        >
          <span :class="[item.from]">{{ item.from }}:~$</span>
          <p
            :id="`terminal_message-${itemIndex}`"
            class="flex-1 typing items-center pl-2"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="h-screen w-screen bg-black flex items-center justify-center p-10 text-white text-3xl"
  >
    <div v-if="finishMessage">Hope that presentation was fun to watch 🦁</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

interface DataInterface {
  from: string
  message: string
  writeSpeed: number
}

@Component({
  layout: 'presentation',
})
export default class ThankYouPage extends Vue {
  @Watch('finished')
  onFinish(val: boolean) {
    if (val) {
      setTimeout(() => {
        this.finishMessage = true
      }, 3000)
    }
  }

  textCount: number = 0
  writeSpeed: number = 50
  dataIndex: number = 0
  data: DataInterface[] = []

  messagesQueue: DataInterface[] = [
    {
      from: 'computer',
      message: 'Sadly you did run out of the time. Next time be faster!',
      writeSpeed: 50,
    },
    {
      from: 'me',
      message: 'Sorry! Next time I will try to get better!',
      writeSpeed: 100,
    },
    {
      from: 'computer',
      message: 'I hope so! Shutting down in 5',
      writeSpeed: 50,
    },
    {
      from: 'computer',
      message: '4...',
      writeSpeed: 250,
    },
    {
      from: 'computer',
      message: '3...',
      writeSpeed: 250,
    },
    {
      from: 'computer',
      message: '2...',
      writeSpeed: 250,
    },
    {
      from: 'computer',
      message: '1...',
      writeSpeed: 250,
    },
    {
      from: 'computer',
      message: 'sudo enterBlackHole()',
      writeSpeed: 100,
    },
  ]

  finished: boolean = false
  finishMessage: boolean = false

  mounted() {
    this.nextMessage()
    this.$nextTick(() => {
      this.typeWriter()
    })
  }

  // Methods
  typeWriter() {
    const data = this.data[this.dataIndex]
    if (!data) {
      return false
    }
    this.writeSpeed = data.writeSpeed
    const txt = data.message
    const element = document.getElementById(
      `terminal_message-${this.dataIndex}`
    )
    if (this.textCount < txt.length) {
      element.innerHTML += txt.charAt(this.textCount)
      this.textCount++
      setTimeout(this.typeWriter, this.writeSpeed)
    } else {
      this.dataIndex++
      this.nextMessage()
      this.$nextTick(() => {
        this.typeWriter()
      })
    }
  }

  nextMessage() {
    this.textCount = 0
    const messageFromQueue = this.messagesQueue[this.dataIndex]
    if (messageFromQueue) {
      this.data.push(messageFromQueue)
    } else {
      this.finished = true
    }
  }

  // Getters
  get returnTitle(): string {
    return this.data[this.dataIndex]?.message || 'Thank you!'
  }

  // SEO
  head() {
    return {
      title: this.returnTitle,
    }
  }
}
</script>

<style lang="scss" scoped>
.computer {
  @apply text-green-400;
}
.me {
  @apply text-blue-400;
}
.coding {
  @apply min-h-[350px];
}
</style>
