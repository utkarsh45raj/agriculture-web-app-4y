"use client"

import { useState } from "react"
import { SoilInputForm } from "@/components/soil-input-form"
import { FertilizerRecommendations } from "@/components/fertilizer-recommendations"

interface SoilData {
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  organicMatter: number
  moisture: number
  temperature: number
}

export default function SoilHealthPage() {
  const [soilData, setSoilData] = useState<SoilData | null>(null)
  const [showRecommendations, setShowRecommendations] = useState(false)

  const handleAnalyze = (data: SoilData) => {
    setSoilData(data)
    setShowRecommendations(true)
  }

  const handleNewAnalysis = () => {
    setSoilData(null)
    setShowRecommendations(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Soil Health Analysis</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Get personalized fertilizer recommendations based on your soil test results. Enter values manually or upload
          your soil test report for automatic analysis.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {!showRecommendations ? (
          <SoilInputForm onAnalyze={handleAnalyze} />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Analysis Results</h2>
              <button
                onClick={handleNewAnalysis}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← New Analysis
              </button>
            </div>

            {soilData && <FertilizerRecommendations soilData={soilData} />}
          </div>
        )}
      </div>
    </div>
  )
}
