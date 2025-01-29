'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useMotionTemplate, animate } from 'framer-motion'
import { DotLottiePlayer } from '@dotlottie/react-player'
import Image from 'next/image'
import productImage from '@/assets/product-image.png'

// Tab configuration data
const tabs = [
  {
    icon: '/assets/lottie/vroom.lottie',
    title: 'User-friendly dashboard',
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: '/assets/lottie/click.lottie',
    title: 'One-click optimization',
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: '/assets/lottie/stars.lottie',
    title: 'Smart keyword generator',
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
]

// Tab component for individual tabs
const FeatureTab = ({
  title,
  icon,
  isNew,
  selected,
  onClick,
}: {
  title: string
  icon: string
  isNew: boolean
  selected: boolean
  onClick: () => void
}) => {
  const tabRef = useRef<HTMLDivElement>(null)
  const dotLottieRef = useRef(null)

  const xPercentage = useMotionValue(100)
  const yPercentage = useMotionValue(0)

  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`

  useEffect(() => {
    if (!tabRef.current || !selected) return

    // Reset radial gradient positions
    xPercentage.set(0)
    yPercentage.set(0)

    const { height, width } = tabRef.current.getBoundingClientRect()
    const circumference = (height + width) * 2

    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ]

    const animationOptions = {
      times,
      duration: 4,
      repeat: Infinity,
      ease: 'linear',
      repeatType: 'loop',
    }

    animate(xPercentage, [0, 100, 100, 0, 0], animationOptions as any)
    animate(yPercentage, [0, 0, 100, 100, 0], animationOptions as any)
  }, [selected, xPercentage, yPercentage])

  const handleHover = () => {
    if (dotLottieRef.current) {
      dotLottieRef.current.seek(0)
      dotLottieRef.current.play()
    }
  }

  return (
    <div
      ref={tabRef}
      onMouseEnter={handleHover}
      onClick={onClick}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 relative"
    >
      {selected && (
        <motion.div
          style={{ maskImage }}
          className="absolute inset-0 border -m-px border-[#A369ff] rounded-lg"
        />
      )}

      <div className="h-12 w-12 border border-white/15 rounded-lg flex items-center justify-center">
        <DotLottiePlayer
          ref={dotLottieRef}
          src={icon}
          className="h-5 w-5"
          autoplay
        />
      </div>

      <div className="font-medium">{title}</div>

      {isNew && (
        <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">
          NEW
        </div>
      )}
    </div>  
  )
}

// Main component for the feature section
export const Features = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX)
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY)
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX)

  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`

  const handleTabSelect = (index: number) => {
    setSelectedTab(index)

    animate(
      backgroundSizeX,
      [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX],
      {
        duration: 2,
        ease: 'easeInOut',
      }
    )

    animate(
      backgroundPositionX,
      [backgroundPositionX.get(), tabs[index].backgroundPositionX],
      {
        duration: 2,
        ease: 'easeInOut',
      }
    )

    animate(
      backgroundPositionY,
      [backgroundPositionY.get(), tabs[index].backgroundPositionY],
      {
        duration: 2,
        ease: 'easeInOut',
      }
    )
  }

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center">
          Elevate your SEO efforts
        </h2>
        <p className="text-white/70 md:text-xl max-w-2xl mx-auto text-lg text-center mt-5">
          From small start-ups to large enterprises, our AI-driven tool has
          revolutionized SEO.
        </p>

        {/* Tab navigation */}
        <div className="mt-10 flex flex-col lg:flex-row gap-3">
          {tabs.map((tab, index) => (
            <FeatureTab
              key={index}
              {...tab}
              selected={selectedTab === index}
              onClick={() => handleTabSelect(index)}
            />
          ))}
        </div>

        {/* Background image section */}
        <div className="border border-white/20 p-2.5 rounded-xl mt-3">
          <motion.div
            className="aspect-video bg-cover border border-white/20 rounded-lg"
            style={{
              backgroundImage: `url(${productImage.src})`,
              backgroundPosition,
              backgroundSize,
            }}
          />
        </div>
      </div>
    </section>
  )
}
