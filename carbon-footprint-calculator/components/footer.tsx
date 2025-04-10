import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background py-6 mt-12">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">EcoCalc © {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
