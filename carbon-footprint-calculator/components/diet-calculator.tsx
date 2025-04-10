"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Loader2, Beef, Salad } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type DietCalculatorProps = {
  updateEmissions: (value: number) => void
}

export function DietCalculator({ updateEmissions }: DietCalculatorProps) {
  const [dietType, setDietType] = useState("mixed")
  const [meatFrequency, setMeatFrequency] = useState(3) // days per week
  const [emissions, setEmissions] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const { toast } = useToast()

  // Annual emissions in kg CO2 equivalent
  const dietEmissions = {
    vegan: 1100, // kg CO2e per year
    vegetarian: 1700, // kg CO2e per year
    pescatarian: 2300, // kg CO2e per year
    mixed: 2800, // kg CO2e per year
    highMeat: 3300, // kg CO2e per year
  }

  const calculateEmissions = () => {
    setIsCalculating(true)

    // Simulate API call
    setTimeout(() => {
      let calculatedEmissions: number

      if (dietType === "mixed") {
        // Adjust based on meat frequency (3 days per week is the baseline)
        const baseEmission = dietEmissions.mixed
        const adjustmentFactor = meatFrequency / 3
        calculatedEmissions = baseEmission * adjustmentFactor
      } else {
        calculatedEmissions = dietEmissions[dietType as keyof typeof dietEmissions]
      }

      // Convert annual to monthly
      calculatedEmissions = calculatedEmissions / 12

      setEmissions(calculatedEmissions)
      updateEmissions(calculatedEmissions)

      toast({
        title: "Calculation complete",
        description: `Your monthly diet emissions: ${calculatedEmissions.toFixed(2)} kg CO₂`,
      })

      setIsCalculating(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <RadioGroup value={dietType} onValueChange={setDietType}>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegan" id="vegan" />
            <Label htmlFor="vegan" className="flex items-center gap-2">
              <Salad className="h-4 w-4 text-green-500" />
              Vegan (plant-based only)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegetarian" id="vegetarian" />
            <Label htmlFor="vegetarian" className="flex items-center gap-2">
              <Salad className="h-4 w-4 text-green-400" />
              Vegetarian (includes dairy and eggs)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pescatarian" id="pescatarian" />
            <Label htmlFor="pescatarian">Pescatarian (vegetarian + fish)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed" id="mixed" />
            <Label htmlFor="mixed" className="flex items-center gap-2">
              <Beef className="h-4 w-4 text-amber-600" />
              Mixed (some meat consumption)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="highMeat" id="highMeat" />
            <Label htmlFor="highMeat" className="flex items-center gap-2">
              <Beef className="h-4 w-4 text-red-500" />
              High meat consumption
            </Label>
          </div>
        </div>
      </RadioGroup>

      {dietType === "mixed" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="meat-frequency">Meat consumption (days per week)</Label>
            <span className="text-sm text-muted-foreground">{meatFrequency} days</span>
          </div>
          <Slider
            id="meat-frequency"
            min={1}
            max={7}
            step={1}
            value={[meatFrequency]}
            onValueChange={(value) => setMeatFrequency(value[0])}
          />
        </div>
      )}

      {emissions > 0 && (
        <div className="p-4 bg-secondary rounded-md">
          <p className="text-sm font-medium text-primary">Estimated monthly emissions: {emissions.toFixed(2)} kg CO₂</p>
          <p className="text-xs text-muted-foreground mt-1">Annual emissions: {(emissions * 12).toFixed(2)} kg CO₂</p>
        </div>
      )}

      <Button onClick={calculateEmissions} disabled={isCalculating} className="w-full">
        {isCalculating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Calculating...
          </>
        ) : (
          "Calculate Diet Emissions"
        )}
      </Button>
    </div>
  )
}
