import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scenarioOrder = ['read', 'participate', 'publish', 'money'] as const
type Scenario = (typeof scenarioOrder)[number]

const scenarioMeta: Record<Scenario, { code: string; state: string; focus: string }> = {
  read: { code: '01 / 查資料', state: 'VIEW / RESEARCH', focus: 'network' },
  participate: { code: '02 / 聯絡與互動', state: 'VIEW / CONTACT', focus: 'platform' },
  publish: { code: '03 / 上稿', state: 'VIEW / PUBLISH', focus: 'outside' },
  money: { code: '04 / 收款', state: 'VIEW / PAYMENT', focus: 'outside' },
}

const updateTraceStack = (stack: HTMLElement, scenario: Scenario) => {
  stack.classList.remove(...scenarioOrder.map((id) => `is-${id}`))
  stack.classList.add(`is-${scenario}`)

  stack.querySelectorAll<HTMLElement>('[data-layer-scenario]').forEach((value) => {
    value.hidden = value.dataset.layerScenario !== scenario
  })

  stack.querySelectorAll<HTMLElement>('[data-trace-layer]').forEach((layer) => {
    layer.classList.toggle('is-focus', layer.dataset.traceLayer === scenarioMeta[scenario].focus)
  })

  const code = stack.querySelector<HTMLElement>('[data-trace-code]')
  const state = stack.querySelector<HTMLElement>('[data-trace-state]')
  if (code) code.textContent = scenarioMeta[scenario].code
  if (state) state.textContent = scenarioMeta[scenario].state
}

const setActiveTrace = (scenario: Scenario) => {
  const story = document.querySelector<HTMLElement>('[data-trace-story]')
  if (!story) return

  story.querySelectorAll<HTMLElement>('[data-trace-chapter]').forEach((chapter) => {
    const active = chapter.dataset.traceChapter === scenario
    chapter.classList.toggle('is-active', active)
    if (active) chapter.setAttribute('aria-current', 'step')
    else chapter.removeAttribute('aria-current')
  })

  story.querySelectorAll<HTMLElement>('[data-trace-stack]').forEach((stack) => {
    updateTraceStack(stack, scenario)
  })
}

document.querySelectorAll<HTMLElement>('[data-trace-stack="hero"]').forEach((stack) => {
  updateTraceStack(stack, 'read')
})
setActiveTrace('read')

const mm = gsap.matchMedia()

mm.add(
  {
    reduceMotion: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 960px) and (prefers-reduced-motion: no-preference)',
    motionOK: '(prefers-reduced-motion: no-preference)',
  },
  (context) => {
    const { reduceMotion, desktop, motionOK } = context.conditions as Record<string, boolean>
    const cleanup: Array<() => void> = []

    if (reduceMotion) {
      gsap.set('[data-hero-item], [data-hero-map], [data-evidence-card]', { clearProps: 'all' })
      gsap.set('[data-trace-layer], .trace-stack__signal span', { clearProps: 'all' })
    }

    if (motionOK) {
      const hero = gsap.timeline({ defaults: { ease: 'power3.out' } })
      hero
        .addLabel('supporting-copy')
        .from(
          '[data-hero-item]',
          { y: 24, autoAlpha: 0, duration: 0.68, stagger: 0.1 },
          'supporting-copy'
        )
        .from(
          '[data-trace-stack="hero"] .trace-stack__frame',
          { scale: 0.97, autoAlpha: 0, duration: 0.65 },
          'supporting-copy+=0.08'
        )
        .from(
          '[data-trace-stack="hero"] [data-trace-layer]',
          {
            y: 34,
            autoAlpha: 0,
            duration: 0.5,
            stagger: { each: 0.08, from: 'end' },
          },
          'supporting-copy+=0.2'
        )
        .from(
          '[data-trace-stack="hero"] .trace-stack__signal span',
          { scaleY: 0, transformOrigin: 'top center', duration: 0.72, ease: 'power2.inOut' },
          'supporting-copy+=0.32'
        )

      const dashboard = document.querySelector<HTMLElement>('[data-dashboard]')
      if (dashboard) {
        const dashboardTimeline = gsap.timeline({
          scrollTrigger: { trigger: dashboard, start: 'top 72%', once: true },
        })

        dashboard.querySelectorAll<HTMLElement>('[data-count]').forEach((counter) => {
          const target = Number(counter.dataset.count ?? 0)
          const state = { value: 0 }
          counter.textContent = '0'
          dashboardTimeline.to(
            state,
            {
              value: target,
              duration: 0.7,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = String(Math.round(state.value))
              },
            },
            0
          )
        })

        dashboardTimeline
          .from(
            '.dashboard-bar > span',
            { scaleX: 0, transformOrigin: 'left center', duration: 0.75, stagger: 0.08 },
            0.08
          )
          .from(
            '[data-evidence-card]',
            { y: 18, autoAlpha: 0, duration: 0.45, stagger: 0.05 },
            0.24
          )
      }
    }

    const story = document.querySelector<HTMLElement>('[data-trace-story]')
    const layout = story?.querySelector<HTMLElement>('.trace-layout')
    const pin = story?.querySelector<HTMLElement>('[data-trace-pin]')
    const stack = story?.querySelector<HTMLElement>('[data-trace-stack="story"]')
    const chapters = Array.from(story?.querySelectorAll<HTMLElement>('[data-trace-chapter]') ?? [])

    if (desktop && story && layout && pin && stack && chapters.length) {
      const layers = Array.from(stack.querySelectorAll<HTMLElement>('[data-trace-layer]'))
      const signal = stack.querySelector<HTMLElement>('.trace-stack__signal span')
      let activeIndex = -1

      const traceTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: layout,
          start: 'top top+=88',
          end: 'bottom bottom-=72',
          pin,
          pinSpacing: false,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length))
            if (nextIndex === activeIndex) return
            activeIndex = nextIndex
            const scenario = chapters[nextIndex]?.dataset.traceChapter as Scenario | undefined
            if (scenario && scenarioOrder.includes(scenario)) setActiveTrace(scenario)
          },
        },
      })

      chapters.forEach((chapter, index) => {
        const scenario = chapter.dataset.traceChapter as Scenario
        traceTimeline.addLabel(scenario, index)
        traceTimeline.to(
          layers,
          {
            y: (layerIndex) => ((index + layerIndex) % 2 === 0 ? -5 : 5),
            duration: 0.45,
            stagger: 0.025,
          },
          index
        )
        if (signal) {
          traceTimeline.to(
            signal,
            { scaleY: (index + 1) / chapters.length, transformOrigin: 'top center', duration: 0.45 },
            index
          )
        }
        traceTimeline.to({}, { duration: 0.55 }, index + 0.45)
      })
    } else if (story && chapters.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting)
          const scenario = visible?.target instanceof HTMLElement
            ? visible.target.dataset.traceChapter as Scenario | undefined
            : undefined
          if (scenario && scenarioOrder.includes(scenario)) setActiveTrace(scenario)
        },
        { rootMargin: '-38% 0px -48% 0px', threshold: 0 }
      )
      chapters.forEach((chapter) => observer.observe(chapter))
      cleanup.push(() => observer.disconnect())
    }

    return () => cleanup.forEach((dispose) => dispose())
  }
)

window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
