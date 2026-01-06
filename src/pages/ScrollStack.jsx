import { useLayoutEffect, useRef, useCallback } from 'react'
import './ScrollStack.css'

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
)

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.9,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null)
  const cardsRef = useRef([])
  const lastTransformsRef = useRef(new Map())
  const isUpdatingRef = useRef(false)
  const stackStartRef = useRef(null)
  const initialOffsetRef = useRef(null)

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight
      }
    } else {
      const scroller = scrollerRef.current
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight
      }
    }
  }, [useWindowScroll])

  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        // Recompute each time to avoid stale offsets with sticky layouts
        const rect = element.getBoundingClientRect()
        return rect.top + window.scrollY
      } else {
        return element.offsetTop
      }
    },
    [useWindowScroll]
  )

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return

    isUpdatingRef.current = true

    const { scrollTop, containerHeight } = getScrollData()
    const totalCards = cardsRef.current.length
    const isMobile = window.innerWidth < 768;

    // Get the absolute start position of the scrollable content
    const stackStartAbsolute = stackStartRef.current
      ? getElementOffset(stackStartRef.current)
      : 0

    const cardTransitionHeight = containerHeight

    // Calculate scroll relative to the start of the sticky section
    let relativeScroll = Math.max(0, scrollTop - stackStartAbsolute)

    // Clamp the relative scroll to prevent over-scrolling
    const maxScroll = (totalCards - 1) * cardTransitionHeight
    relativeScroll = Math.min(relativeScroll, maxScroll)

    // Which card should be active (0 to N-1)
    let activeCardIndex = Math.min(Math.floor(relativeScroll / cardTransitionHeight), totalCards - 1)

    // Progress of the transition between activeCardIndex and activeCardIndex + 1 (0 to 1)
    let cardProgress = (relativeScroll % cardTransitionHeight) / cardTransitionHeight

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      let translateY = 0
      let scale = baseScale
      let opacity = 0
      let zIndex = totalCards - i

      if (i === activeCardIndex) {
        // Current active card: transitions out
        scale = 1 - ((1 - baseScale) * cardProgress)
        opacity = 1 - (0.6 * cardProgress)
        translateY = -cardTransitionHeight * cardProgress * (isMobile ? 0.1 : 0.15)
        zIndex = totalCards + 20
        zIndex = totalCards + 20

      } else if (i === activeCardIndex + 1) {
        // Next card: transitions in
        translateY = cardTransitionHeight * (1 - cardProgress) * (isMobile ? 0.1 : 0.15)
        scale = baseScale + (1 - baseScale) * cardProgress
        opacity = 0.4 + (0.6 * cardProgress)
        zIndex = totalCards + 10

      } else if (i < activeCardIndex) {
        // Past cards: positioned above and hidden
        translateY = -cardTransitionHeight * 2
        scale = baseScale
        opacity = 0
        zIndex = totalCards - i

      } else {
        // Future cards: positioned below and hidden
        translateY = cardTransitionHeight * 2
        scale = baseScale
        opacity = 0
        zIndex = totalCards - i
      }

      // Ensure the last card stays visible when animation completes
      if (activeCardIndex === totalCards - 1 && i === totalCards - 1) {
        translateY = 0
        scale = 1
        opacity = 1
        zIndex = totalCards + 20
      }

      // Apply transforms with improved positioning
      const transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`

      card.style.transform = transform
      card.style.opacity = String(opacity)
      card.style.zIndex = String(Math.round(zIndex))
      card.style.visibility = opacity > 0 ? 'visible' : 'hidden'
      card.style.pointerEvents = i === activeCardIndex ? 'auto' : 'none'

      lastTransformsRef.current.set(i, { transform, opacity, scale, translateY })
    })

    isUpdatingRef.current = false
  }, [
    useWindowScroll,
    getScrollData,
    getElementOffset,
    baseScale,
    onStackComplete
  ])

  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      updateCardTransforms()
    })
  }, [updateCardTransforms])

  useLayoutEffect(() => {
    const scroller = useWindowScroll ? window : scrollerRef.current
    if (!scroller) return

    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')).filter(card =>
      stackStartRef.current?.contains(card)
    )

    cardsRef.current = cards

    cards.forEach((card, i) => {
      card.style.willChange = 'transform, opacity'
      card.style.transformOrigin = 'center center'
      card.style.position = 'absolute'
      card.style.top = '50%'
      card.style.left = '50%'
      card.style.transform = 'translate(-50%, -50%)'
      card.style.width = '100%'
      card.style.maxWidth = '1000px'
      card.style.isolation = 'isolate'
      card.style.overflow = 'hidden'
      card.style.transition = 'none'

      // Set initial state - only first card visible
      if (i === 0) {
        card.style.opacity = '1'
        card.style.zIndex = '100'
        card.style.transform = 'translate(-50%, -50%) scale(1)'
        card.style.visibility = 'visible'
      } else {
        card.style.opacity = '0'
        card.style.zIndex = '1'
        card.style.transform = 'translate(-50%, calc(-50% + 1200px)) scale(0.8)'
        card.style.visibility = 'hidden'
      }
    })

    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleScroll, { passive: true })
      // Also listen for wheel events for better scroll detection
      window.addEventListener('wheel', handleScroll, { passive: true })
    } else {
      scroller.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleScroll, { passive: true })
    }

    // Trigger initial update immediately
    requestAnimationFrame(() => {
      updateCardTransforms()
    })

    return () => {
      if (useWindowScroll) {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
        window.removeEventListener('wheel', handleScroll)
      } else {
        scroller.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
      cardsRef.current = []
      lastTransformsRef.current.clear()
      isUpdatingRef.current = false
    }
  }, [
    baseScale,
    useWindowScroll,
    updateCardTransforms,
    handleScroll
  ])

  const childCount = Array.isArray(children) ? children.length : 1;
  const innerHeightStyle = useWindowScroll
    ? { height: `${Math.max(childCount, 1) * 100}vh` }
    : { height: 'auto' };

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner" ref={stackStartRef} style={innerHeightStyle}>
        {children}
      </div>
    </div>
  )
}

export default ScrollStack