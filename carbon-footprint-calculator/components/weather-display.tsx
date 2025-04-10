"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type WeatherData = {
  location: string
  temperature: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  aqi?: number
}

export function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // In a real app, this would use the OpenWeather API with the provided key
        // For this demo, we'll use mock data

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock weather data
        const mockWeather: WeatherData = {
          location: lat === 40.7128 ? "New York, USA" : "Your Location",
          temperature: 22,
          description: "Partly Cloudy",
          icon: "cloud",
          humidity: 65,
          windSpeed: 12,
          aqi: 35,
        }

        setWeather(mockWeather)
      } catch (err) {
        console.error("Error fetching weather:", err)
        setError("Failed to fetch weather data")
        toast({
          title: "Error",
          description: "Could not fetch weather data for your location.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    // Start with default location instead of trying geolocation first
    // This avoids the permissions error when geolocation is disabled
    setLoading(true)

    // Use default location (New York)
    const defaultLat = 40.7128
    const defaultLon = -74.006

    // Try to fetch weather with the default location
    fetchWeather(defaultLat, defaultLon)

    // Optionally try geolocation if available, but don't depend on it
    if (navigator.geolocation) {
      try {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (permissionStatus.state === "granted") {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  fetchWeather(position.coords.latitude, position.coords.longitude)
                },
                (err) => {
                  console.log("Geolocation permission available but error occurred:", err)
                  // Already fetching with default location, so no need to handle error
                },
              )
            } else {
              console.log("Geolocation permission not granted:", permissionStatus.state)
              // Already fetching with default location, so no need to handle error
            }
          })
          .catch((err) => {
            console.log("Error checking geolocation permission:", err)
            // Already fetching with default location, so no need to handle error
          })
      } catch (err) {
        console.log("Error accessing geolocation permissions API:", err)
        // Already fetching with default location, so no need to handle error
      }
    }
  }, [toast])

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-8 w-8" />

    switch (weather.icon) {
      case "clear":
        return <Sun className="h-8 w-8 text-amber-500" />
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "cloud":
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />
    }
  }

  const getAqiLevel = (aqi?: number) => {
    if (!aqi) return { text: "Unknown", color: "text-gray-500" }

    if (aqi <= 50) return { text: "Good", color: "text-green-500" }
    if (aqi <= 100) return { text: "Moderate", color: "text-yellow-500" }
    if (aqi <= 150) return { text: "Unhealthy for Sensitive Groups", color: "text-orange-500" }
    if (aqi <= 200) return { text: "Unhealthy", color: "text-red-500" }
    if (aqi <= 300) return { text: "Very Unhealthy", color: "text-purple-500" }
    return { text: "Hazardous", color: "text-rose-700" }
  }

  const getAqiTip = (aqi?: number) => {
    if (!aqi) return "No air quality data available."

    if (aqi <= 50) {
      return "Air quality is good. It's a great day for outdoor activities and walking instead of driving."
    }
    if (aqi <= 100) {
      return "Air quality is acceptable. Consider carpooling or using public transport to help reduce emissions."
    }
    if (aqi <= 150) {
      return "Air quality is unhealthy for sensitive groups. Consider limiting outdoor activities and using public transport."
    }
    return "Air quality is unhealthy. Limit outdoor activities and consider working from home if possible."
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!weather) return null

  const aqiLevel = getAqiLevel(weather.aqi)

  return (
    <Card className="fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Current Weather</span>
          {getWeatherIcon()}
        </CardTitle>
        <CardDescription>{weather.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-3xl font-bold">{weather.temperature}°C</div>
            <div className="text-muted-foreground">{weather.description}</div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Droplets className="h-5 w-5 text-blue-400" />
              <span className="text-sm mt-1">{weather.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <Wind className="h-5 w-5 text-gray-400" />
              <span className="text-sm mt-1">{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {weather.aqi && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Air Quality Index</span>
              <span className={`text-sm font-bold ${aqiLevel.color}`}>
                {weather.aqi} - {aqiLevel.text}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{getAqiTip(weather.aqi)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
