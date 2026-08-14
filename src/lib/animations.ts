import gsap from 'gsap'

export interface AnimationOptions {
  delay?: number
  duration?: number
  ease?: string
  scrollTrigger?: Record<string, unknown>
}

/**
 * SSR Guard helper
 */
export const isBrowser = (): boolean => typeof window !== 'undefined'

/**
 * Factory for fade-up animations
 */
export const fadeUpAnimation = (
  element: HTMLElement | string,
  options: AnimationOptions = {}
): gsap.core.Tween => {
  const { delay = 0, duration = 0.8, ease = 'power2.out', scrollTrigger } = options

  return gsap.to(element, {
    y: 60,
    opacity: 1,
    duration,
    delay,
    ease,
    ...(scrollTrigger ? { scrollTrigger } : {}),
  })
}

/**
 * Factory for staggered animations across children
 */
export const staggerAnimation = (
  container: HTMLElement | string,
  children: (HTMLElement | string)[] | string,
  options: AnimationOptions & { stagger?: number } = {}
): gsap.core.Tween => {
  const { delay = 0, duration = 0.8, ease = 'power2.out', stagger = 0.1, scrollTrigger } = options

  return gsap.to(children, {
    y: 0,
    opacity: 1,
    duration,
    delay,
    ease,
    stagger,
    ...(scrollTrigger ? { scrollTrigger } : {}),
  })
}

/**
 * Factory for clip-path reveal animations
 */
export const revealClipAnimation = (
  element: HTMLElement | string,
  options: AnimationOptions = {}
): gsap.core.Tween => {
  const { delay = 0, duration = 1.0, ease = 'power3.inOut', scrollTrigger } = options

  return gsap.to(element, {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration,
    delay,
    ease,
    ...(scrollTrigger ? { scrollTrigger } : {}),
  })
}

/**
 * Parallax scroll animation
 */
export const parallaxAnimation = (
  element: HTMLElement | string,
  speed = 20,
  trigger?: HTMLElement | string
): gsap.core.Tween => {
  return gsap.to(element, {
    yPercent: speed,
    ease: 'none',
    ...(trigger
      ? {
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      : {}),
  })
}

/**
 * Animated counter counting up from 0 to target
 */
export const counterAnimation = (
  element: HTMLElement | string,
  target: number,
  options: AnimationOptions = {}
): gsap.core.Tween => {
  const { duration = 2, ease = 'power2.out' } = options
  const obj = { val: 0 }

  return gsap.to(obj, {
    val: target,
    duration,
    ease,
    onUpdate: () => {
      if (typeof element !== 'string' && element && 'textContent' in element) {
        element.textContent = Math.floor(obj.val).toLocaleString()
      }
    },
  })
}
