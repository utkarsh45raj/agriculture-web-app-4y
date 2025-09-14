"use client"

import { useState } from "react"
import { MarketSelector } from "@/components/market-selector"
import { PriceDashboard } from "@/components/price-dashboard"

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
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Market Prices</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
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
                <h2 className="text-2xl font-bold text-primary">{selectedCrop} Market Analysis</h2>
                <p className="text-muted-foreground">{selectedLocation}</p>
              </div>
              <button
                onClick={handleNewSearch}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
