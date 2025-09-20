"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle, Eye, Compass } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface WeatherData {
  location: string
  current: {
    temperature: number
    humidity: number
    windSpeed: number
    pressure: number
    visibility: number
    uvIndex: number
    condition: string
    icon: string
  }
  forecast: Array<{
    date: string
    high: number
    low: number
    condition: string
    icon: string
    precipitation: number
  }>
  alerts: Array<{
    id: string
    type: "warning" | "watch" | "advisory"
    title: string
    description: string
    severity: "low" | "medium" | "high"
    validUntil: string
  }>
  insights: Array<{
    id: string
    title: string
    description: string
    impact: string
    recommendation: string
    confidence: number
  }>
}

export default function WeatherPage() {
  const { t } = useTranslation()
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState("Current Location")

  useEffect(() => {
    // Simulate fetching weather data
    setTimeout(() => {
      setWeatherData({
        location: "Bangalore, Karnataka",
        current: {
          temperature: 26,
          humidity: 78,
          windSpeed: 12,
          pressure: 1013,
          visibility: 8,
          uvIndex: 6,
          condition: "Partly Cloudy",
          icon: "partly-cloudy",
        },
        forecast: [
          { date: "Today", high: 28, low: 22, condition: "Partly Cloudy", icon: "partly-cloudy", precipitation: 20 },
          { date: "Tomorrow", high: 30, low: 24, condition: "Sunny", icon: "sunny", precipitation: 5 },
          { date: "Day 3", high: 27, low: 21, condition: "Rainy", icon: "rainy", precipitation: 85 },
          { date: "Day 4", high: 25, low: 19, condition: "Heavy Rain", icon: "heavy-rain", precipitation: 95 },
          { date: "Day 5", high: 29, low: 23, condition: "Cloudy", icon: "cloudy", precipitation: 30 },
        ],
        alerts: [
          {
            id: "1",
            type: "warning",
            title: "Heavy Rainfall Warning",
            description: "Heavy to very heavy rainfall expected in the next 48 hours",
            severity: "high",
            validUntil: "2024-01-15T18:00:00Z",
          },
          {
            id: "2",
            type: "advisory",
            title: "High Humidity Advisory",
            description: "High humidity levels may affect crop health",
            severity: "medium",
            validUntil: "2024-01-14T12:00:00Z",
          },
        ],
        insights: [
          {
            id: "1",
            title: "Optimal Planting Window",
            description: "Weather conditions are favorable for planting rice and vegetables",
            impact: "Positive impact on crop establishment",
            recommendation: "Consider planting within the next 2-3 days before heavy rains",
            confidence: 85,
          },
          {
            id: "2",
            title: "Irrigation Management",
            description: "Expected rainfall will reduce irrigation needs significantly",
            impact: "Water conservation opportunity",
            recommendation: "Reduce irrigation by 70% for the next week",
            confidence: 92,
          },
          {
            id: "3",
            title: "Pest Risk Assessment",
            description: "High humidity and warm temperatures increase pest activity risk",
            impact: "Increased pest pressure expected",
            recommendation: "Apply preventive pest control measures before rain",
            confidence: 78,
          },
        ],
      })
      setLoading(false)
    }, 1500)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "partly-cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
      case "heavy-rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    )
  }

  if (!weatherData) return null

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <Cloud className="h-10 w-10 text-green-600" />
          {t("weatherTitle")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
          Real-time weather data and AI-powered farming insights for {weatherData.location}
        </p>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">{t("currentWeather")}</TabsTrigger>
          <TabsTrigger value="forecast">{t("forecast")}</TabsTrigger>
          <TabsTrigger value="alerts">{t("alerts")}</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950 dark:to-sky-950 border-2 border-blue-100 dark:border-blue-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-blue-700 dark:text-blue-400">
                  <span>Current Conditions</span>
                  {getWeatherIcon(weatherData.current.condition)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{weatherData.current.temperature}°C</div>
                    <p className="text-muted-foreground font-medium">{weatherData.current.condition}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Humidity: {weatherData.current.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Wind: {weatherData.current.windSpeed} km/h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Pressure: {weatherData.current.pressure} hPa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Visibility: {weatherData.current.visibility} km</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-2 border-orange-100 dark:border-orange-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-orange-700 dark:text-orange-400">UV Index</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{weatherData.current.uvIndex}</div>
                  <Progress value={weatherData.current.uvIndex * 10} className="mb-2" />
                  <p className="text-sm text-muted-foreground font-medium">
                    {weatherData.current.uvIndex <= 2
                      ? "Low"
                      : weatherData.current.uvIndex <= 5
                        ? "Moderate"
                        : weatherData.current.uvIndex <= 7
                          ? "High"
                          : "Very High"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {weatherData.forecast.map((day, index) => (
              <Card
                key={index}
                className="text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-100 dark:border-green-800 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-green-700 dark:text-green-400">{day.date}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getWeatherIcon(day.condition)}
                  <div>
                    <div className="text-lg font-bold text-green-600">{day.high}°</div>
                    <div className="text-sm text-muted-foreground font-medium">{day.low}°</div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">{day.precipitation}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{day.condition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {weatherData.alerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    {alert.title}
                  </div>
                  <Badge variant={getSeverityColor(alert.severity) as any}>{alert.severity.toUpperCase()}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{alert.description}</p>
                <p className="text-sm text-muted-foreground">
                  Valid until: {new Date(alert.validUntil).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {weatherData.insights.map((insight) => (
            <Card key={insight.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {insight.title}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <Badge variant="outline">{insight.confidence}%</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{insight.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Impact:</h4>
                    <p className="text-sm text-muted-foreground">{insight.impact}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Recommendation:</h4>
                    <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                  </div>
                </div>
                <Progress value={insight.confidence} className="mt-2" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
