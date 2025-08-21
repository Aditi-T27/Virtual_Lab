// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useAuth } from "@/lib/auth-context"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const { signIn } = useAuth()
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     try {
//       await signIn(email, password)
//       router.push("/dashboard")
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold">IL</span>
//             </div>
//             <span className="text-lg font-bold">Intern Lab</span>
//           </div>
//           <CardTitle className="text-2xl">Welcome Back</CardTitle>
//           <CardDescription>Sign in to your Intern Lab account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//               />
//             </div>

//             {error && <div className="text-red-500 text-sm text-center">{error}</div>}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Signing In..." : "Sign In"}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <Link href="/auth/signup" className="text-blue-600 hover:underline">
//                 Sign up here
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signIn(email, password)
      
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-blue-200 rounded-full opacity-20 animate-pulse-slow animate-drift-slow"></div>
        <div className="absolute bottom-1/3 right-1/5 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse-slow animation-delay-1000 animate-drift-reverse"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-pulse-slow animation-delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-32 left-16 w-5 h-5 bg-pink-300 rounded-full opacity-50 animate-float animation-delay-500"></div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 -z-20 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 backdrop-blur-sm bg-white/90 animate-fadeInUp">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center space-x-2 mb-6 group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
              <span className="text-white font-bold text-lg">IL</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
              Intern Lab
            </span>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Sign in to continue your career journey
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 rounded-lg"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center animate-fadeInUp">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 rounded-lg" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link 
                href="/auth/signup" 
                className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-300 hover:underline"
              >
                Create one here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

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
            transform: translateY(-15px);
          }
        }

        @keyframes drift-slow {
          0% {
            transform: translate(0px, 0px);
          }
          33% {
            transform: translate(20px, -15px);
          }
          66% {
            transform: translate(-15px, 15px);
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
            transform: translate(-20px, 15px);
          }
          66% {
            transform: translate(15px, -15px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
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

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}
