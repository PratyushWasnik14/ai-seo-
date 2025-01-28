'use client'
import { motion, useScroll } from 'motion/react'
import starsBg from '@/assets/stars.png'
import gridLines from '@/assets/grid-lines.png'
import { RefObject, useEffect, useRef } from 'react'
import { useTransform } from 'motion/react'
import { useMotionTemplate } from 'motion/react'
import { useMotionValue } from 'framer-motion'

const useRelativeMousePosition = (elementRef) => {
  const mouseX = useMotionValue(0) // Tracks the X position
  const mouseY = useMotionValue(0) // Tracks the Y position

  // Helper to calculate relative mouse position
  const getRelativePosition = (event) => {
    if (!elementRef.current) return { x: 0, y: 0 }
    const { top, left } = elementRef.current.getBoundingClientRect()
    return {
      x: event.x - left,
      y: event.y - top,
    }
  }

  // Updates the motion values based on mouse movement
  const handleMouseMove = (event) => {
    const { x, y } = getRelativePosition(event)
    mouseX.set(x)
    mouseY.set(y)
  }

  // Attach the event listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [elementRef]) // Ensure cleanup works correctly

  return [mouseX, mouseY]
}

export const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const borderedDivRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef)

  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px,black,transparent)`
  return (
    <section className="py-20 md:py-24" ref={sectionRef}>
      <div className="container">
        <motion.div
          ref={borderedDivRef}
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative group"
          animate={{
            backgroundPositionX: starsBg.width,
          }}
          transition={{
            ease: 'linear',
            duration: 60,
            repeat: Infinity,
          }}
          style={{
            backgroundPositionY,
            backgroundImage: `url(${starsBg.src})`,
          }}
        >
          <div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
            style={{
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></div>
          <motion.div
            className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700 "
            style={{ maskImage, backgroundImage: `url(${gridLines.src})` }}
          ></motion.div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">
              AI-driven SEO for everyone
            </h2>
            <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">
              Achieve clear impact full reults without complexity
            </p>
            <div className="flex justify-center mt-8">
              <div>
                <button className="realtive py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]">
                  <span>Join WaitList</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
