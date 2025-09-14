"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search, TrendingUp } from "lucide-react"

interface MarketSelectorProps {
  onSelectionChange: (location: string, crop: string) => void
}

export function MarketSelector({ onSelectionChange }: MarketSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("")
  const [customLocation, setCustomLocation] = useState("")

  const locations = [
    "Delhi - Azadpur Mandi",
    "Mumbai - Vashi APMC",
    "Bangalore - Yeshwanthpur",
    "Chennai - Koyambedu",
    "Kolkata - Sealdah",
    "Hyderabad - Gaddiannaram",
    "Pune - Market Yard",
    "Ahmedabad - Jamalpur",
    "Jaipur - Muhana Mandi",
    "Lucknow - Aliganj",
  ]

  const crops = [
    "Wheat",
    "Rice",
    "Maize",
    "Barley",
    "Bajra",
    "Jowar",
    "Sugarcane",
    "Cotton",
    "Soybean",
    "Groundnut",
    "Mustard",
    "Sunflower",
    "Sesame",
    "Turmeric",
    "Coriander",
    "Cumin",
    "Onion",
    "Potato",
    "Tomato",
    "Chili",
  ]

  const handleSearch = () => {
    const location = customLocation || selectedLocation
    if (location && selectedCrop) {
      onSelectionChange(location, selectedCrop)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Market & Crop Selection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Select Market Location</Label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a market" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="crop">Select Crop</Label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom-location">Or enter custom location</Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="custom-location"
                placeholder="Enter your location or nearby mandi"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="w-full"
          disabled={!selectedCrop || (!selectedLocation && !customLocation)}
        >
          <Search className="mr-2 h-4 w-4" />
          Get Market Prices
        </Button>
      </CardContent>
    </Card>
  )
}
