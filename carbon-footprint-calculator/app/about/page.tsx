import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about-content"

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">About This Project</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Learn about the carbon footprint calculator, its methodology, and the data sources used.
        </p>
        <AboutContent />
      </div>
      <Footer />
    </main>
  )
}
