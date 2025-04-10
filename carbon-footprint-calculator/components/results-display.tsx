"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, AlertTriangle, Info } from "lucide-react"
import type { EmissionsData } from "@/components/calculator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

type ResultsDisplayProps = {
  emissions: EmissionsData
}

export function ResultsDisplay({ emissions }: ResultsDisplayProps) {
  const totalEmissions = emissions.travel + emissions.electricity + emissions.diet

  // Format data for charts
  const pieData = [
    { name: "Travel", value: emissions.travel },
    { name: "Electricity", value: emissions.electricity },
    { name: "Diet", value: emissions.diet },
  ]

  const barData = [
    { name: "Travel", value: emissions.travel },
    { name: "Electricity", value: emissions.electricity },
    { name: "Diet", value: emissions.diet },
  ]

  const COLORS = ["#10b981", "#6366f1", "#f59e0b"]

  // Generate suggestions based on emissions
  const getSuggestions = () => {
    const suggestions = []

    if (emissions.travel > 50) {
      suggestions.push("Consider using public transportation or carpooling to reduce travel emissions.")
    }

    if (emissions.travel > 100) {
      suggestions.push("For long distances, trains often have a lower carbon footprint than flying or driving.")
    }

    if (emissions.electricity > 100) {
      suggestions.push("Switching to energy-efficient appliances can reduce your electricity consumption.")
    }

    if (emissions.electricity > 200) {
      suggestions.push("Consider renewable energy options like solar panels for your home.")
    }

    if (emissions.diet > 200) {
      suggestions.push("Reducing meat consumption, especially beef, can significantly lower your carbon footprint.")
    }

    if (emissions.diet > 100) {
      suggestions.push("Try having one or more meat-free days each week.")
    }

    if (suggestions.length === 0) {
      suggestions.push("Your carbon footprint is relatively low. Keep up the good work!")
    }

    return suggestions
  }

  const suggestions = getSuggestions()

  // Calculate impact level
  const getImpactLevel = () => {
    if (totalEmissions < 100) return { level: "Low", color: "text-green-500" }
    if (totalEmissions < 300) return { level: "Moderate", color: "text-amber-500" }
    return { level: "High", color: "text-red-500" }
  }

  const impact = getImpactLevel()

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Your Carbon Footprint Results
          </CardTitle>
          <CardDescription>Based on your travel, electricity usage, and diet patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Monthly Emissions Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Travel</span>
                  <span className="font-medium">{emissions.travel.toFixed(2)} kg CO₂</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Electricity</span>
                  <span className="font-medium">{emissions.electricity.toFixed(2)} kg CO₂</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Diet</span>
                  <span className="font-medium">{emissions.diet.toFixed(2)} kg CO₂</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">{totalEmissions.toFixed(2)} kg CO₂</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Impact Level</h3>
                <div className={`text-xl font-bold ${impact.color}`}>{impact.level}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {impact.level === "Low"
                    ? "Your carbon footprint is below average. Great job!"
                    : impact.level === "Moderate"
                      ? "Your carbon footprint is around average. There's room for improvement."
                      : "Your carbon footprint is above average. Consider the suggestions below to reduce it."}
                </p>
              </div>
            </div>

            <div>
              <Tabs defaultValue="pie">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                  <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                </TabsList>
                <TabsContent value="pie" className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="bar" className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={barData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: "kg CO₂", angle: -90, position: "insideLeft" }} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="value" name="Emissions (kg CO₂)">
                          {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Suggestions to Reduce Your Carbon Footprint</AlertTitle>
        <AlertDescription>
          <ul className="mt-2 space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <Leaf className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>

      <Alert variant="outline">
        <Info className="h-4 w-4" />
        <AlertTitle>Did you know?</AlertTitle>
        <AlertDescription>
          <p className="mt-2">
            The average person produces about 5 tons of CO₂ per year. Small changes in daily habits can make a
            significant difference in reducing your carbon footprint.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  )
}
