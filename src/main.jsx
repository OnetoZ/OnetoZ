import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root = createRoot(document.getElementById('app'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Simple scroll-reveal for elements with .lp-reveal and word-splitting for .lp-words
function initAnimations() {
  // word-by-word split
  document.querySelectorAll('.lp-words').forEach((el) => {
    if (el.dataset.processed) return
    const text = el.getAttribute('data-text') || el.textContent || ''
    el.textContent = ''
    const words = text.split(' ')
    words.forEach((w, i) => {
      const span = document.createElement('span')
      span.textContent = w
      span.style.animationDelay = `${Math.min(i * 140, 2200)}ms`
      el.appendChild(span)
      // add a real space between word spans so spacing is preserved
      if (i !== words.length - 1) el.appendChild(document.createTextNode(' '))
    })
    el.dataset.processed = '1'
  })

  // letter-by-letter split (Word-aware to prevent breaking mid-word)
  document.querySelectorAll('.lp-letters').forEach((el) => {
    if (el.dataset.processed) return
    const text = el.getAttribute('data-text') || el.textContent || ''
    el.textContent = ''

    // Split by words first to keep them together
    const words = text.split(' ');
    let charIndex = 0;

    words.forEach((word, wIndex) => {
      // Create a wrapper for the word to prevent mid-word breaks
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      // Add a normal space after each word except the last, or use margin
      // Using margin-right on wordSpan is safer than a separate text node for layout
      if (wIndex < words.length - 1) {
        wordSpan.style.marginRight = '0.3em';
      }

      Array.from(word).forEach((ch) => {
        const span = document.createElement('span')
        span.textContent = ch
        span.style.animationDelay = `${charIndex * 40}ms`
        wordSpan.appendChild(span)
        charIndex++;
      })
      el.appendChild(wordSpan);

      // We explicitly add a space text node if we want "real" reflow behavior, 
      // but inline-block wrapper + margin is often more controllable. 
      // However, standard text wrapping relies on spaces. 
      // Let's stick to the inline-block word wrapper which forces the whole word to move down.
      // And we add a space textnode after just in case, or rely on the margin.
      // Actually, just margin is cleaner.
    });

    el.dataset.processed = '1'
  })

  // scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'transform 1100ms ease, opacity 1100ms ease'
          entry.target.style.transform = 'translateY(0)'
          entry.target.style.opacity = '1'
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  document.querySelectorAll('.lp-reveal').forEach((el) => observer.observe(el))
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initAnimations, 0)
} else {
  window.addEventListener('DOMContentLoaded', initAnimations)
}
