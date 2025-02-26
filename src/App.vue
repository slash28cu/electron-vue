<template>
    <div class="h-screen w-screen bg-gray-900 cursor-not-allowed">
      <!-- Setup Screen -->
      <div v-if="!isGameStarted" class="h-full w-full flex flex-col">
        <!-- <h1 class="text-6xl font-bold text-center py-4 text-white">Chess Clock</h1> -->

        <div class="flex-1 flex">
          <!-- Player 1 Setup -->
          <div
            class="flex-1 flex flex-col items-center justify-center p-4 cursor-pointer font-chivo-mono"
            :class="[
            //   whiteSide === 'player1' ? 'bg-white/20' : 'bg-gray-800/50',
            //   'hover:bg-white/10 transition-colors'
            ]"
          >
            <!-- Chess Color Indicator -->
            <div
                @click="toggleWhiteSide('player2')"
                class="mb-8 text-6xl text-white absolute top-4 left-4"
            >
              {{ whiteSide === 'player1' ? '&#9818' : '&#9812' }}
            </div>

            <!-- Time Spinner -->
            <div class="flex items-center space-x-4 mt-12">
              <!-- Hours -->
              <div class="flex flex-col items-center">
                <button
                  @click.stop="adjustTime('player1', 'hours', 1)"
                  class="p-4 text-white hover:bg-white/10 rounded-lg"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 15l7-7 7 7"/>
                  </svg>
                </button>
                <div class="text-8xl text-white my-2">
                  {{ Math.floor(player1Time / 60).toString().padStart(2, '0') }}
                </div>
                <button
                  @click.stop="adjustTime('player1', 'hours', -1)"
                  class="p-4 text-white hover:bg-white/10 rounded-lg"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>

              <div class="text-8xl text-white">:</div>

              <!-- Minutes -->
              <div class="flex flex-col items-center">
                <button
                  @click.stop="adjustTime('player1', 'minutes', 1)"
                  class="p-4 text-white hover:bg-white/10 rounded-lg"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 15l7-7 7 7"/>
                  </svg>
                </button>
                <div class="text-8xl text-white my-2">
                  {{ (player1Time % 60).toString().padStart(2, '0') }}
                </div>
                <button
                  @click.stop="adjustTime('player1', 'minutes', -1)"
                  class="p-4 text-white hover:bg-white/10 rounded-lg"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Player 2 Setup -->
          <div
            class="flex-1 flex flex-col items-center justify-center p-4 cursor-pointer font-chivo-mono"
            :class="[
            //   whiteSide === 'player2' ? 'bg-white/20' : 'bg-gray-800/50',
            //   'hover:bg-white/10 transition-colors'
            ]"
          >
            <!-- Chess Color Indicator -->
            <div
                @click="toggleWhiteSide('player1')"
                class="mb-8 text-6xl text-white absolute top-4 right-4"
            >
              {{ whiteSide === 'player2' ? '&#9818' : '&#9812' }}
            </div>

            <!-- Time Spinner -->
            <div class="flex items-center space-x-4 mt-12">
              <!-- Hours -->
              <div class="flex flex-col items-center">
                <button
                  @click.stop="adjustTime('player2', 'hours', 1)"
                  class="p-4 text-white hover:bg-white/10 rounded-lg"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 15l7-7 7 7"/>
                  </svg>
                </button>
                <div class="text-8xl text-white my-2">
                  {{ Math.floor(player2Time / 60).toString().padStart(2, '0') }}
                </div>
                <button
                  @click.stop="adjustTime('player2', 'hours', -1)"
                  class="p-4 text-white hover:bg-white/10 rounded-lg"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>

              <div class="text-8xl text-white">:</div>

              <!-- Minutes -->
              <div class="flex flex-col items-center">
                <button
                  @click.stop="adjustTime('player2', 'minutes', 1)"
                  class="p-4 text-white hover:bg-white/10 rounded-lg"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 15l7-7 7 7"/>
                  </svg>
                </button>
                <div class="text-8xl text-white my-2">
                  {{ (player2Time % 60).toString().padStart(2, '0') }}
                </div>
                <button
                  @click.stop="adjustTime('player2', 'minutes', -1)"
                  class="p-4 text-white hover:bg-white/10 rounded-lg"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Start Button -->
        <div class="p-3 items-center justify-center flex">
          <button
            class="w-48 bg-gray-700 text-white rounded-lg px-4 py-3 text-lg font-semibold  mx-2"
          >
          &#9667;
          </button>
          <button
            @click="startGame"
            class="w-96 bg-blue-700 text-white rounded-lg px-4 py-3 text-lg font-semibold mx-2"
          >
            &#9658;
          </button>
          <button
            class="w-48 bg-gray-700 text-white rounded-lg px-4 py-3 text-lg font-semibold mx-2"
          >
          &#9657;
          </button>
        </div>
      </div>

      <!-- Game Screen -->
    <div v-else class="h-screen w-screen flex flex-row">
      <!-- Player 1 Clock -->
      <button
        @click="toggleClock('player1')"
        :class="[
          'flex-1 flex items-center justify-center p-4 transition-all duration-300 font-chivo-mono',
          activePlayer === 'player1'
            ? 'bg-gray-700'
            : 'bg-black',
          !isRunning ? 'cursor-not-allowed opacity-30' : ''
        ]"
        :disabled="!isRunning || activePlayer !== 'player1'"
      >
        <div class="text-center">
          <div class="text-6xl text-gray-200 absolute top-4 left-4">
            {{ whiteSide === 'player1' ? '&#9818' : '&#9812' }}
          </div>
          <div class="text-8xl text-white tracking-wider">
            {{ formatTime(player1Remaining) }}
          </div>
        </div>
      </button>

      <!-- Center Controls -->
      <div class="flex flex-col justify-center items-center space-y-4 bg-gray-900 p-4 w-32">
        <button
          @click="togglePause"
          class="w-full bg-gray-500 text-white rounded-lg px-2 py-3 text-sm font-semibold"
        >
          {{ isRunning ? '&#9616;&#9616;' : '&#9658' }}
        </button>
        <button
          @click="resetGame"
          class="w-full bg-red-500 text-white rounded-lg px-2 py-3 text-sm font-semibold hover:bg-red-600"
        >
          &#8635;
        </button>
      </div>

      <!-- Player 2 Clock -->
      <button
        @click="toggleClock('player2')"
        :class="[
          'flex-1 flex items-center justify-center p-4 transition-all duration-300 font-chivo-mono',
          activePlayer === 'player2'
            ? 'bg-gray-700'
            : 'bg-black',
          !isRunning ? 'cursor-not-allowed opacity-30' : ''
        ]"
        :disabled="!isRunning || activePlayer !== 'player2'"
      >
        <div class="text-center">
          <div class="text-6xl text-gray-200 absolute top-4 right-4">
            {{ whiteSide === 'player2' ? '&#9818' : '&#9812' }}
          </div>
          <div class="text-8xl text-white tracking-wider">
            {{ formatTime(player2Remaining) }}
          </div>
        </div>
      </button>
    </div>
  </div>
  </template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue'

