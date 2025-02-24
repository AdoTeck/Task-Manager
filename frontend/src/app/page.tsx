import Link from "next/link"
import FeatureMarquee from "../components/FeatureMarquee"
import ImageSlider from "../components/ImageSlider"
import { ArrowRight, CheckCircle, Clock, Users } from "lucide-react"

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
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-6 px-4 md:px-6 lg:px-8">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">ProjectPro</div>
          <div className="space-x-4">
            <Link href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <div className="space-x-4">
            <Link href="/login" className="text-sm hover:text-primary transition-colors">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="py-20 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Manage Projects with Ease</h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Streamline your workflow, collaborate effortlessly, and deliver projects on time with our intuitive
              project management tool.
            </p>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        <FeatureMarquee features={features} />

        <section className="py-20 px-4 md:px-6 lg:px-8 bg-secondary">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Project Dashboard</h2>
            <ImageSlider images={sliderImages} />
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

            <div className="flex flex-col md:flex-row items-center mb-20">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <CheckCircle className="w-48 h-48 text-primary mx-auto" />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Create and Assign Tasks</h3>
                <p className="text-muted-foreground">
                  Easily create tasks, set deadlines, and assign them to team members. Our intuitive interface makes
                  project planning a breeze.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center mb-20">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
                <Users className="w-48 h-48 text-primary mx-auto" />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Collaborate in Real-Time</h3>
                <p className="text-muted-foreground">
                  Work together seamlessly with your team. Comment on tasks, share files, and stay updated with
                  real-time notifications.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <Clock className="w-48 h-48 text-primary mx-auto" />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Track Progress and Time</h3>
                <p className="text-muted-foreground">
                  Monitor project progress with visual charts and graphs. Track time spent on tasks to improve
                  productivity and billing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4 md:px-6 lg:px-8 bg-muted">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
              Have questions or need help? Our team is here to assist you.
            </p>
            <Link
              href="mailto:support@projectpro.com"
              className="bg-accent text-accent-foreground px-6 py-3 rounded-md text-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 md:px-6 lg:px-8 bg-background border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 ProjectPro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

