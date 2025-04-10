"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Loader2, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ElectricityCalculatorProps = {
  updateEmissions: (value: number) => void
}

export function ElectricityCalculator({ updateEmissions }: ElectricityCalculatorProps) {
  const [kwh, setKwh] = useState<number>(300)
  const [country, setCountry] = useState("global")
  const [emissions, setEmissions] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const { toast } = useToast()

  // Emission factors by country (kg CO2 per kWh)
  const emissionFactors: Record<string, number> = {
    global: 0.475, // Global average
    us: 0.417, // United States
    uk: 0.233, // United Kingdom
    china: 0.681, // China
    india: 0.708, // India
    germany: 0.338, // Germany
    france: 0.056, // France (low due to nuclear)
    australia: 0.79, // Australia
    canada: 0.12, // Canada
    brazil: 0.074, // Brazil
  }

  const calculateEmissions = () => {
    if (kwh <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a positive value for electricity usage.",
        variant: "destructive",
      })
      return
    }

    setIsCalculating(true)

    // Simulate API call
    setTimeout(() => {
      const factor = emissionFactors[country] || emissionFactors.global
      const calculatedEmissions = kwh * factor

      setEmissions(calculatedEmissions)
      updateEmissions(calculatedEmissions)

      toast({
        title: "Calculation complete",
        description: `Your electricity emissions: ${calculatedEmissions.toFixed(2)} kg CO₂`,
      })

      setIsCalculating(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="kwh">Monthly Electricity Usage (kWh)</Label>
          <span className="text-sm text-muted-foreground">{kwh} kWh</span>
        </div>
        <div className="flex items-center gap-4">
          <Zap className="h-5 w-5 text-primary" />
          <Slider
            id="kwh"
            min={0}
            max={1000}
            step={10}
            value={[kwh]}
            onValueChange={(value) => setKwh(value[0])}
            className="flex-1"
          />
        </div>
        <Input type="number" value={kwh} onChange={(e) => setKwh(Number(e.target.value))} className="mt-2" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country/Region</Label>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">Global Average</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="china">China</SelectItem>
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="germany">Germany</SelectItem>
            <SelectItem value="france">France</SelectItem>
            <SelectItem value="australia">Australia</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
            <SelectItem value="brazil">Brazil</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {emissions > 0 && (
        <div className="p-4 bg-secondary rounded-md">
          <p className="text-sm font-medium text-primary">Estimated emissions: {emissions.toFixed(2)} kg CO₂</p>
          <p className="text-xs text-muted-foreground mt-1">
            Based on {emissionFactors[country].toFixed(3)} kg CO₂/kWh for{" "}
            {country === "global"
              ? "global average"
              : country === "us"
                ? "United States"
                : country === "uk"
                  ? "United Kingdom"
                  : country === "china"
                    ? "China"
                    : country === "india"
                      ? "India"
                      : country === "germany"
                        ? "Germany"
                        : country === "france"
                          ? "France"
                          : country === "australia"
                            ? "Australia"
                            : country === "canada"
                              ? "Canada"
                              : country === "brazil"
                                ? "Brazil"
                                : country}
          </p>
        </div>
      )}

      <Button onClick={calculateEmissions} disabled={isCalculating || kwh <= 0} className="w-full">
        {isCalculating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Calculating...
          </>
        ) : (
          "Calculate Electricity Emissions"
        )}
      </Button>
    </div>
  )
}
