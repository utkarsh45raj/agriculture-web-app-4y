"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TestTube, Upload, FileText, Calculator } from "lucide-react"

interface SoilData {
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  organicMatter: number
  moisture: number
  temperature: number
}

interface SoilInputFormProps {
  onAnalyze: (data: SoilData) => void
}

export function SoilInputForm({ onAnalyze }: SoilInputFormProps) {
  const [soilData, setSoilData] = useState<SoilData>({
    ph: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    organicMatter: 0,
    moisture: 0,
    temperature: 0,
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (field: keyof SoilData, value: string) => {
    setSoilData((prev) => ({
      ...prev,
      [field]: Number.parseFloat(value) || 0,
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Simulate file processing
      setIsProcessing(true)
      setTimeout(() => {
        // Mock extracted data from uploaded report
        setSoilData({
          ph: 6.5,
          nitrogen: 45,
          phosphorus: 25,
          potassium: 180,
          organicMatter: 3.2,
          moisture: 22,
          temperature: 18,
        })
        setIsProcessing(false)
      }, 2000)
    }
  }

  const handleAnalyze = () => {
    onAnalyze(soilData)
  }

  const isFormValid = Object.values(soilData).some((value) => value > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TestTube className="h-5 w-5 text-primary" />
          <span>Soil Analysis Input</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Manual Entry</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Report</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ph">pH Level</Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  placeholder="6.5"
                  value={soilData.ph || ""}
                  onChange={(e) => handleInputChange("ph", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nitrogen">Nitrogen (N) - kg/ha</Label>
                <Input
                  id="nitrogen"
                  type="number"
                  min="0"
                  placeholder="45"
                  value={soilData.nitrogen || ""}
                  onChange={(e) => handleInputChange("nitrogen", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phosphorus">Phosphorus (P) - kg/ha</Label>
                <Input
                  id="phosphorus"
                  type="number"
                  min="0"
                  placeholder="25"
                  value={soilData.phosphorus || ""}
                  onChange={(e) => handleInputChange("phosphorus", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="potassium">Potassium (K) - kg/ha</Label>
                <Input
                  id="potassium"
                  type="number"
                  min="0"
                  placeholder="180"
                  value={soilData.potassium || ""}
                  onChange={(e) => handleInputChange("potassium", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organicMatter">Organic Matter - %</Label>
                <Input
                  id="organicMatter"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="3.2"
                  value={soilData.organicMatter || ""}
                  onChange={(e) => handleInputChange("organicMatter", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="moisture">Moisture Content - %</Label>
                <Input
                  id="moisture"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="22"
                  value={soilData.moisture || ""}
                  onChange={(e) => handleInputChange("moisture", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4 mt-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {isProcessing ? (
                <div className="space-y-4">
                  <FileText className="h-12 w-12 text-primary animate-pulse mx-auto" />
                  <div>
                    <p className="text-sm font-medium">Processing soil test report...</p>
                    <p className="text-xs text-muted-foreground">Extracting soil parameters</p>
                  </div>
                </div>
              ) : uploadedFile ? (
                <div className="space-y-4">
                  <FileText className="h-12 w-12 text-green-500 mx-auto" />
                  <div>
                    <p className="text-sm font-medium">File uploaded successfully</p>
                    <p className="text-xs text-muted-foreground">{uploadedFile.name}</p>
                    <p className="text-xs text-green-600 mt-2">Soil data extracted and populated below</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-sm font-medium">Upload your soil test report</p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, JPG, PNG files. We'll extract the soil parameters automatically.
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>
              )}
            </div>

            {uploadedFile && !isProcessing && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Extracted Soil Data:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <p className="font-medium">pH Level</p>
                    <p className="text-primary">{soilData.ph}</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="font-medium">Nitrogen</p>
                    <p className="text-primary">{soilData.nitrogen} kg/ha</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="font-medium">Phosphorus</p>
                    <p className="text-primary">{soilData.phosphorus} kg/ha</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="font-medium">Potassium</p>
                    <p className="text-primary">{soilData.potassium} kg/ha</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <Button onClick={handleAnalyze} disabled={!isFormValid || isProcessing} className="w-full">
            <TestTube className="mr-2 h-4 w-4" />
            Analyze Soil & Get Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
