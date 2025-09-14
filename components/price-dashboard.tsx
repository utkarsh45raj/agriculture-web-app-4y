"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Minus, MapPin, Calendar, Bell, BarChart3 } from "lucide-react"

interface PriceData {
  market: string
  crop: string
  currentPrice: number
  previousPrice: number
  minPrice: number
  maxPrice: number
  avgPrice: number
  unit: string
  lastUpdated: string
  trend: "up" | "down" | "stable"
  changePercent: number
}

interface MarketComparison {
  market: string
  price: number
  distance: string
}

interface PriceDashboardProps {
  location: string
  crop: string
}

export function PriceDashboard({ location, crop }: PriceDashboardProps) {
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [comparisons, setComparisons] = useState<MarketComparison[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPriceData = async () => {
      setLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock price data
      const mockPriceData: PriceData = {
        market: location,
        crop: crop,
        currentPrice: Math.floor(Math.random() * 3000) + 1500,
        previousPrice: Math.floor(Math.random() * 3000) + 1400,
        minPrice: Math.floor(Math.random() * 1000) + 1200,
        maxPrice: Math.floor(Math.random() * 1000) + 3500,
        avgPrice: Math.floor(Math.random() * 500) + 2000,
        unit: "per quintal",
        lastUpdated: "2 hours ago",
        trend: Math.random() > 0.5 ? "up" : Math.random() > 0.3 ? "down" : "stable",
        changePercent: Math.floor(Math.random() * 20) - 10,
      }

      const mockComparisons: MarketComparison[] = [
        {
          market: "Nearby Market A",
          price: mockPriceData.currentPrice + Math.floor(Math.random() * 200) - 100,
          distance: "15 km",
        },
        {
          market: "Nearby Market B",
          price: mockPriceData.currentPrice + Math.floor(Math.random() * 300) - 150,
          distance: "28 km",
        },
        {
          market: "Regional Hub",
          price: mockPriceData.currentPrice + Math.floor(Math.random() * 400) - 200,
          distance: "45 km",
        },
        {
          market: "State Market",
          price: mockPriceData.currentPrice + Math.floor(Math.random() * 500) - 250,
          distance: "120 km",
        },
      ]

      setPriceData(mockPriceData)
      setComparisons(mockComparisons)
      setLoading(false)
    }

    fetchPriceData()
  }, [location, crop])

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
            <p className="text-muted-foreground">Loading market prices...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!priceData) return null

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Price Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>{crop} Prices</span>
            </CardTitle>
            <Badge variant="outline" className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current Price</p>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <p className="text-2xl font-bold text-primary">₹{priceData.currentPrice}</p>
                {getTrendIcon(priceData.trend)}
              </div>
              <p className="text-xs text-muted-foreground">{priceData.unit}</p>
              <p className={`text-sm font-medium ${getTrendColor(priceData.trend)}`}>
                {priceData.changePercent > 0 ? "+" : ""}
                {priceData.changePercent}%
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Min Price</p>
              <p className="text-xl font-bold text-red-600 mt-1">₹{priceData.minPrice}</p>
              <p className="text-xs text-muted-foreground">{priceData.unit}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Max Price</p>
              <p className="text-xl font-bold text-green-600 mt-1">₹{priceData.maxPrice}</p>
              <p className="text-xs text-muted-foreground">{priceData.unit}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Average Price</p>
              <p className="text-xl font-bold text-blue-600 mt-1">₹{priceData.avgPrice}</p>
              <p className="text-xs text-muted-foreground">{priceData.unit}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {priceData.lastUpdated}</span>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Set Price Alert
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Market Comparison and Trends */}
      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comparison">Market Comparison</TabsTrigger>
          <TabsTrigger value="trends">Price Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Markets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {comparisons.map((market, index) => {
                  const priceDiff = market.price - priceData.currentPrice
                  const isHigher = priceDiff > 0

                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{market.market}</p>
                        <p className="text-sm text-muted-foreground">{market.distance} away</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{market.price}</p>
                        <p className={`text-sm ${isHigher ? "text-red-600" : "text-green-600"}`}>
                          {isHigher ? "+" : ""}₹{priceDiff} ({isHigher ? "higher" : "lower"})
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Price Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock trend data */}
                {[
                  { day: "Today", price: priceData.currentPrice, change: priceData.changePercent },
                  { day: "Yesterday", price: priceData.previousPrice, change: -2.1 },
                  { day: "2 days ago", price: priceData.currentPrice - 50, change: 1.8 },
                  { day: "3 days ago", price: priceData.currentPrice - 80, change: -0.5 },
                  { day: "4 days ago", price: priceData.currentPrice - 30, change: 3.2 },
                  { day: "5 days ago", price: priceData.currentPrice - 120, change: -1.8 },
                  { day: "6 days ago", price: priceData.currentPrice - 90, change: 2.5 },
                ].map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-b last:border-b-0">
                    <span className="text-sm font-medium">{trend.day}</span>
                    <div className="flex items-center space-x-3">
                      <span className="font-bold">₹{trend.price}</span>
                      <span
                        className={`text-sm flex items-center space-x-1 ${
                          trend.change > 0 ? "text-green-600" : trend.change < 0 ? "text-red-600" : "text-gray-600"
                        }`}
                      >
                        {trend.change > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : trend.change < 0 ? (
                          <TrendingDown className="h-3 w-3" />
                        ) : (
                          <Minus className="h-3 w-3" />
                        )}
                        <span>
                          {trend.change > 0 ? "+" : ""}
                          {trend.change}%
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
