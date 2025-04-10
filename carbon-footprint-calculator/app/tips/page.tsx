import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TipsContent } from "@/components/tips-content"

export default function Tips() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Carbon Reduction Tips</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Practical ways to reduce your carbon footprint and live more sustainably.
        </p>
        <TipsContent />
      </div>
      <Footer />
    </main>
  )
}
