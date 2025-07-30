import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">IL</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Intern Lab</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Intern Lab
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Your AI-powered platform for resume analysis, mock interviews, and career guidance. Get ready to land your
            dream internship!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/login">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-6 text-center">
        <p className="text-gray-500">Powered by Abhyudaya Softech</p>
      </footer>
    </div>
  )
}
