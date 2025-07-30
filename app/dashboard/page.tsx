"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { UserProfileModal } from "@/components/user-profile-modal"
import { Chatbot } from "@/components/chatbot"
import { Upload, User, Brain } from "lucide-react"
import Link from "next/link"

const domains = [
  "Frontend",
  "Backend",
  "Data Science",
  "DevOps",
  "UI/UX",
  "Cybersecurity",
  "Blockchain",
  "AI/ML",
  "Product Management",
  "QA",
  "Business Analysis",
]

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) return null

  const handleDomainChange = (domain: string, checked: boolean) => {
    if (checked) {
      setSelectedDomains([...selectedDomains, domain])
    } else {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setResumeFile(file)
    } else {
      alert("Please upload a PDF or DOCX file")
    }
  }

  const handleAnalyzeResume = async () => {
    if (!resumeFile || selectedDomains.length === 0) return

    setIsAnalyzing(true)
    // Simulate analysis process
    setTimeout(() => {
      router.push("/resume-analysis")
    }, 3000)
  }

  const canAnalyze = resumeFile && selectedDomains.length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">IL</span>
              </div>
              <span className="text-lg font-bold">Intern Lab</span>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/mock-interview">
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Brain className="w-4 h-4" />
                  <span>Mock Interview</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setShowProfileModal(true)}
                className="flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.displayName || user.email}! 👋</h1>
          <p className="text-gray-600 mt-2">Ready to analyze your resume and boost your career?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Resume</span>
              </CardTitle>
              <CardDescription>Upload your resume in PDF or DOCX format for AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resume">Choose File</Label>
                  <Input id="resume" type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="mt-1" />
                  {resumeFile && <p className="text-sm text-green-600 mt-2">✓ {resumeFile.name} uploaded</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Domain Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Interested Domains</CardTitle>
              <CardDescription>Choose the areas you're interested in for targeted analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {domains.map((domain) => (
                  <div key={domain} className="flex items-center space-x-2">
                    <Checkbox
                      id={domain}
                      checked={selectedDomains.includes(domain)}
                      onCheckedChange={(checked) => handleDomainChange(domain, checked as boolean)}
                    />
                    <Label htmlFor={domain} className="text-sm">
                      {domain}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analyze Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleAnalyzeResume}
            disabled={!canAnalyze || isAnalyzing}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            {isAnalyzing ? "Analyzing Resume..." : "Analyze Resume"}
          </Button>
          {!canAnalyze && (
            <p className="text-sm text-gray-500 mt-2">Please upload a resume and select at least one domain</p>
          )}
        </div>
      </main>

      {/* User Profile Modal */}
      <UserProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  )
}
