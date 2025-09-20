"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const schemes = [
  {
    id: 1,
    title: "Pradhan Mantri Krishi Sinchai Yojana",
    subtitle: "More Crop Per Drop",
    image: "/kri.png",
    description: "Enhancing water use efficiency through micro-irrigation and precision farming techniques",
  },
  {
    id: 2,
    title: "PM-KISAN Scheme",
    subtitle: "Direct Income Support",
    image: "/pm-kis.png",
    description: "Financial assistance of ₹6,000 per year to small and marginal farmers",
  },
  {
    id: 3,
    title: "Pradhan Mantri Fasal Bima Yojana",
    subtitle: "Crop Insurance Protection",
    image: "/fasal.png",
    description: "Comprehensive crop insurance against natural calamities and pest attacks",
  },
  {
    id: 4,
    title: "Soil Health Card Scheme",
    subtitle: "Know Your Soil",
    image: "/soil.png",
    description: "Detailed soil analysis and nutrient recommendations for better crop yield",
  },
  {
    id: 5,
    title: "Kisan Credit Card",
    subtitle: "Easy Farm Credit",
    image: "/credit.png",
    description: "Flexible credit facility for farmers to meet their agricultural needs",
  },
]

export default function GovernmentSchemesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % schemes.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % schemes.length)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + schemes.length) % schemes.length)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-3xl p-8 md:p-12 mb-20 animate-fade-in-up border border-green-100 dark:border-green-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          Government Schemes for Farmers
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Empowering Farmers with Government Initiatives
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Main carousel container */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg">
          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-md"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-md"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Slide content */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {schemes.map((scheme) => (
              <div key={scheme.id} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  {/* Image section */}
                  <div className="relative">
                    <img
                      src={scheme.image || "/placeholder.svg"}
                      alt={scheme.title}
                      className="w-full h-64 md:h-80 object-cover rounded-xl"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                      <h3 className="font-bold text-lg">{scheme.title}</h3>
                      <p className="text-sm opacity-90">{scheme.subtitle}</p>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="flex flex-col justify-center">
                    <div className="text-center md:text-right mb-6">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {currentSlide + 1} of {schemes.length}
                      </div>
                      <div className="w-16 h-1 bg-green-600 mx-auto md:ml-auto"></div>
                    </div>

                    <h3 className="text-2xl font-bold text-primary mb-4">{scheme.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{scheme.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {schemes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-green-600 scale-125" : "bg-gray-300 dark:bg-gray-600 hover:bg-green-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
