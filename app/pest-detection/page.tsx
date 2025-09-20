"use client"

import { useState } from "react"
import { ImageUpload } from "@/components/image-upload"
import { PestAnalysisResults } from "@/components/pest-analysis-results"
import { Shield } from "lucide-react"

interface Detection {
  name: string
  confidence: number
  severity: "low" | "medium" | "high" | "critical"
  type: "pest" | "disease" | "deficiency"
  description: string
}

interface Treatment {
  method: string
  product: string
  dosage: string
  timing: string
  frequency: string
  cost: string
  organic: boolean
}

export default function PestDetectionPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [detections, setDetections] = useState<Detection[]>([])
  const [treatments, setTreatments] = useState<Treatment[]>([])

  const handleImageUpload = async (file: File, url: string) => {
    setImageUrl(url)
    setIsAnalyzing(true)
    setAnalysisComplete(false)

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock detection results based on common agricultural issues
    const mockDetections: Detection[] = [
      {
        name: "Aphids",
        confidence: 92,
        severity: "high",
        type: "pest",
        description:
          "Small green insects found on leaf undersides, causing yellowing and stunted growth. Can transmit viral diseases.",
      },
      {
        name: "Early Blight",
        confidence: 78,
        severity: "medium",
        type: "disease",
        description:
          "Fungal disease causing dark spots with concentric rings on leaves. Common in warm, humid conditions.",
      },
      {
        name: "Nitrogen Deficiency",
        confidence: 65,
        severity: "low",
        type: "deficiency",
        description: "Yellowing of older leaves starting from leaf tips, indicating insufficient nitrogen uptake.",
      },
    ]

    const mockTreatments: Treatment[] = [
      {
        method: "Insecticidal Soap Spray",
        product: "Neem Oil Solution",
        dosage: "2-3 ml per liter of water",
        timing: "Early morning or evening",
        frequency: "Every 3-4 days for 2 weeks",
        cost: "$15-20 per hectare",
        organic: true,
      },
      {
        method: "Fungicide Application",
        product: "Copper Sulfate",
        dosage: "2g per liter of water",
        timing: "Before rain or irrigation",
        frequency: "Weekly for 3 weeks",
        cost: "$25-30 per hectare",
        organic: false,
      },
      {
        method: "Foliar Fertilizer",
        product: "Urea Solution (1%)",
        dosage: "10g per liter of water",
        timing: "Early morning",
        frequency: "Bi-weekly for 1 month",
        cost: "$10-15 per hectare",
        organic: false,
      },
    ]

    setDetections(mockDetections)
    setTreatments(mockTreatments)
    setIsAnalyzing(false)
    setAnalysisComplete(true)
  }

  const handleNewAnalysis = () => {
    setAnalysisComplete(false)
    setImageUrl("")
    setDetections([])
    setTreatments([])
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <Shield className="h-10 w-10 text-green-600" />
          Pest & Disease Detection
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
          Upload a photo of your plant to identify pests, diseases, and nutrient deficiencies. Get instant treatment
          recommendations powered by AI.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {!analysisComplete ? (
          <ImageUpload onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Analysis Complete
              </h2>
              <button
                onClick={handleNewAnalysis}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-950"
              >
                ← Analyze New Image
              </button>
            </div>

            <PestAnalysisResults imageUrl={imageUrl} detections={detections} treatments={treatments} />
          </div>
        )}
      </div>
    </div>
  )
}
