import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Lightbulb, Utensils, Recycle, Home, Plane } from "lucide-react"

export function TipsContent() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="travel">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="travel" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            <span className="hidden md:inline">Travel</span>
          </TabsTrigger>
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Home</span>
          </TabsTrigger>
          <TabsTrigger value="food" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden md:inline">Food</span>
          </TabsTrigger>
          <TabsTrigger value="energy" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden md:inline">Energy</span>
          </TabsTrigger>
          <TabsTrigger value="lifestyle" className="flex items-center gap-2">
            <Recycle className="h-4 w-4" />
            <span className="hidden md:inline">Lifestyle</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="travel" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Travel & Transportation Tips</h2>
          <p className="text-muted-foreground">
            Transportation is one of the largest sources of carbon emissions. Here's how you can reduce your impact:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Choose Sustainable Transportation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Walk, bike, or use public transportation whenever possible</li>
                  <li>• Carpool with friends, family, or coworkers</li>
                  <li>• Consider an electric or hybrid vehicle for your next car</li>
                  <li>• Combine errands to reduce the number of trips</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" />
                  Air Travel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Fly less frequently and stay longer at destinations</li>
                  <li>• Choose direct flights to reduce emissions</li>
                  <li>• Consider train travel for shorter distances</li>
                  <li>• Offset your flight emissions through verified carbon offset programs</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Driving Efficiency</CardTitle>
              <CardDescription>If you must drive, do it efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• Keep your tires properly inflated to improve fuel efficiency</li>
                <li>• Remove excess weight from your vehicle</li>
                <li>• Avoid excessive idling and aggressive driving</li>
                <li>• Maintain your vehicle with regular tune-ups</li>
                <li>• Use cruise control on highways to maintain a constant speed</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="home" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Home & Living Tips</h2>
          <p className="text-muted-foreground">
            Your home is a significant source of energy consumption. Here's how to make it more efficient:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Insulation & Heating</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Improve insulation in walls, attic, and floors</li>
                  <li>• Seal drafts around doors and windows</li>
                  <li>• Use a programmable thermostat to reduce heating when away</li>
                  <li>• Lower your thermostat by 1-2 degrees in winter</li>
                  <li>• Use ceiling fans to reduce air conditioning needs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Conservation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Install low-flow showerheads and faucets</li>
                  <li>• Fix leaky faucets and toilets promptly</li>
                  <li>• Take shorter showers</li>
                  <li>• Collect rainwater for garden use</li>
                  <li>• Only run full loads in dishwashers and washing machines</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="food" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Food & Diet Tips</h2>
          <p className="text-muted-foreground">Your food choices have a significant impact on your carbon footprint:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  Sustainable Diet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Reduce meat consumption, especially beef and lamb</li>
                  <li>• Incorporate more plant-based meals into your diet</li>
                  <li>• Choose locally grown, seasonal produce</li>
                  <li>• Buy organic when possible to reduce pesticide use</li>
                  <li>• Try "Meatless Mondays" as a starting point</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reduce Food Waste</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Plan meals and make shopping lists to avoid overbuying</li>
                  <li>• Store food properly to extend its life</li>
                  <li>• Use leftovers creatively in new meals</li>
                  <li>• Compost food scraps instead of sending to landfill</li>
                  <li>• Understand food date labels to avoid unnecessary waste</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="energy" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Energy Saving Tips</h2>
          <p className="text-muted-foreground">
            Reducing energy consumption is one of the most effective ways to lower your carbon footprint:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Lighting & Appliances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Switch to LED light bulbs throughout your home</li>
                  <li>• Turn off lights when not in use</li>
                  <li>• Unplug electronics or use power strips to eliminate phantom energy use</li>
                  <li>• Choose ENERGY STAR certified appliances</li>
                  <li>• Wash clothes in cold water and air dry when possible</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Renewable Energy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Switch to a renewable energy provider if available</li>
                  <li>• Consider installing solar panels on your home</li>
                  <li>• Look into community solar programs in your area</li>
                  <li>• Use solar-powered outdoor lighting</li>
                  <li>• Support policies that promote renewable energy</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lifestyle" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Sustainable Lifestyle Tips</h2>
          <p className="text-muted-foreground">
            Small changes in your daily habits can add up to significant carbon reductions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-primary" />
                  Reduce, Reuse, Recycle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Reduce consumption by buying only what you need</li>
                  <li>• Choose products with minimal packaging</li>
                  <li>• Reuse items instead of buying disposable alternatives</li>
                  <li>• Recycle properly according to local guidelines</li>
                  <li>• Compost food scraps and yard waste</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conscious Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Buy high-quality items that last longer</li>
                  <li>• Support companies with sustainable practices</li>
                  <li>• Choose second-hand or refurbished items when possible</li>
                  <li>• Repair items instead of replacing them</li>
                  <li>• Borrow or rent items you use infrequently</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-secondary p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold mb-4">Carbon Offsetting</h3>
        <p className="mb-4">
          While reducing your carbon footprint is the most effective approach, carbon offsetting can help mitigate the
          emissions you can't eliminate:
        </p>
        <ul className="space-y-2">
          <li>• Invest in verified carbon offset projects like reforestation or renewable energy</li>
          <li>• Look for certification standards like Gold Standard or Verified Carbon Standard</li>
          <li>• Support local environmental initiatives in your community</li>
          <li>• Consider offsetting specific activities like flights or events</li>
        </ul>
      </div>
    </div>
  )
}
