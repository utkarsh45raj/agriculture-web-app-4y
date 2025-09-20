"use client"

import { useState } from "react"
import { MarketSelector } from "@/components/market-selector"
import { PriceDashboard } from "@/components/price-dashboard"
import { BarChart3 } from "lucide-react"

export default function MarketPricesPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedCrop, setSelectedCrop] = useState<string>("")
  const [showDashboard, setShowDashboard] = useState(false)

  const handleSelectionChange = (location: string, crop: string) => {
    setSelectedLocation(location)
    setSelectedCrop(crop)
    setShowDashboard(true)
  }

  const handleNewSearch = () => {
    setShowDashboard(false)
    setSelectedLocation("")
    setSelectedCrop("")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <BarChart3 className="h-10 w-10 text-green-600" />
          Market Prices
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
          Get real-time market prices for your crops from mandis across India. Compare prices, track trends, and make
          informed selling decisions.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {!showDashboard ? (
          <MarketSelector onSelectionChange={handleSelectionChange} />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {selectedCrop} Market Analysis
                </h2>
                <p className="text-lg text-muted-foreground font-medium">{selectedLocation}</p>
              </div>
              <button
                onClick={handleNewSearch}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-950"
              >
                ← New Search
              </button>
            </div>

            <PriceDashboard location={selectedLocation} crop={selectedCrop} />
          </div>
        )}
      </div>
    </div>
  )
}
