import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calculator } from "@/components/calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Carbon Footprint Calculator</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Understand your environmental impact by calculating your carbon footprint based on travel, electricity usage,
          and diet patterns.
        </p>
        <Calculator />
      </div>
      <Footer />
    </main>
  )
}
