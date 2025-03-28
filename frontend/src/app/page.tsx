import Link from "next/link"
import FeatureMarquee from "@/components/feature-marquee"
import ImageSlider from "@/components/image-slider"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, CheckCircle, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const features = [
    "Task Management",
    "Team Collaboration",
    "Progress Tracking",
    "File Sharing",
    "Time Tracking",
    "Customizable Workflows",
    "Reporting & Analytics",
    "Mobile App",
    "Integration with Popular Tools",
  ]

  const sliderImages = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark transition-colors duration-300">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 dark:bg-background-dark/80 border-b border-border py-4 px-4 md:px-6 lg:px-8 transition-colors duration-300">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">ProjectPro</div>
          <div className="hidden md:flex space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="py-20 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Manage Projects with Ease
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Streamline your workflow, collaborate effortlessly, and deliver projects on time with our intuitive
              project management tool.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/signup" className="inline-flex items-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <FeatureMarquee features={features} />

        <section className="py-20 px-4 md:px-6 lg:px-8 bg-secondary/10 dark:bg-secondary/20 transition-colors duration-300">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Project Dashboard</h2>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <ImageSlider images={sliderImages} />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-2xl transition-colors duration-300">
                  <CheckCircle className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Create and Assign Tasks</h3>
                  <p className="text-muted-foreground">
                    Easily create tasks, set deadlines, and assign them to team members. Our intuitive interface makes
                    project planning a breeze.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Create and assign tasks illustration"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Collaborate in real-time illustration"
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div>
                <div className="bg-accent/10 dark:bg-accent/20 p-6 rounded-2xl transition-colors duration-300">
                  <Users className="w-16 h-16 text-accent mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Collaborate in Real-Time</h3>
                  <p className="text-muted-foreground">
                    Work together seamlessly with your team. Comment on tasks, share files, and stay updated with
                    real-time notifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-secondary/10 dark:bg-secondary/20 p-6 rounded-2xl transition-colors duration-300">
                  <Clock className="w-16 h-16 text-secondary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Track Progress and Time</h3>
                  <p className="text-muted-foreground">
                    Monitor project progress with visual charts and graphs. Track time spent on tasks to improve
                    productivity and billing.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Track progress illustration"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30 dark:bg-muted/10 transition-colors duration-300"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
              Have questions or need help? Our team is here to assist you.
            </p>
            <Button asChild variant="outline" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="mailto:support@projectpro.com">Contact Support</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 md:px-6 lg:px-8 bg-background dark:bg-background-dark border-t border-border transition-colors duration-300">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-primary mb-4 md:mb-0">ProjectPro</div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">© 2023 ProjectPro. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

