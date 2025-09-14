"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sprout, MapPin, Calendar, TrendingUp, AlertTriangle } from "lucide-react"

interface CropRecommendation {
  crop: string
  suitability: "high" | "medium" | "low"
  season: string
  expectedYield: string
  tips: string[]
}

interface Advisory {
  location: string
  season: string
  recommendations: CropRecommendation[]
  alerts: string[]
}

export function CropAdvisory() {
  const [advisory, setAdvisory] = useState<Advisory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdvisory = async () => {
      setLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Mock advisory data based on location and season
      const mockAdvisory: Advisory = {
        location: "Your Region",
        season: "Winter Season",
        recommendations: [
          {
            crop: "Wheat",
            suitability: "high",
            season: "Rabi",
            expectedYield: "4-5 tons/hectare",
            tips: ["Plant by mid-November", "Use certified seeds", "Apply phosphorus fertilizer"],
          },
          {
            crop: "Mustard",
            suitability: "high",
            season: "Rabi",
            expectedYield: "1.5-2 tons/hectare",
            tips: ["Good for oil production", "Requires less water", "Plant in rows"],
          },
          {
            crop: "Barley",
            suitability: "medium",
            season: "Rabi",
            expectedYield: "3-4 tons/hectare",
            tips: ["Drought tolerant", "Good for animal feed", "Harvest early"],
          },
        ],
        alerts: [
          "Frost warning expected next week - protect young plants",
          "Optimal planting window closing in 10 days",
        ],
      }

      setAdvisory(mockAdvisory)
      setLoading(false)
    }

    fetchAdvisory()
  }, [])

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "high":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sprout className="h-5 w-5 text-primary animate-pulse" />
            <span>Crop Advisory</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Sprout className="h-12 w-12 text-primary animate-grow mx-auto mb-4" />
            <p className="text-muted-foreground">Loading crop recommendations...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!advisory) return null

  return (
    <Card className="h-96">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Sprout className="h-5 w-5 text-primary" />
          <span>Crop Advisory</span>
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{advisory.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{advisory.season}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Alerts */}
        {advisory.alerts.length > 0 && (
          <div className="space-y-2">
            {advisory.alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 p-2 bg-orange-50 border border-orange-200 rounded-md"
              >
                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-orange-800">{alert}</span>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Recommended Crops</h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {advisory.recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-sm">{rec.crop}</h5>
                  <Badge className={getSuitabilityColor(rec.suitability)}>{rec.suitability} suitability</Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Expected: {rec.expectedYield}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Season: {rec.season}</span>
                  </div>
                </div>
                <div className="text-xs">
                  <span className="font-medium">Tips: </span>
                  <span className="text-muted-foreground">{rec.tips.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <Sprout className="mr-2 h-4 w-4" />
          Get Detailed Report
        </Button>
      </CardContent>
    </Card>
  )
}
