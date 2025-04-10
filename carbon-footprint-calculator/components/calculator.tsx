"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TravelCalculator } from "@/components/travel-calculator"
import { ElectricityCalculator } from "@/components/electricity-calculator"
import { DietCalculator } from "@/components/diet-calculator"
import { ResultsDisplay } from "@/components/results-display"
import { WeatherDisplay } from "@/components/weather-display"
import { Button } from "@/components/ui/button"
import { Share2, Download, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export type EmissionsData = {
  travel: number
  electricity: number
  diet: number
}

export function Calculator() {
  const [emissions, setEmissions] = useState<EmissionsData>({
    travel: 0,
    electricity: 0,
    diet: 0,
  })
  const [calculationComplete, setCalculationComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("travel")
  const { toast } = useToast()

  const updateEmissions = (type: keyof EmissionsData, value: number) => {
    setEmissions((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const handleCalculate = () => {
    if (emissions.travel === 0 && emissions.electricity === 0 && emissions.diet === 0) {
      toast({
        title: "Missing information",
        description: "Please complete at least one calculation section.",
        variant: "destructive",
      })
      return
    }
    setCalculationComplete(true)
  }

  const handleReset = () => {
    setEmissions({
      travel: 0,
      electricity: 0,
      diet: 0,
    })
    setCalculationComplete(false)
    setActiveTab("travel")
  }

  const handleShare = async () => {
    // Check if navigator.share is available and if we're in a secure context
    if (navigator.share && window.isSecureContext) {
      try {
        await navigator.share({
          title: "My Carbon Footprint Results",
          text: `My carbon footprint: Travel: ${emissions.travel.toFixed(2)} kg CO₂, Electricity: ${emissions.electricity.toFixed(2)} kg CO₂, Diet: ${emissions.diet.toFixed(2)} kg CO₂`,
          url: window.location.href,
        })

        toast({
          title: "Shared successfully",
          description: "Your results have been shared.",
        })
      } catch (error) {
        // Don't show error for user cancellation
        if (error.name !== "AbortError") {
          console.error("Error sharing:", error)

          // Fallback to clipboard
          handleCopyToClipboard()
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyToClipboard()
    }
  }

  // Add a new function to copy results to clipboard as fallback
  const handleCopyToClipboard = () => {
    try {
      const shareText = `My carbon footprint: Travel: ${emissions.travel.toFixed(2)} kg CO₂, Electricity: ${emissions.electricity.toFixed(2)} kg CO₂, Diet: ${emissions.diet.toFixed(2)} kg CO₂`

      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Your results have been copied to the clipboard. You can now paste and share them.",
          })
        })
        .catch((err) => {
          console.error("Clipboard write failed:", err)
          toast({
            title: "Sharing not available",
            description: "Please manually copy your results to share them.",
            variant: "destructive",
          })
        })
    } catch (err) {
      console.error("Clipboard API not available:", err)
      toast({
        title: "Sharing not available",
        description: "Please manually copy your results to share them.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF report
    toast({
      title: "Report generated",
      description: "Your carbon footprint report has been downloaded.",
    })
  }

  if (calculationComplete) {
    return (
      <div className="fade-in">
        <ResultsDisplay emissions={emissions} />
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Start Over
          </Button>
          <Button onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
          <Button onClick={handleDownload} variant="secondary" className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <WeatherDisplay />

      <Tabs defaultValue="travel" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="travel">Travel</TabsTrigger>
          <TabsTrigger value="electricity">Electricity</TabsTrigger>
          <TabsTrigger value="diet">Diet</TabsTrigger>
        </TabsList>
        <TabsContent value="travel" className="slide-up">
          <Card>
            <CardHeader>
              <CardTitle>Travel Emissions</CardTitle>
              <CardDescription>Calculate CO₂ emissions from your travel</CardDescription>
            </CardHeader>
            <CardContent>
              <TravelCalculator updateEmissions={(value) => updateEmissions("travel", value)} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("electricity")}>
                Next: Electricity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="electricity" className="slide-up">
          <Card>
            <CardHeader>
              <CardTitle>Electricity Usage</CardTitle>
              <CardDescription>Calculate CO₂ emissions from your electricity consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <ElectricityCalculator updateEmissions={(value) => updateEmissions("electricity", value)} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("travel")}>
                Back: Travel
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("diet")}>
                Next: Diet
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="diet" className="slide-up">
          <Card>
            <CardHeader>
              <CardTitle>Diet Pattern</CardTitle>
              <CardDescription>Calculate CO₂ emissions based on your diet</CardDescription>
            </CardHeader>
            <CardContent>
              <DietCalculator updateEmissions={(value) => updateEmissions("diet", value)} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("electricity")}>
                Back: Electricity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button size="lg" onClick={handleCalculate} className="px-8">
          Calculate Total Footprint
        </Button>
      </div>
    </div>
  )
}
