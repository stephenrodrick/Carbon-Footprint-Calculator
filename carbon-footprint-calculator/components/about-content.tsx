import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Database, Code, Info } from "lucide-react"

export function AboutContent() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="hidden md:inline">About</span>
          </TabsTrigger>
          <TabsTrigger value="methodology" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span className="hidden md:inline">Methodology</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden md:inline">Data Sources</span>
          </TabsTrigger>
          <TabsTrigger value="tech" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span className="hidden md:inline">Technology</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">About This Project</h2>
          <p className="text-muted-foreground">
            The Carbon Footprint Calculator is a tool designed to help individuals understand and reduce their
            environmental impact. By providing insights into how daily activities contribute to carbon emissions, we aim
            to empower users to make more sustainable choices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Our mission is to make carbon footprint calculation accessible and actionable for everyone. We believe
                  that understanding your environmental impact is the first step toward reducing it.
                </p>
                <p className="mt-4">
                  By providing personalized insights and practical suggestions, we aim to help users make informed
                  decisions that benefit both the planet and their quality of life.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why It Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Climate change is one of the most pressing challenges of our time. Individual actions, when multiplied
                  across millions of people, can have a significant impact on reducing global carbon emissions.
                </p>
                <p className="mt-4">
                  By making small changes in our daily lives, we can collectively contribute to a more sustainable
                  future while often saving money and improving our health in the process.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="methodology" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Calculation Methodology</h2>
          <p className="text-muted-foreground">
            Our calculator uses established methodologies to estimate carbon emissions from various activities. Here's
            how we calculate each component:
          </p>

          <div className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Travel Emissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Travel emissions are calculated based on the distance traveled and the mode of transportation. We use
                  emission factors from reputable sources such as:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Car: 0.12 kg CO₂ per kilometer (average passenger vehicle)</li>
                  <li>Bus: 0.05 kg CO₂ per kilometer per passenger</li>
                  <li>Train: 0.03 kg CO₂ per kilometer per passenger</li>
                  <li>Airplane: 0.25 kg CO₂ per kilometer per passenger (includes radiative forcing)</li>
                </ul>
                <p className="mt-4">
                  The calculation formula is: Distance (km) × Emission Factor (kg CO₂/km) = Emissions (kg CO₂)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Electricity Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Electricity emissions are calculated based on your monthly consumption in kilowatt-hours (kWh) and the
                  carbon intensity of electricity generation in your region.
                </p>
                <p className="mt-4">
                  The calculation formula is: Electricity Consumption (kWh) × Grid Emission Factor (kg CO₂/kWh) =
                  Emissions (kg CO₂)
                </p>
                <p className="mt-4">
                  Grid emission factors vary by country and region based on the energy mix (coal, natural gas,
                  renewables, etc.). Our calculator uses country-specific emission factors where available.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diet Emissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Diet emissions are estimated based on typical carbon footprints of different dietary patterns. These
                  estimates include emissions from food production, processing, transportation, and waste.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Vegan diet: ~1,100 kg CO₂e per year</li>
                  <li>Vegetarian diet: ~1,700 kg CO₂e per year</li>
                  <li>Pescatarian diet: ~2,300 kg CO₂e per year</li>
                  <li>Mixed diet (moderate meat): ~2,800 kg CO₂e per year</li>
                  <li>High meat diet: ~3,300 kg CO₂e per year</li>
                </ul>
                <p className="mt-4">
                  For mixed diets, we adjust based on the frequency of meat consumption to provide a more personalized
                  estimate.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Data Sources</h2>
          <p className="text-muted-foreground">
            Our calculator relies on data from reputable sources to provide accurate emissions estimates:
          </p>

          <div className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Interface API</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We use the Carbon Interface API to calculate emissions from various activities. This API provides
                  up-to-date emission factors based on scientific research and industry standards.
                </p>
                <p className="mt-4">
                  Carbon Interface sources its data from government agencies, academic research, and industry reports to
                  ensure accuracy and reliability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>OpenWeather API</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  The OpenWeather API provides current weather and air quality data for your location. This information
                  helps contextualize your carbon footprint and provides relevant suggestions based on local conditions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>EPA (Environmental Protection Agency) emission factors</li>
                  <li>IPCC (Intergovernmental Panel on Climate Change) reports</li>
                  <li>IEA (International Energy Agency) electricity grid data</li>
                  <li>Academic research on dietary carbon footprints</li>
                  <li>Transportation industry emissions data</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tech" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Technology Stack</h2>
          <p className="text-muted-foreground">
            This project is built using modern web technologies to provide a responsive, accessible, and user-friendly
            experience:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Next.js - React framework for server-side rendering and static site generation</li>
                  <li>React - JavaScript library for building user interfaces</li>
                  <li>TypeScript - Typed superset of JavaScript for improved developer experience</li>
                  <li>Tailwind CSS - Utility-first CSS framework</li>
                  <li>shadcn/ui - Accessible and customizable component library</li>
                  <li>Recharts - Composable charting library for data visualization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maps & Geolocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Leaflet - Open-source JavaScript library for interactive maps</li>
                  <li>OpenStreetMap - Free and open geographic data</li>
                  <li>Nominatim - Geocoding service for converting addresses to coordinates</li>
                  <li>Browser Geolocation API - For obtaining user location (with permission)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Carbon Interface API - For carbon emissions calculations</li>
                  <li>OpenWeather API - For weather and air quality data</li>
                  <li>Web Share API - For sharing results on mobile devices</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Development & Deployment</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vercel - For hosting and deployment</li>
                  <li>Git - For version control</li>
                  <li>ESLint - For code quality</li>
                  <li>Prettier - For code formatting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-secondary p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold mb-4">Privacy Statement</h3>
        <p className="mb-4">We take your privacy seriously. Here's how we handle your data:</p>
        <ul className="space-y-2">
          <li>• All calculations are performed in your browser</li>
          <li>• We do not store your personal information or calculation results</li>
          <li>• Location data is only used to provide weather information and is not saved</li>
          <li>• We use anonymous analytics to improve the calculator's functionality</li>
        </ul>
      </div>
    </div>
  )
}
