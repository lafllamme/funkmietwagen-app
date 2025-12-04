<script setup lang="ts">
import { useIntervalFn, onKeyStroke, useSwipe } from '@vueuse/core'
import { computed, defineModel, onBeforeUnmount, onMounted, ref, watch, type PropType, type Ref } from 'vue'

const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  hideOverlay: {
    type: Boolean,
    default: false,
  },
  overlayClass: {
    type: String,
    default: '',
  },
  imageClass: {
    type: String,
    default: 'slider-img h-full w-full object-cover select-none pointer-events-none',
  },
  enterFromClass: {
    type: String,
    default: 'slider-enter-from',
  },
  enterActiveClass: {
    type: String,
    default: 'slider-enter-active',
  },
  leaveActiveClass: {
    type: String,
    default: 'slider-leave-active',
  },
  autoplay: {
    type: [Boolean, Number, String],
    default: false,
  },
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
  },
  perspective: {
    type: String,
    default: '1000px',
  },
})

const sliderRef = ref<HTMLElement | null>(null)
const currentDirection = ref<'up' | 'down' | 'left' | 'right'>('up')
const currentIndex = defineModel('modelValue', {
  type: Number,
  default: 0,
})

function setCurrentDirection(dir: 'prev' | 'next') {
  if (props.direction === 'horizontal')
    currentDirection.value = dir === 'next' ? 'left' : 'right'
  else
    currentDirection.value = dir === 'next' ? 'up' : 'down'
}

const isLoading = ref(true)
const isTransitioning = ref(false)
const loadedImages: Ref<string[]> = ref([])
const currentImage = computed(() => loadedImages.value[currentIndex.value])

function loadImages() {
  isLoading.value = true
  const promises = props.images.map(imageSrc =>
    new Promise<string>((resolve) => {
      const image = new Image()
      image.src = imageSrc
      image.onload = () => resolve(imageSrc)
      image.onerror = () => resolve(imageSrc)
    }),
  )

  Promise.all(promises).then((resolvedImages) => {
    loadedImages.value = resolvedImages
    isLoading.value = false
  })
}

onMounted(() => {
  loadImages()
})

onBeforeUnmount(() => {
  pause()
})

function onPrev() {
  if (isLoading.value || isTransitioning.value)
    return
  setCurrentDirection('prev')
  let target = currentIndex.value - 1
  if (target < 0)
    target = loadedImages.value.length - 1
  currentIndex.value = target
}

function onNext() {
  if (isLoading.value || isTransitioning.value)
    return
  setCurrentDirection('next')
  let target = currentIndex.value + 1
  if (target >= loadedImages.value.length)
    target = 0
  currentIndex.value = target
}

onKeyStroke(
  ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
  (ev) => {
    if (!sliderRef.value)
      return
    ev.preventDefault()
    pause()
    if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft')
      onPrev()
    else
      onNext()
  },
  { target: sliderRef },
)

const { direction: swipingDirection, isSwiping } = useSwipe(sliderRef, { passive: false })
watch(swipingDirection, (dir) => {
  if (dir === 'up' || dir === 'left')
    onPrev()
  else if (dir === 'down' || dir === 'right')
    onNext()
})

watch(isSwiping, (v) => {
  if (v)
    pause()
  else
    resume()
})

const autoplayInterval = computed(() => {
  if (props.autoplay === false)
    return 0
  if (props.autoplay === true)
    return 5000
  if (typeof props.autoplay === 'string')
    return Number(props.autoplay)
  return props.autoplay
})

const { pause, resume, isActive } = useIntervalFn(() => {
  onNext()
}, autoplayInterval)

watch(isLoading, (v) => {
  if (v)
    pause()
  else if (autoplayInterval.value)
    resume()
})

function lockViewport() {
  isTransitioning.value = true
}

function unlockViewport() {
  isTransitioning.value = false
  if (!isActive.value && autoplayInterval.value)
    resume()
}

const transitionProps = computed(() => ({
  enterActiveClass: props.enterActiveClass,
  leaveActiveClass: props.leaveActiveClass,
  enterFromClass: props.enterFromClass,
  leaveToClass: 'slider-leave-to',
  onBeforeLeave: lockViewport,
  onAfterEnter: unlockViewport,
}))
</script>

<template>
  <div
    ref="sliderRef"
    tabindex="0"
    class="relative flex size-full items-center justify-center overflow-hidden transition-colors focus:outline-none focus:ring-1 focus:ring-pureWhite/30"
    :style="{ perspective: props.perspective, borderRadius: 'inherit' }"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <Transition mode="out-in" v-bind="transitionProps">
      <div
        v-if="currentImage"
        :key="currentImage"
        class="absolute inset-0 overflow-hidden"
        :style="{ borderRadius: 'inherit' }"
      >
        <img
          :src="currentImage"
          :alt="`Slide ${currentIndex + 1}`"
          :class="props.imageClass"
        />
      </div>
    </Transition>

    <div
      v-if="hideOverlay !== true"
      class="absolute inset-0"
      :class="props.overlayClass"
    >
      <Transition
        appear
        enter-active-class="transition-all duration-500 delay-300 ease-in-out"
        enter-from-class="opacity-0 -translate-y-6"
      >
        <slot
          v-if="!isLoading"
          :current-index="currentIndex"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.slider-leave-to {
  opacity: 0;
  filter: blur(12px) brightness(0.18);
  transform: scale(0.985);
  mask-image:
    radial-gradient(circle at 20% 30%, black 0%, black 32%, transparent 58%),
    radial-gradient(circle at 75% 20%, black 0%, black 28%, transparent 55%),
    radial-gradient(circle at 40% 70%, black 0%, black 30%, transparent 60%),
    radial-gradient(circle at 85% 70%, black 0%, black 26%, transparent 52%);
  -webkit-mask-image:
    radial-gradient(circle at 20% 30%, black 0%, black 32%, transparent 58%),
    radial-gradient(circle at 75% 20%, black 0%, black 28%, transparent 55%),
    radial-gradient(circle at 40% 70%, black 0%, black 30%, transparent 60%),
    radial-gradient(circle at 85% 70%, black 0%, black 26%, transparent 52%);
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-size: 140% 140%;
  -webkit-mask-size: 140% 140%;
}

.slider-enter-from {
  opacity: 0;
  filter: blur(18px) brightness(0.25);
  transform: scale(1.035);
}

.slider-enter-active {
  transition:
    opacity 1200ms cubic-bezier(0.33, 1, 0.68, 1) 180ms,
    filter 1200ms cubic-bezier(0.33, 1, 0.68, 1) 180ms,
    transform 1200ms cubic-bezier(0.33, 1, 0.68, 1) 180ms;
}

.slider-leave-active {
  transition:
    opacity 1400ms cubic-bezier(0.4, 0, 0.2, 1),
    filter 1400ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 1400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.slider-img {
  will-change: opacity, filter, transform;
}
</style>
