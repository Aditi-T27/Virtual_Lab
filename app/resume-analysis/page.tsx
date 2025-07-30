"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, FileText, TrendingUp, Users, Lightbulb } from "lucide-react"

const analysisSteps = [
  { id: 1, title: "Uploading File", icon: FileText },
  { id: 2, title: "Parsing Resume", icon: FileText },
  { id: 3, title: "Analyzing with LLM", icon: TrendingUp },
]

export default function ResumeAnalysisPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1
        } else {
          setIsComplete(true)
          clearInterval(timer)
          return prev
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Analyzing Your Resume</CardTitle>
            <CardDescription>Please wait while we process your resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {analysisSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep

              return (
                <div key={step.id} className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? "bg-green-500" : isActive ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : hasError && isActive ? (
                      <XCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`} />
                    )}
                  </div>
                  <span className={`${isActive ? "font-semibold" : ""} ${isCompleted ? "text-green-600" : ""}`}>
                    {step.title}
                  </span>
                  {isActive && !hasError && (
                    <div className="flex-1">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    )
  }

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
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Analysis Results</h1>
          <p className="text-gray-600 mt-2">Here's your comprehensive resume analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scores */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">85/100</div>
                  <Progress value={85} className="mb-4" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Excellent
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ATS Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">78/100</div>
                  <Progress value={78} className="mb-4" />
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Good
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Analysis Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Your resume demonstrates strong technical skills and relevant experience for software development
                  roles. The structure is clear and professional, with good use of action verbs and quantified
                  achievements. However, there are opportunities to improve keyword optimization for ATS systems and
                  enhance the summary section to better highlight your unique value proposition.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Resume Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Skills Identified</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge>JavaScript</Badge>
                      <Badge>React</Badge>
                      <Badge>Node.js</Badge>
                      <Badge>Python</Badge>
                      <Badge>SQL</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Experience</h4>
                    <p className="text-gray-600 mt-2">2+ years in software development</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Education</h4>
                    <p className="text-gray-600 mt-2">Bachelor's in Computer Science</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Projects</h4>
                    <p className="text-gray-600 mt-2">5 relevant projects identified</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Suggestions for Improvement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Add more industry-specific keywords to improve ATS compatibility</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Quantify achievements with specific metrics and numbers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Enhance the professional summary to highlight unique value</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Include relevant certifications and continuous learning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Job Referrals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Frontend Developer - TechCorp</h4>
                    <p className="text-gray-600 text-sm">Match: 92% • Remote • $70k-$90k</p>
                    <p className="text-sm mt-2">Looking for React developers with 2+ years experience</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Full Stack Intern - StartupXYZ</h4>
                    <p className="text-gray-600 text-sm">Match: 88% • Hybrid • $50k-$65k</p>
                    <p className="text-sm mt-2">Perfect for recent graduates with JavaScript skills</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