type Player = 'player1' | 'player2'

export default defineComponent({
  name: 'App',
  setup() {
    const player1Time = ref<number>(10)
    const player2Time = ref<number>(10)
    const whiteSide = ref<Player>('player1')
    const isGameStarted = ref<boolean>(false)
    const isRunning = ref<boolean>(false)
    const activePlayer = ref<Player | null>(null)
    const player1Remaining = ref<number>(0)
    const player2Remaining = ref<number>(0)
    let timerInterval: number | null = null

    const startGame = () => {
      player1Remaining.value = player1Time.value * 60
      player2Remaining.value = player2Time.value * 60
      isGameStarted.value = true
      isRunning.value = true
      activePlayer.value = whiteSide.value
      startTimer()
    }

    const startTimer = () => {
      if (timerInterval) clearInterval(timerInterval)
      timerInterval = window.setInterval(() => {
        if (!isRunning.value) return

        if (activePlayer.value === 'player1') {
          player1Remaining.value -= 1
          if (player1Remaining.value <= 0) {
            endGame()
          }
        } else if (activePlayer.value === 'player2') {
          player2Remaining.value -= 1
          if (player2Remaining.value <= 0) {
            endGame()
          }
        }
      }, 1000)
    }

    const toggleWhiteSide = (player: Player) => {
      whiteSide.value = player
    }

    const adjustTime = (player: Player, unit: 'hours' | 'minutes', change: number) => {
      const timeRef = player === 'player1' ? player1Time : player2Time

      if (unit === 'hours') {
        const newHours = Math.floor(timeRef.value / 60) + change
        if (newHours >= 0 && newHours <= 9) {
          timeRef.value = (newHours * 60) + (timeRef.value % 60)
        }
      } else {
        const currentHours = Math.floor(timeRef.value / 60)
        let newMinutes = (timeRef.value % 60) + change

        if (newMinutes < 0) newMinutes = 59
        if (newMinutes > 59) newMinutes = 0

        timeRef.value = (currentHours * 60) + newMinutes
      }
    }

    const toggleClock = (player: Player) => {
      if (!isRunning.value || activePlayer.value !== player) return
      activePlayer.value = player === 'player1' ? 'player2' : 'player1'
    }

    const togglePause = () => {
      isRunning.value = !isRunning.value
    }

    const resetGame = () => {
      if (timerInterval) clearInterval(timerInterval)
      isGameStarted.value = false
      isRunning.value = false
      activePlayer.value = null
      player1Remaining.value = 0
      player2Remaining.value = 0
    }

    const endGame = () => {
      isRunning.value = false
      if (timerInterval) clearInterval(timerInterval)
    }

    const formatTime = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    onUnmounted(() => {
      if (timerInterval) clearInterval(timerInterval)
    })

    return {
        player1Time,
      player2Time,
      whiteSide,
      isGameStarted,
      isRunning,
      activePlayer,
      player1Remaining,
      player2Remaining,
      startGame,
      toggleClock,
      togglePause,
      resetGame,
      formatTime,
      toggleWhiteSide,
      adjustTime
    }
  }
})
</script>
