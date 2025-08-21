
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
import { Upload, User, Brain, FileText, Target, Sparkles, ChevronRight } from "lucide-react"
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
    console.log(user);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-lg font-medium text-gray-700 animate-pulse">Loading your dashboard...</div>
        </div>
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

    const formData = new FormData()
    formData.append("resume", resumeFile)

    try {
      const res = await fetch("/api/users/parser", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Resume analysis failed")
      }

      console.log("Parsed Resume Text:", data.resumeText)
      console.log("Vector Embedding:", data.vector)

      setTimeout(() => {
        router.push("/resume-analysis")
      }, 3000)
    } catch (err) {
      console.error("Error analyzing resume:", err)
      alert("Something went wrong while analyzing your resume.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const canAnalyze = resumeFile && selectedDomains.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-200 rounded-full opacity-10 animate-pulse-slow animate-drift-slow"></div>
        <div className="absolute bottom-1/4 right-1/5 w-48 h-48 bg-purple-200 rounded-full opacity-10 animate-pulse-slow animation-delay-1000 animate-drift-reverse"></div>
        <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-pink-200 rounded-full opacity-10 animate-pulse-slow animation-delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-float"></div>
      <div className="absolute top-1/3 left-10 w-4 h-4 bg-purple-400 rounded-full opacity-40 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-pink-300 rounded-full opacity-30 animate-float animation-delay-500"></div>

      {/* Header */}
      <header className="backdrop-blur-sm bg-white/80 shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <span className="text-white font-bold text-lg">IL</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                Intern Lab
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/mock-interview">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:border-blue-300 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span>Mock Interview</span>
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setShowProfileModal(true)}
                className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <User className="w-4 h-4 text-purple-600" />
                <span>Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeInUp">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fadeInUp">
            Welcome back! 
            <span className="inline-block ml-3 animate-wave">👋</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeInUp animation-delay-300">
            Ready to analyze your resume and boost your career? Let's get started on your journey to success.
          </p>
          <div className="flex items-center justify-center mt-6 space-x-8 animate-fadeInUp animation-delay-600">
            <div className="flex items-center space-x-2 text-gray-600">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Target className="w-5 h-5 text-green-500" />
              <span className="font-medium">Targeted Feedback</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp animation-delay-600">
          {/* Resume Upload Card */}
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <span>Upload Resume</span>
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Upload your resume in PDF or DOCX format for comprehensive AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                <div className="relative">
                  <Label 
                    htmlFor="resume" 
                    className="text-sm font-semibold text-gray-700 mb-2 block"
                  >
                    Choose File
                  </Label>
                  <div className="relative group">
                    <Input 
                      id="resume" 
                      type="file" 
                      accept=".pdf,.docx" 
                      onChange={handleFileUpload} 
                      className="h-12 border-2 border-dashed border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-all duration-300 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {!resumeFile && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <FileText className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                      </div>
                    )}
                  </div>
                  {resumeFile && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeInUp">
                      <div className="flex items-center space-x-3">
                        <div className="p-1 bg-green-100 rounded-full">
                          <FileText className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-800">File uploaded successfully!</p>
                          <p className="text-xs text-green-600">{resumeFile.name}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Domain Selection Card */}
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <span>Select Domains</span>
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Choose the areas you're interested in for targeted analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4">
                {domains.map((domain, index) => (
                  <div 
                    key={domain} 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group/item animate-fadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Checkbox
                      id={domain}
                      checked={selectedDomains.includes(domain)}
                      onCheckedChange={(checked: boolean | 'indeterminate') => 
                        handleDomainChange(domain, checked as boolean)
                      }
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label 
                      htmlFor={domain} 
                      className="text-sm font-medium cursor-pointer group-hover/item:text-blue-600 transition-colors duration-300"
                    >
                      {domain}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedDomains.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg animate-fadeInUp">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">{selectedDomains.length}</span> domain{selectedDomains.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analyze Button Section */}
        <div className="mt-12 text-center animate-fadeInUp animation-delay-900">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-md mx-auto">
            <Button
              onClick={handleAnalyzeResume}
              disabled={!canAnalyze || isAnalyzing}
              size="lg"
              className={`px-12 py-4 text-lg font-semibold rounded-xl transform transition-all duration-300 ${
                canAnalyze && !isAnalyzing
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl shadow-lg"
                  : "bg-gray-300"
              }`}
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing Resume...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Resume</span>
                </div>
              )}
            </Button>
            {!canAnalyze && !isAnalyzing && (
              <p className="text-sm text-gray-500 mt-4 animate-pulse">
                Please upload a resume and select at least one domain to continue
              </p>
            )}
            {isAnalyzing && (
              <p className="text-sm text-blue-600 mt-4 animate-pulse">
                Our AI is analyzing your resume. This may take a few moments...
              </p>
            )}
          </div>
        </div>
      </main>

      {/* User Profile Modal */}
      <UserProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />

      {/* Floating Chatbot */}
      <Chatbot />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes drift-slow {
          0% {
            transform: translate(0px, 0px);
          }
          33% {
            transform: translate(30px, -20px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }

        @keyframes drift-reverse {
          0% {
            transform: translate(0px, 0px);
          }
          33% {
            transform: translate(-30px, 20px);
          }
          66% {
            transform: translate(20px, -20px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-drift-slow {
          animation: drift-slow 20s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useAuth } from "@/lib/auth-context"
// import { UserProfileModal } from "@/components/user-profile-modal"
// import { Chatbot } from "@/components/chatbot"
// import { Upload, User, Brain } from "lucide-react"
// import Link from "next/link"

// const domains = [
//   "Frontend",
//   "Backend",
//   "Data Science",
//   "DevOps",
//   "UI/UX",
//   "Cybersecurity",
//   "Blockchain",
//   "AI/ML",
//   "Product Management",
//   "QA",
//   "Business Analysis",
// ]

// export default function Dashboard() {
//   const { user, loading } = useAuth()
//   const router = useRouter()
//   const [selectedDomains, setSelectedDomains] = useState<string[]>([])
//   const [resumeFile, setResumeFile] = useState<File | null>(null)
//   const [showProfileModal, setShowProfileModal] = useState(false)
//   const [isAnalyzing, setIsAnalyzing] = useState(false)

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth/login")
//     }
//   }, [user, loading, router])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (!user) return null

//   const handleDomainChange = (domain: string, checked: boolean) => {
//     if (checked) {
//       setSelectedDomains([...selectedDomains, domain])
//     } else {
//       setSelectedDomains(selectedDomains.filter((d) => d !== domain))
//     }
//   }

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (
//       file &&
//       (file.type === "application/pdf" ||
//         file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
//     ) {
//       setResumeFile(file)
//     } else {
//       alert("Please upload a PDF or DOCX file")
//     }
//   }

//   const handleAnalyzeResume = async () => {
//     if (!resumeFile || selectedDomains.length === 0) return

//     setIsAnalyzing(true)
//     // Simulate analysis process
//     // async function fetchMessage() {
//     //   try {
//     //     const res = await fetch("/api/users/parser")
//     //     const data = await res.json()
//     //     console.log(data.message)
//     //   } catch (err) {
//     //     console.error("Failed to fetch:", err)
//     //   }
//     // }

//     // fetchMessage()
//     // setTimeout(() => {
//     //   router.push("/resume-analysis")
//     // }, 3000)

//     const formData = new FormData()
//   formData.append("resume", resumeFile)

//   try {
//     const res = await fetch("/api/users/parser", {
//       method: "POST",
//       body: formData,
//     })

//     const data = await res.json()

//     if (!res.ok) {
//       throw new Error(data.error || "Resume analysis failed")
//     }

//     console.log("Parsed Resume Text:", data.resumeText)
//     console.log("Vector Embedding:", data.vector)

//     // Navigate after success
//     setTimeout(() => {
//       router.push("/resume-analysis")
//     }, 3000)
//   } catch (err) {
//     console.error("Error analyzing resume:", err)
//     alert("Something went wrong while analyzing your resume.")
//   } finally {
//     setIsAnalyzing(false)
//   }
//   }

//   const canAnalyze = resumeFile && selectedDomains.length > 0

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

//             <div className="flex items-center space-x-4">
//               <Link href="/mock-interview">
//                 <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
//                   <Brain className="w-4 h-4" />
//                   <span>Mock Interview</span>
//                 </Button>
//               </Link>
//               <Button
//                 variant="outline"
//                 onClick={() => setShowProfileModal(true)}
//                 className="flex items-center space-x-2"
//               >
//                 <User className="w-4 h-4" />
//                 <span>Profile</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           {/* <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.displayName || user.email}! 👋</h1> */}
//           <h1 className="text-3xl font-bold text-gray-900">Welcome back,! 👋</h1>
//           <p className="text-gray-600 mt-2">Ready to analyze your resume and boost your career?</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Resume Upload */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <Upload className="w-5 h-5" />
//                 <span>Upload Resume</span>
//               </CardTitle>
//               <CardDescription>Upload your resume in PDF or DOCX format for AI analysis</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="resume">Choose File</Label>
//                   <Input id="resume" type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="mt-1" />
//                   {resumeFile && <p className="text-sm text-green-600 mt-2">✓ {resumeFile.name} uploaded</p>}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Domain Selection */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Select Interested Domains</CardTitle>
//               <CardDescription>Choose the areas you're interested in for targeted analysis</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-3">
//                 {domains.map((domain) => (
//                   <div key={domain} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={domain}
//                       checked={selectedDomains.includes(domain)}
//                       onCheckedChange={(checked: boolean | 'indeterminate') => handleDomainChange(domain, checked as boolean)}
//                     />
//                     <Label htmlFor={domain} className="text-sm">
//                       {domain}
//                     </Label>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Analyze Button */}
//         <div className="mt-8 text-center">
//           <Button
//             onClick={handleAnalyzeResume}
//             disabled={!canAnalyze || isAnalyzing}
//             size="lg"
//             className="px-8 py-4 text-lg"
//           >
//             {isAnalyzing ? "Analyzing Resume..." : "Analyze Resume"}
//           </Button>
//           {!canAnalyze && (
//             <p className="text-sm text-gray-500 mt-2">Please upload a resume and select at least one domain</p>
//           )}
//         </div>
//       </main>

//       {/* User Profile Modal */}
//       <UserProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />

//       {/* Floating Chatbot */}
//       <Chatbot />
//     </div>
//   )
// }

