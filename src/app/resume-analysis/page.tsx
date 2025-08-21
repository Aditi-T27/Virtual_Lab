"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, FileText, TrendingUp, Users, Lightbulb, ArrowLeft, Download, Share2, Zap, Target, Award, Brain, Sparkles, ExternalLink, MapPin, DollarSign } from "lucide-react"
import Link from "next/link"

const analysisSteps = [
  { id: 1, title: "Uploading File", description: "Securely uploading your resume", icon: FileText },
  { id: 2, title: "Parsing Content", description: "Extracting text and structure", icon: FileText },
  { id: 3, title: "AI Analysis", description: "Running advanced LLM analysis", icon: Brain },
  { id: 4, title: "Generating Insights", description: "Creating personalized recommendations", icon: Sparkles },
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
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  if (!isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse-slow animate-drift-slow"></div>
          <div className="absolute bottom-1/3 right-1/6 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse-slow animation-delay-1000 animate-drift-reverse"></div>
          <div className="absolute top-2/3 left-1/2 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse-slow animation-delay-500"></div>
        </div>

        <Card className="w-full max-w-lg shadow-2xl border-0 backdrop-blur-sm bg-white/90 animate-fadeInUp">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Analyzing Your Resume</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Our AI is processing your resume to provide comprehensive insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            {analysisSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep

              return (
                <div key={step.id} className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                  isActive ? 'bg-blue-50 border border-blue-200' : isCompleted ? 'bg-green-50' : 'bg-gray-50'
                }`}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCompleted ? "bg-gradient-to-r from-green-500 to-emerald-500 scale-110" 
                      : isActive ? "bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" 
                      : "bg-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : hasError && isActive ? (
                      <XCircle className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive ? "text-white animate-spin" : "text-gray-500"}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold transition-colors duration-300 ${
                      isCompleted ? "text-green-700" : isActive ? "text-blue-700" : "text-gray-700"
                    }`}>
                      {step.title}
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isCompleted ? "text-green-600" : isActive ? "text-blue-600" : "text-gray-500"
                    }`}>
                      {step.description}
                    </div>
                  </div>
                  {isCurrent && !hasError && (
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              )
            })}
            
            <div className="text-center pt-4">
              <div className="text-sm text-gray-500 mb-2">Processing...</div>
              <Progress value={(currentStep / (analysisSteps.length - 1)) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Custom Styles for Loading Animation */}
        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes drift-slow {
            0% { transform: translate(0px, 0px); }
            33% { transform: translate(30px, -20px); }
            66% { transform: translate(-20px, 20px); }
            100% { transform: translate(0px, 0px); }
          }

          @keyframes drift-reverse {
            0% { transform: translate(0px, 0px); }
            33% { transform: translate(-30px, 20px); }
            66% { transform: translate(20px, -20px); }
            100% { transform: translate(0px, 0px); }
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.3; }
          }

          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
          .animate-drift-slow { animation: drift-slow 20s ease-in-out infinite; }
          .animate-drift-reverse { animation: drift-reverse 25s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
          .animation-delay-500 { animation-delay: 0.5s; }
          .animation-delay-1000 { animation-delay: 1s; }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-blue-200 rounded-full opacity-10 animate-pulse-slow animate-drift-slow"></div>
        <div className="absolute bottom-1/3 right-1/5 w-32 h-32 bg-purple-200 rounded-full opacity-10 animate-pulse-slow animation-delay-1000 animate-drift-reverse"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-pink-200 rounded-full opacity-10 animate-pulse-slow animation-delay-500"></div>
      </div>

      {/* Header */}
      <header className="backdrop-blur-sm bg-white/80 shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-blue-50">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
              </Link>
              
              <div className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <span className="text-white font-bold text-lg">IL</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                  Intern Lab
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm border-blue-200 hover:bg-blue-50">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm border-purple-200 hover:bg-purple-50">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-fadeInUp">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Resume Analysis Complete!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here's your comprehensive resume analysis with AI-powered insights and personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scores Section */}
          <div className="lg:col-span-1 space-y-6 animate-fadeInUp animation-delay-300">
            <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Overall Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-4">85/100</div>
                  <Progress value={85} className="mb-4 h-3" />
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Excellent Performance
                  </Badge>
                  <p className="text-sm text-gray-600 mt-3">
                    Your resume demonstrates strong potential for landing interviews
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>ATS Compatibility</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-4">78/100</div>
                  <Progress value={78} className="mb-4 h-3" />
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
                    <Target className="w-4 h-4 mr-1" />
                    Good Match
                  </Badge>
                  <p className="text-sm text-gray-600 mt-3">
                    Likely to pass through Applicant Tracking Systems
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span>Key Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Skills Match</span>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">92%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Experience Level</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Mid-Level</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Readability</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Details Section */}
          <div className="lg:col-span-2 space-y-6 animate-fadeInUp animation-delay-600">
            <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <span>Analysis Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Your resume demonstrates <strong>strong technical skills</strong> and relevant experience for software development
                    roles. The structure is clear and professional, with excellent use of action verbs and quantified
                    achievements. The content shows <strong>great potential</strong> for landing interviews, with some opportunities 
                    to improve keyword optimization for ATS systems and enhance the summary section to better highlight 
                    your unique value proposition.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <span>Resume Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span>Skills Identified</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">JavaScript</Badge>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">React</Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-200">Node.js</Badge>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">Python</Badge>
                        <Badge className="bg-pink-100 text-pink-800 border-pink-200">SQL</Badge>
                        <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Git</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Experience Level</h4>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">2+ years in software development</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">Bachelor's in Computer Science</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Projects</h4>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">5 relevant technical projects identified</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <span>AI-Powered Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: Target,
                      title: "Keyword Optimization",
                      description: "Add more industry-specific keywords like 'microservices', 'agile', and 'CI/CD' to improve ATS compatibility",
                      priority: "High"
                    },
                    {
                      icon: TrendingUp,
                      title: "Quantify Achievements",
                      description: "Include specific metrics: 'Improved performance by 40%' instead of 'Improved performance'",
                      priority: "High"
                    },
                    {
                      icon: FileText,
                      title: "Professional Summary",
                      description: "Enhance your summary to highlight unique value and career objectives more clearly",
                      priority: "Medium"
                    },
                    {
                      icon: Award,
                      title: "Certifications",
                      description: "Consider adding relevant certifications like AWS, React, or other technology-specific credentials",
                      priority: "Medium"
                    }
                  ].map((suggestion, index) => {
                    const Icon = suggestion.icon
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Icon className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-semibold text-gray-900">{suggestion.title}</h5>
                            <Badge className={`text-xs ${
                              suggestion.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {suggestion.priority} Priority
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700">{suggestion.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Users className="w-6 h-6 text-green-600" />
                  <span>Recommended Job Opportunities</span>
                </CardTitle>
                <CardDescription>
                  Based on your skills and experience, here are some matching opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Frontend Developer",
                      company: "TechCorp",
                      match: 92,
                      location: "Remote",
                      salary: "$70k-$90k",
                      description: "Looking for React developers with 2+ years experience in modern frontend frameworks"
                    },
                    {
                      title: "Full Stack Developer",
                      company: "StartupXYZ",
                      match: 88,
                      location: "Hybrid",
                      salary: "$60k-$80k", 
                      description: "Perfect for developers with JavaScript and Node.js experience"
                    },
                    {
                      title: "Software Engineer Intern",
                      company: "BigTech Inc",
                      match: 85,
                      location: "On-site",
                      salary: "$50k-$65k",
                      description: "Great opportunity for recent graduates with strong technical foundation"
                    }
                  ].map((job, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">{job.title}</h4>
                          <p className="text-gray-600 font-medium">{job.company}</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                          {job.match}% Match
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4">{job.description}</p>
                      
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Job Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes drift-slow {
          0% { transform: translate(0px, 0px); }
          33% { transform: translate(30px, -20px); }
          66% { transform: translate(-20px, 20px); }
          100% { transform: translate(0px, 0px); }
        }

        @keyframes drift-reverse {
          0% { transform: translate(0px, 0px); }
          33% { transform: translate(-30px, 20px); }
          66% { transform: translate(20px, -20px); }
          100% { transform: translate(0px, 0px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-drift-slow { animation: drift-slow 20s ease-in-out infinite; }
        .animate-drift-reverse { animation: drift-reverse 25s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 4s ease-in-out infinite;
        }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  )
}


// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { CheckCircle, XCircle, FileText, TrendingUp, Users, Lightbulb } from "lucide-react"

// const analysisSteps = [
//   { id: 1, title: "Uploading File", icon: FileText },
//   { id: 2, title: "Parsing Resume", icon: FileText },
//   { id: 3, title: "Analyzing with LLM", icon: TrendingUp },
// ]

// export default function ResumeAnalysisPage() {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [isComplete, setIsComplete] = useState(false)
//   const [hasError, setHasError] = useState(false)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentStep((prev) => {
//         if (prev < analysisSteps.length - 1) {
//           return prev + 1
//         } else {
//           setIsComplete(true)
//           clearInterval(timer)
//           return prev
//         }
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   if (!isComplete) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <CardTitle>Analyzing Your Resume</CardTitle>
//             <CardDescription>Please wait while we process your resume</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {analysisSteps.map((step, index) => {
//               const Icon = step.icon
//               const isActive = index === currentStep
//               const isCompleted = index < currentStep

//               return (
//                 <div key={step.id} className="flex items-center space-x-3">
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       isCompleted ? "bg-green-500" : isActive ? "bg-blue-500" : "bg-gray-200"
//                     }`}
//                   >
//                     {isCompleted ? (
//                       <CheckCircle className="w-5 h-5 text-white" />
//                     ) : hasError && isActive ? (
//                       <XCircle className="w-5 h-5 text-white" />
//                     ) : (
//                       <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`} />
//                     )}
//                   </div>
//                   <span className={`${isActive ? "font-semibold" : ""} ${isCompleted ? "text-green-600" : ""}`}>
//                     {step.title}
//                   </span>
//                   {isActive && !hasError && (
//                     <div className="flex-1">
//                       <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold">IL</span>
//               </div>
//               <span className="text-lg font-bold">Intern Lab</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Results */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Resume Analysis Results</h1>
//           <p className="text-gray-600 mt-2">Here's your comprehensive resume analysis</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Scores */}
//           <div className="lg:col-span-1 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Overall Score</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-center">
//                   <div className="text-4xl font-bold text-green-600 mb-2">85/100</div>
//                   <Progress value={85} className="mb-4" />
//                   <Badge variant="secondary" className="bg-green-100 text-green-800">
//                     Excellent
//                   </Badge>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>ATS Score</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-center">
//                   <div className="text-4xl font-bold text-blue-600 mb-2">78/100</div>
//                   <Progress value={78} className="mb-4" />
//                   <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//                     Good
//                   </Badge>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Analysis Summary */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <FileText className="w-5 h-5" />
//                   <span>Analysis Summary</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700 leading-relaxed">
//                   Your resume demonstrates strong technical skills and relevant experience for software development
//                   roles. The structure is clear and professional, with good use of action verbs and quantified
//                   achievements. However, there are opportunities to improve keyword optimization for ATS systems and
//                   enhance the summary section to better highlight your unique value proposition.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <TrendingUp className="w-5 h-5" />
//                   <span>Resume Data</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Skills Identified</h4>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       <Badge>JavaScript</Badge>
//                       <Badge>React</Badge>
//                       <Badge>Node.js</Badge>
//                       <Badge>Python</Badge>
//                       <Badge>SQL</Badge>
//                     </div>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Experience</h4>
//                     <p className="text-gray-600 mt-2">2+ years in software development</p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Education</h4>
//                     <p className="text-gray-600 mt-2">Bachelor's in Computer Science</p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Projects</h4>
//                     <p className="text-gray-600 mt-2">5 relevant projects identified</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Lightbulb className="w-5 h-5" />
//                   <span>Suggestions for Improvement</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-3">
//                   <li className="flex items-start space-x-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//                     <span>Add more industry-specific keywords to improve ATS compatibility</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//                     <span>Quantify achievements with specific metrics and numbers</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//                     <span>Enhance the professional summary to highlight unique value</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//                     <span>Include relevant certifications and continuous learning</span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Users className="w-5 h-5" />
//                   <span>Job Referrals</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="border rounded-lg p-4">
//                     <h4 className="font-semibold">Frontend Developer - TechCorp</h4>
//                     <p className="text-gray-600 text-sm">Match: 92% • Remote • $70k-$90k</p>
//                     <p className="text-sm mt-2">Looking for React developers with 2+ years experience</p>
//                   </div>
//                   <div className="border rounded-lg p-4">
//                     <h4 className="font-semibold">Full Stack Intern - StartupXYZ</h4>
//                     <p className="text-gray-600 text-sm">Match: 88% • Hybrid • $50k-$65k</p>
//                     <p className="text-sm mt-2">Perfect for recent graduates with JavaScript skills</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
