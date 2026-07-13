import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scenarioMeta: Record<string, string> = {
  read: '01 / 閱讀',
  participate: '02 / 互動',
  publish: '03 / 發布',
  money: '04 / 金流',
}

const setActiveTrace = (scenario: string) => {
  const story = document.querySelector<HTMLElement>('[data-trace-story]')
  if (!story) return

  story.querySelectorAll<HTMLElement>('[data-trace-chapter]').forEach((chapter) => {
    const active = chapter.dataset.traceChapter === scenario
    chapter.classList.toggle('is-active', active)
    if (active) chapter.setAttribute('aria-current', 'step')
    else chapter.removeAttribute('aria-current')
  })

  story.querySelectorAll<SVGElement>('[data-route], [data-node]').forEach((element) => {
    const active = element.dataset.route === scenario || element.dataset.node === scenario
    element.classList.toggle('is-active', active)
  })

  const readout = story.querySelector<HTMLElement>('[data-trace-readout]')
  if (readout) readout.textContent = scenarioMeta[scenario] ?? '01 / 閱讀'
}

const mm = gsap.matchMedia()

mm.add(
  {
    reduceMotion: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 960px) and (prefers-reduced-motion: no-preference)',
    motionOK: '(prefers-reduced-motion: no-preference)',
  },
  (context) => {
    const { reduceMotion, desktop, motionOK } = context.conditions as Record<string, boolean>

    if (reduceMotion) {
      gsap.set('[data-hero-item], [data-hero-map], [data-evidence-card]', {
        clearProps: 'all',
      })
      setActiveTrace('read')
      return
    }

    if (motionOK) {
      const hero = gsap.timeline({ defaults: { ease: 'power3.out' } })
      hero.addLabel('supporting-copy')
      hero
        .from('[data-hero-item]', {
          y: 24,
          autoAlpha: 0,
          duration: 0.72,
          stagger: 0.1,
        }, 'supporting-copy')
        .from(
          '[data-footprint-map="hero"] .map-grid',
          { opacity: 0, duration: 0.6 },
          '<0.18'
        )
        .fromTo(
          '[data-footprint-map="hero"] .map-route',
          { strokeDashoffset: 640 },
          { strokeDashoffset: 0, duration: 0.85, stagger: 0.08, ease: 'power2.inOut' },
          '<0.08'
        )
        .from(
          '[data-footprint-map="hero"] .map-node',
          { scale: 0.72, opacity: 0, duration: 0.45, stagger: 0.07, transformOrigin: 'center' },
          '<0.3'
        )
        .from(
          '[data-footprint-map="hero"] .map-legend, .hero__caption',
          { opacity: 0, y: 10, duration: 0.4 },
          '<0.15'
        )
        .fromTo(
          '[data-footprint-map="hero"] [data-node="center"] .map-node__inner',
          { scale: 0.75, transformOrigin: 'center' },
          { scale: 1, duration: 0.45, ease: 'back.out(2)' },
          '<'
        )

      const dashboard = document.querySelector<HTMLElement>('[data-dashboard]')
      if (dashboard) {
        const dashboardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: dashboard,
            start: 'top 72%',
            once: true,
          },
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
            { y: 18, opacity: 0, duration: 0.45, stagger: 0.06, clearProps: 'transform' },
            0.24
          )
      }
    }

    if (desktop) {
      const story = document.querySelector<HTMLElement>('[data-trace-story]')
      const layout = story?.querySelector<HTMLElement>('.trace-layout')
      const pin = story?.querySelector<HTMLElement>('[data-trace-pin]')
      const chapters = Array.from(
        story?.querySelectorAll<HTMLElement>('[data-trace-chapter]') ?? []
      )

      if (story && layout && pin && chapters.length) {
        ScrollTrigger.create({
          trigger: layout,
          start: 'top top+=88',
          end: 'bottom bottom-=72',
          pin,
          pinSpacing: false,
          invalidateOnRefresh: true,
        })

        chapters.forEach((chapter) => {
          const scenario = chapter.dataset.traceChapter ?? 'read'
          const route = story.querySelector<SVGElement>(`[data-route="${scenario}"]`)

          ScrollTrigger.create({
            trigger: chapter,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveTrace(scenario),
            onEnterBack: () => setActiveTrace(scenario),
          })

          if (route) {
            gsap.fromTo(
              route,
              { strokeDashoffset: 640 },
              {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: chapter,
                  start: 'top 75%',
                  end: 'center 42%',
                  scrub: 0.8,
                },
              }
            )
          }
        })
      }
    }
  }
)

window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
