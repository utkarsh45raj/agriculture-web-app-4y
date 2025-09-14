"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Bug, AlertTriangle, Shield, Leaf, Download, Calendar, Droplets } from "lucide-react"
import Image from "next/image"

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

interface PestAnalysisResultsProps {
  imageUrl: string
  detections: Detection[]
  treatments: Treatment[]
}

export function PestAnalysisResults({ imageUrl, detections, treatments }: PestAnalysisResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pest":
        return <Bug className="h-4 w-4" />
      case "disease":
        return <AlertTriangle className="h-4 w-4" />
      case "deficiency":
        return <Leaf className="h-4 w-4" />
      default:
        return <Bug className="h-4 w-4" />
    }
  }

  const highestSeverity = detections.reduce((max, detection) => {
    const severityLevels = { low: 1, medium: 2, high: 3, critical: 4 }
    return severityLevels[detection.severity] > severityLevels[max.severity] ? detection : max
  }, detections[0])

  return (
    <div className="space-y-6">
      {/* Analysis Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Detection Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Analyzed plant"
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg border"
              />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Analyzed Image</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Overall Assessment</p>
                <p
                  className={`text-lg font-bold capitalize ${
                    highestSeverity.severity === "critical"
                      ? "text-red-600"
                      : highestSeverity.severity === "high"
                        ? "text-orange-600"
                        : highestSeverity.severity === "medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                  }`}
                >
                  {highestSeverity.severity} Risk Level
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Detections Found</p>
                <div className="space-y-2">
                  {detections.map((detection, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(detection.type)}
                        <span>{detection.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={detection.confidence} className="w-16 h-2" />
                        <span className="text-xs text-muted-foreground">{detection.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Detections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bug className="h-5 w-5 text-primary" />
            <span>Identified Issues</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detections.map((detection, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(detection.type)}
                    <h4 className="font-medium">{detection.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(detection.severity)}>{detection.severity} severity</Badge>
                    <Badge variant="outline">{detection.confidence}% confidence</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{detection.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Treatment Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-primary" />
            <span>Treatment Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {treatments.map((treatment, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{treatment.method}</h4>
                  <div className="flex items-center space-x-2">
                    {treatment.organic && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">Organic</Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Product</p>
                    <p className="font-medium">{treatment.product}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dosage</p>
                    <p className="font-medium">{treatment.dosage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cost</p>
                    <p className="font-medium text-primary">{treatment.cost}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Timing</p>
                    <p className="font-medium">{treatment.timing}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Frequency</p>
                    <p className="font-medium">{treatment.frequency}</p>
                  </div>
                </div>
              </div>
            ))}

            <Separator />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download Treatment Plan
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                Set Treatment Reminders
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
