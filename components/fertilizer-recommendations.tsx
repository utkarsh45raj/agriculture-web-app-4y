"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Leaf, AlertTriangle, CheckCircle, TrendingUp, Download } from "lucide-react"

interface SoilData {
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  organicMatter: number
  moisture: number
  temperature: number
}

interface Recommendation {
  fertilizer: string
  amount: string
  timing: string
  method: string
  cost: string
  priority: "high" | "medium" | "low"
}

interface SoilAnalysis {
  overallHealth: "excellent" | "good" | "fair" | "poor"
  healthScore: number
  issues: string[]
  strengths: string[]
  recommendations: Recommendation[]
}

interface FertilizerRecommendationsProps {
  soilData: SoilData
}

export function FertilizerRecommendations({ soilData }: FertilizerRecommendationsProps) {
  // Analyze soil data and generate recommendations
  const analyzesoil = (data: SoilData): SoilAnalysis => {
    const issues: string[] = []
    const strengths: string[] = []
    const recommendations: Recommendation[] = []
    let healthScore = 100

    // pH Analysis
    if (data.ph < 6.0) {
      issues.push("Soil is too acidic (pH < 6.0)")
      recommendations.push({
        fertilizer: "Lime (CaCO₃)",
        amount: "2-3 tons/hectare",
        timing: "Before planting season",
        method: "Broadcast and incorporate",
        cost: "$150-200/hectare",
        priority: "high",
      })
      healthScore -= 15
    } else if (data.ph > 8.0) {
      issues.push("Soil is too alkaline (pH > 8.0)")
      recommendations.push({
        fertilizer: "Sulfur",
        amount: "200-300 kg/hectare",
        timing: "2-3 months before planting",
        method: "Broadcast and incorporate",
        cost: "$80-120/hectare",
        priority: "high",
      })
      healthScore -= 15
    } else {
      strengths.push("pH level is optimal for most crops")
    }

    // Nitrogen Analysis
    if (data.nitrogen < 30) {
      issues.push("Low nitrogen content")
      recommendations.push({
        fertilizer: "Urea (46-0-0)",
        amount: "100-150 kg/hectare",
        timing: "Split application: 50% at planting, 50% at tillering",
        method: "Side dress or broadcast",
        cost: "$60-90/hectare",
        priority: "high",
      })
      healthScore -= 20
    } else if (data.nitrogen > 80) {
      issues.push("Excess nitrogen - risk of lodging and delayed maturity")
      healthScore -= 10
    } else {
      strengths.push("Adequate nitrogen levels")
    }

    // Phosphorus Analysis
    if (data.phosphorus < 15) {
      issues.push("Low phosphorus content")
      recommendations.push({
        fertilizer: "DAP (18-46-0)",
        amount: "75-100 kg/hectare",
        timing: "At planting time",
        method: "Band placement near seed",
        cost: "$45-60/hectare",
        priority: "medium",
      })
      healthScore -= 15
    } else {
      strengths.push("Good phosphorus availability")
    }

    // Potassium Analysis
    if (data.potassium < 120) {
      issues.push("Low potassium content")
      recommendations.push({
        fertilizer: "Muriate of Potash (0-0-60)",
        amount: "50-75 kg/hectare",
        timing: "Before planting",
        method: "Broadcast and incorporate",
        cost: "$35-50/hectare",
        priority: "medium",
      })
      healthScore -= 15
    } else {
      strengths.push("Sufficient potassium levels")
    }

    // Organic Matter Analysis
    if (data.organicMatter < 2.0) {
      issues.push("Low organic matter content")
      recommendations.push({
        fertilizer: "Compost or FYM",
        amount: "5-10 tons/hectare",
        timing: "Before land preparation",
        method: "Broadcast and incorporate",
        cost: "$100-150/hectare",
        priority: "low",
      })
      healthScore -= 10
    } else {
      strengths.push("Good organic matter content")
    }

    // Determine overall health
    let overallHealth: "excellent" | "good" | "fair" | "poor"
    if (healthScore >= 90) overallHealth = "excellent"
    else if (healthScore >= 75) overallHealth = "good"
    else if (healthScore >= 60) overallHealth = "fair"
    else overallHealth = "poor"

    return {
      overallHealth,
      healthScore: Math.max(0, healthScore),
      issues,
      strengths,
      recommendations,
    }
  }

  const analysis = analyzesoil(soilData)

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Soil Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span>Soil Health Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall Health Status</p>
              <p className={`text-2xl font-bold capitalize ${getHealthColor(analysis.overallHealth)}`}>
                {analysis.overallHealth}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Health Score</p>
              <p className="text-2xl font-bold">{analysis.healthScore}/100</p>
            </div>
          </div>
          <Progress value={analysis.healthScore} className="h-2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Strengths */}
            {analysis.strengths.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-green-600 flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>Strengths</span>
                </h4>
                <ul className="space-y-1">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Issues */}
            {analysis.issues.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-red-600 flex items-center space-x-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Issues to Address</span>
                </h4>
                <ul className="space-y-1">
                  {analysis.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fertilizer Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Fertilizer Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {analysis.recommendations.length > 0 ? (
            <div className="space-y-4">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{rec.fertilizer}</h4>
                    <Badge className={getPriorityColor(rec.priority)}>{rec.priority} priority</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Application Rate</p>
                      <p className="font-medium">{rec.amount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Timing</p>
                      <p className="font-medium">{rec.timing}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Method</p>
                      <p className="font-medium">{rec.method}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Estimated Cost</p>
                      <p className="font-medium text-primary">{rec.cost}</p>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Report
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-green-600">Excellent Soil Health!</p>
              <p className="text-sm text-muted-foreground">
                Your soil parameters are within optimal ranges. Continue with regular monitoring.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
