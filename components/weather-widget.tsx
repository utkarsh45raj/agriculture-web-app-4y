"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, MapPin } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  forecast: {
    day: string
    high: number
    low: number
    condition: string
  }[]
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState("Getting location...")

  useEffect(() => {
    // Simulate getting user location and weather data
    const fetchWeather = async () => {
      setLoading(true)

      // Simulate geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation("Your Location")
          },
          () => {
            setLocation("Default Location")
          },
        )
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock weather data
      const mockWeather: WeatherData = {
        location: "Farm Location, State",
        temperature: 24,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        visibility: 10,
        forecast: [
          { day: "Today", high: 26, low: 18, condition: "sunny" },
          { day: "Tomorrow", high: 23, low: 16, condition: "cloudy" },
          { day: "Wed", high: 21, low: 14, condition: "rainy" },
          { day: "Thu", high: 25, low: 17, condition: "sunny" },
        ],
      }

      setWeather(mockWeather)
      setLoading(false)
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="h-5 w-5 text-primary animate-pulse" />
            <span>Weather</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Cloud className="h-12 w-12 text-primary animate-bounce mx-auto mb-4" />
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) return null

  return (
    <Card className="h-96">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Cloud className="h-5 w-5 text-primary" />
          <span>Weather</span>
        </CardTitle>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{weather.location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-1">{weather.temperature}°C</div>
          <div className="text-sm text-muted-foreground mb-3">{weather.condition}</div>

          {/* Weather Stats */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="flex flex-col items-center space-y-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">Humidity</span>
              <span className="font-medium">{weather.humidity}%</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Wind className="h-4 w-4 text-gray-500" />
              <span className="text-muted-foreground">Wind</span>
              <span className="font-medium">{weather.windSpeed} km/h</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Eye className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">Visibility</span>
              <span className="font-medium">{weather.visibility} km</span>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">4-Day Forecast</h4>
          <div className="space-y-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="w-16 text-muted-foreground">{day.day}</span>
                <div className="flex items-center space-x-2">
                  {getWeatherIcon(day.condition)}
                  <span className="w-12 text-right font-medium">{day.high}°</span>
                  <span className="w-12 text-right text-muted-foreground">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <Thermometer className="mr-2 h-4 w-4" />
          Detailed Forecast
        </Button>
      </CardContent>
    </Card>
  )
}
