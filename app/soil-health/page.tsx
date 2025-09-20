"use client"

import { useState } from "react"
import { SoilInputForm } from "@/components/soil-input-form"
import { FertilizerRecommendations } from "@/components/fertilizer-recommendations"
import { Award } from "lucide-react"

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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <Award className="h-10 w-10 text-green-600" />
          Soil Health Analysis
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Analysis Results
              </h2>
              <button
                onClick={handleNewAnalysis}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-950"
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
