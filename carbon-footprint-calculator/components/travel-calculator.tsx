"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center bg-muted rounded-md">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
})

type TravelCalculatorProps = {
  updateEmissions: (value: number) => void
}

type RouteData = {
  origin: { lat: number; lng: number; name: string }
  destination: { lat: number; lng: number; name: string }
  distance: number // in kilometers
}

export function TravelCalculator({ updateEmissions }: TravelCalculatorProps) {
  const [originQuery, setOriginQuery] = useState("")
  const [destinationQuery, setDestinationQuery] = useState("")
  const [originResults, setOriginResults] = useState<any[]>([])
  const [destinationResults, setDestinationResults] = useState<any[]>([])
  const [isSearchingOrigin, setIsSearchingOrigin] = useState(false)
  const [isSearchingDestination, setIsSearchingDestination] = useState(false)
  const [vehicleType, setVehicleType] = useState("car")
  const [route, setRoute] = useState<RouteData | null>(null)
  const [emissions, setEmissions] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const { toast } = useToast()

  // Search for locations using Nominatim (OpenStreetMap)
  const searchLocation = async (
    query: string,
    setResults: (results: any[]) => void,
    setIsSearching: (isSearching: boolean) => void,
  ) => {
    if (query.length < 3) {
      setResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      )
      const data = await response.json()
      setResults(data.slice(0, 5))
    } catch (error) {
      console.error("Error searching for location:", error)
      toast({
        title: "Error",
        description: "Failed to search for location. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  // Calculate route using OpenRouteService
  const calculateRoute = async () => {
    if (!route?.origin || !route?.destination) {
      toast({
        title: "Missing information",
        description: "Please select both origin and destination.",
        variant: "destructive",
      })
      return
    }

    setIsCalculating(true)
    try {
      // In a real app, this would use the OpenRouteService API
      // For this demo, we'll calculate a simple straight-line distance and add 20% for roads
      const lat1 = route.origin.lat
      const lon1 = route.origin.lng
      const lat2 = route.destination.lat
      const lon2 = route.destination.lng

      // Haversine formula to calculate distance
      const R = 6371 // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1)
      const dLon = deg2rad(lon2 - lon1)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c * 1.2 // Add 20% for roads

      setRoute((prev) => (prev ? { ...prev, distance } : null))

      // Calculate emissions using Carbon Interface API
      await calculateEmissions(distance, vehicleType)
    } catch (error) {
      console.error("Error calculating route:", error)
      toast({
        title: "Error",
        description: "Failed to calculate route. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCalculating(false)
    }
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }

  // Calculate emissions using Carbon Interface API
  const calculateEmissions = async (distance: number, vehicleType: string) => {
    try {
      // In a real app, this would use the Carbon Interface API
      // For this demo, we'll use some approximate values
      let emissionFactor: number

      switch (vehicleType) {
        case "car":
          emissionFactor = 0.12 // kg CO2 per km
          break
        case "bus":
          emissionFactor = 0.05 // kg CO2 per km
          break
        case "train":
          emissionFactor = 0.03 // kg CO2 per km
          break
        case "plane":
          emissionFactor = 0.25 // kg CO2 per km
          break
        case "bike":
        case "walk":
          emissionFactor = 0 // kg CO2 per km
          break
        default:
          emissionFactor = 0.12 // Default to car
      }

      const calculatedEmissions = distance * emissionFactor
      setEmissions(calculatedEmissions)
      updateEmissions(calculatedEmissions)

      toast({
        title: "Calculation complete",
        description: `Your travel emissions: ${calculatedEmissions.toFixed(2)} kg CO₂`,
      })
    } catch (error) {
      console.error("Error calculating emissions:", error)
      toast({
        title: "Error",
        description: "Failed to calculate emissions. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (originQuery) {
        searchLocation(originQuery, setOriginResults, setIsSearchingOrigin)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [originQuery])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (destinationQuery) {
        searchLocation(destinationQuery, setDestinationResults, setIsSearchingDestination)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [destinationQuery])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="origin">Origin</Label>
          <div className="relative">
            <Input
              id="origin"
              placeholder="Enter origin location"
              value={originQuery}
              onChange={(e) => setOriginQuery(e.target.value)}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {isSearchingOrigin ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <Search className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          {originResults.length > 0 && (
            <Card className="absolute z-10 w-full max-w-md max-h-60 overflow-auto">
              <ul className="py-2">
                {originResults.map((result) => (
                  <li
                    key={result.place_id}
                    className="px-4 py-2 hover:bg-accent cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setOriginQuery(result.display_name)
                      setOriginResults([])
                      setRoute((prev) => ({
                        ...(prev || {}),
                        origin: {
                          lat: Number.parseFloat(result.lat),
                          lng: Number.parseFloat(result.lon),
                          name: result.display_name,
                        },
                      }))
                    }}
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{result.display_name}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <div className="relative">
            <Input
              id="destination"
              placeholder="Enter destination location"
              value={destinationQuery}
              onChange={(e) => setDestinationQuery(e.target.value)}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {isSearchingDestination ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <Search className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          {destinationResults.length > 0 && (
            <Card className="absolute z-10 w-full max-w-md max-h-60 overflow-auto">
              <ul className="py-2">
                {destinationResults.map((result) => (
                  <li
                    key={result.place_id}
                    className="px-4 py-2 hover:bg-accent cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setDestinationQuery(result.display_name)
                      setDestinationResults([])
                      setRoute((prev) => ({
                        ...(prev || {}),
                        destination: {
                          lat: Number.parseFloat(result.lat),
                          lng: Number.parseFloat(result.lon),
                          name: result.display_name,
                        },
                      }))
                    }}
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{result.display_name}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vehicle-type">Vehicle Type</Label>
        <Select value={vehicleType} onValueChange={setVehicleType}>
          <SelectTrigger id="vehicle-type">
            <SelectValue placeholder="Select vehicle type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="car">Car</SelectItem>
            <SelectItem value="bus">Bus</SelectItem>
            <SelectItem value="train">Train</SelectItem>
            <SelectItem value="plane">Airplane</SelectItem>
            <SelectItem value="bike">Bicycle</SelectItem>
            <SelectItem value="walk">Walking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {route?.origin && route?.destination && <MapComponent route={route} />}

      {route?.distance && (
        <div className="p-4 bg-secondary rounded-md">
          <p className="text-sm">Distance: {route.distance.toFixed(2)} km</p>
          {emissions > 0 && (
            <p className="text-sm font-medium text-primary">Estimated emissions: {emissions.toFixed(2)} kg CO₂</p>
          )}
        </div>
      )}

      <Button
        onClick={calculateRoute}
        disabled={!route?.origin || !route?.destination || isCalculating}
        className="w-full"
      >
        {isCalculating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Calculating...
          </>
        ) : (
          "Calculate Route & Emissions"
        )}
      </Button>
    </div>
  )
}
