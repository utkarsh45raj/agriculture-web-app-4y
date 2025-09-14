"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sprout, Calendar, Droplets, Thermometer, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface CropRecommendation {
  id: string
  name: string
  variety: string
  suitability: number
  season: string
  duration: string
  expectedYield: string
  waterRequirement: string
  soilType: string[]
  advantages: string[]
  challenges: string[]
  marketPrice: string
  profitability: "high" | "medium" | "low"
}

interface CropGuidance {
  stage: string
  timeline: string
  activities: string[]
  tips: string[]
  warnings: string[]
}

export default function CropAdvisoryPage() {
  const { t } = useTranslation()
  const [selectedCrop, setSelectedCrop] = useState<string>("")
  const [selectedSeason, setSelectedSeason] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("bangalore")
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [cropGuidance, setCropGuidance] = useState<CropGuidance[]>([])
  const [loading, setLoading] = useState(false)

  const crops = [
    { value: "rice", label: "Rice (धान)" },
    { value: "wheat", label: "Wheat (गेहूं)" },
    { value: "tomato", label: "Tomato (टमाटर)" },
    { value: "onion", label: "Onion (प्याज)" },
    { value: "potato", label: "Potato (आलू)" },
    { value: "cotton", label: "Cotton (कपास)" },
    { value: "sugarcane", label: "Sugarcane (गन्ना)" },
    { value: "maize", label: "Maize (मक्का)" },
  ]

  const seasons = [
    { value: "kharif", label: "Kharif (खरीफ) - Monsoon" },
    { value: "rabi", label: "Rabi (रबी) - Winter" },
    { value: "zaid", label: "Zaid (जायद) - Summer" },
  ]

  const locations = [
    { value: "bangalore", label: "Bangalore, Karnataka" },
    { value: "delhi", label: "Delhi, NCR" },
    { value: "mumbai", label: "Mumbai, Maharashtra" },
    { value: "chennai", label: "Chennai, Tamil Nadu" },
    { value: "hyderabad", label: "Hyderabad, Telangana" },
  ]

  const getRecommendations = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const mockRecommendations: CropRecommendation[] = [
        {
          id: "1",
          name: "Rice",
          variety: "Basmati 1121",
          suitability: 92,
          season: "Kharif",
          duration: "120-130 days",
          expectedYield: "4-5 tons/hectare",
          waterRequirement: "High (1200-1500mm)",
          soilType: ["Clay", "Loamy"],
          advantages: ["High market demand", "Good export potential", "Suitable climate"],
          challenges: ["Water intensive", "Pest management required"],
          marketPrice: "₹25-30/kg",
          profitability: "high",
        },
        {
          id: "2",
          name: "Tomato",
          variety: "Hybrid varieties",
          suitability: 88,
          season: "Rabi",
          duration: "90-120 days",
          expectedYield: "25-30 tons/hectare",
          waterRequirement: "Medium (600-800mm)",
          soilType: ["Sandy loam", "Well-drained"],
          advantages: ["High yield potential", "Good market price", "Multiple harvests"],
          challenges: ["Disease susceptible", "Storage issues"],
          marketPrice: "₹15-25/kg",
          profitability: "high",
        },
        {
          id: "3",
          name: "Onion",
          variety: "Red onion varieties",
          suitability: 75,
          season: "Rabi",
          duration: "120-150 days",
          expectedYield: "15-20 tons/hectare",
          waterRequirement: "Medium (500-700mm)",
          soilType: ["Sandy loam", "Well-drained"],
          advantages: ["Good storage life", "Consistent demand", "Export potential"],
          challenges: ["Price volatility", "Storage requirements"],
          marketPrice: "₹12-18/kg",
          profitability: "medium",
        },
      ]

      const mockGuidance: CropGuidance[] = [
        {
          stage: "Land Preparation",
          timeline: "Week 1-2",
          activities: [
            "Deep plowing to 20-25 cm depth",
            "Apply organic manure (10-15 tons/hectare)",
            "Level the field properly",
            "Prepare raised beds if needed",
          ],
          tips: ["Ensure proper drainage system", "Test soil pH (should be 6.0-7.5)", "Remove weeds and crop residues"],
          warnings: ["Avoid working in waterlogged conditions", "Do not use fresh manure"],
        },
        {
          stage: "Sowing/Planting",
          timeline: "Week 3-4",
          activities: [
            "Select certified seeds",
            "Treat seeds with fungicide",
            "Maintain proper spacing",
            "Apply basal fertilizers",
          ],
          tips: [
            "Sow during optimal weather conditions",
            "Maintain seed depth of 2-3 cm",
            "Ensure adequate soil moisture",
          ],
          warnings: ["Avoid sowing in extreme weather", "Do not use damaged seeds"],
        },
        {
          stage: "Growth & Care",
          timeline: "Week 5-12",
          activities: [
            "Regular irrigation as per crop needs",
            "Apply top-dress fertilizers",
            "Monitor for pests and diseases",
            "Weed management",
          ],
          tips: [
            "Use drip irrigation for water efficiency",
            "Apply fertilizers based on soil test",
            "Regular field monitoring",
          ],
          warnings: ["Avoid over-watering", "Watch for early signs of diseases"],
        },
        {
          stage: "Harvesting",
          timeline: "Week 13-16",
          activities: [
            "Monitor crop maturity indicators",
            "Harvest at optimal time",
            "Proper post-harvest handling",
            "Storage or immediate sale",
          ],
          tips: ["Harvest during dry weather", "Use proper harvesting tools", "Handle produce carefully"],
          warnings: ["Avoid harvesting in rain", "Do not delay harvesting"],
        },
      ]

      setRecommendations(mockRecommendations)
      setCropGuidance(mockGuidance)
      setLoading(false)
    }, 1500)
  }

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
          <Sprout className="h-8 w-8" />
          {t("cropAdvisoryPageTitle")}
        </h1>
        <p className="text-muted-foreground text-lg">
          Get personalized crop recommendations based on your location, season, and soil conditions
        </p>
      </div>

      {/* Selection Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Get Crop Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t("selectSeason")}</label>
              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season.value} value={season.value}>
                      {season.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t("selectCrop")} (Optional)</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={getRecommendations}
            disabled={!selectedLocation || !selectedSeason || loading}
            className="w-full md:w-auto"
          >
            {loading ? "Getting Recommendations..." : t("getRecommendations")}
          </Button>
        </CardContent>
      </Card>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing soil, weather, and market conditions...</p>
        </div>
      )}

      {recommendations.length > 0 && (
        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommendations">Crop Recommendations</TabsTrigger>
            <TabsTrigger value="guidance">Growing Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((crop) => (
                <Card key={crop.id} className="relative">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{crop.name}</span>
                      <Badge className={getProfitabilityColor(crop.profitability)}>
                        {crop.profitability.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{crop.variety}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Suitability</span>
                        <span className="text-sm font-bold text-primary">{crop.suitability}%</span>
                      </div>
                      <Progress value={crop.suitability} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span className="font-medium">Duration:</span>
                        </div>
                        <p className="text-muted-foreground">{crop.duration}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="h-3 w-3" />
                          <span className="font-medium">Yield:</span>
                        </div>
                        <p className="text-muted-foreground">{crop.expectedYield}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Droplets className="h-3 w-3" />
                          <span className="font-medium">Water:</span>
                        </div>
                        <p className="text-muted-foreground">{crop.waterRequirement}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Thermometer className="h-3 w-3" />
                          <span className="font-medium">Price:</span>
                        </div>
                        <p className="text-muted-foreground">{crop.marketPrice}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 text-green-700">Advantages:</h4>
                      <ul className="text-xs space-y-1">
                        {crop.advantages.map((advantage, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 text-orange-700">Challenges:</h4>
                      <ul className="text-xs space-y-1">
                        {crop.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <AlertCircle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guidance" className="space-y-6">
            <div className="space-y-6">
              {cropGuidance.map((stage, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3>{stage.stage}</h3>
                        <p className="text-sm text-muted-foreground font-normal flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {stage.timeline}
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Activities:</h4>
                      <ul className="text-sm space-y-1">
                        {stage.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-green-700">Tips:</h4>
                        <ul className="text-sm space-y-1">
                          {stage.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2 text-red-700">Warnings:</h4>
                        <ul className="text-sm space-y-1">
                          {stage.warnings.map((warning, warnIndex) => (
                            <li key={warnIndex} className="flex items-start gap-1">
                              <AlertCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
