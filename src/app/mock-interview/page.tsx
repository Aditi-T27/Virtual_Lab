"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, Send, User, Bot, Clock, Award, ArrowLeft, MessageCircle, Sparkles, Target, Brain } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function MockInterviewPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Welcome to your AI-powered mock interview! I'm here to help you practice and improve your interview skills. I'll ask you realistic questions and provide personalized feedback. Are you ready to begin? Please introduce yourself and tell me about the role you're preparing for.",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState<number | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [interviewTime, setInterviewTime] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const interviewQuestions = [
    "Tell me about yourself and why you're interested in this role.",
    "What's your experience with your preferred technology stack and frameworks?",
    "How do you approach debugging complex technical issues?",
    "Describe a challenging project you've worked on and how you overcame obstacles.",
    "How do you stay updated with emerging technologies and industry trends?",
    "Where do you see yourself professionally in the next 2-3 years?",
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (interviewStarted && !score) {
      timerRef.current = setInterval(() => {
        setInterviewTime(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [interviewStarted, score])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      let botResponse = ""

      if (!interviewStarted) {
        botResponse = "Excellent! Let's begin the interview. Remember to take your time and provide detailed answers. " + interviewQuestions[0]
        setInterviewStarted(true)
      } else if (currentQuestion < interviewQuestions.length - 1) {
        const encouragement = ["Great answer!", "Well articulated!", "Interesting perspective!", "Good example!"][Math.floor(Math.random() * 4)]
        botResponse = `${encouragement} Let's move to the next question: ${interviewQuestions[currentQuestion + 1]}`
        setCurrentQuestion((prev) => prev + 1)
      } else {
        const finalScore = Math.floor(75 + Math.random() * 20) // Random score between 75-95
        botResponse = `Congratulations on completing your mock interview! 🎉 

**Overall Performance: ${finalScore}/100**

**Strengths:**
• Strong communication skills
• Good technical knowledge demonstration  
• Clear problem-solving approach

**Areas for Improvement:**
• Provide more specific examples with metrics
• Practice the STAR method for behavioral questions
• Consider asking clarifying questions

Keep practicing, and you'll be ready to ace your real interviews!`
        setScore(finalScore)
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 2000 + Math.random() * 1000) // Variable delay for realism
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real implementation, you would handle speech-to-text here
  }

  const progressPercentage = ((currentQuestion + 1) / interviewQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/5 w-48 h-48 bg-blue-200 rounded-full opacity-10 animate-pulse-slow animate-drift-slow"></div>
        <div className="absolute bottom-1/3 right-1/6 w-32 h-32 bg-purple-200 rounded-full opacity-10 animate-pulse-slow animation-delay-1000 animate-drift-reverse"></div>
        <div className="absolute top-2/3 left-1/2 w-24 h-24 bg-pink-200 rounded-full opacity-10 animate-pulse-slow animation-delay-500"></div>
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
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Intern Lab
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {interviewStarted && !score && (
                <Badge variant="outline" className="bg-white/70 backdrop-blur-sm border-blue-200 text-blue-700 flex items-center space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(interviewTime)}</span>
                </Badge>
              )}
              
              <Badge variant="outline" className="bg-white/70 backdrop-blur-sm border-purple-200 text-purple-700 flex items-center space-x-2">
                <MessageCircle className="w-3 h-3" />
                <span>Question {currentQuestion + 1} of {interviewQuestions.length}</span>
              </Badge>
              
              {score && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center space-x-2 px-3 py-1">
                  <Award className="w-3 h-3" />
                  <span>Score: {score}/100</span>
                </Badge>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {interviewStarted && (
            <div className="pb-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-medium text-gray-600">Progress</span>
                <Progress value={progressPercentage} className="flex-1 h-1" />
                <span className="text-xs text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 text-center animate-fadeInUp">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center space-x-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <span>AI Mock Interview</span>
          </h1>
          <p className="text-gray-600 text-lg">Practice with AI and get personalized feedback to ace your interviews</p>
        </div>

        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/90 animate-fadeInUp animation-delay-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xl">Interview Session</span>
              </div>
              {!score && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Target className="w-4 h-4" />
                  <span>Stay confident and detailed</span>
                </div>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages Container */}
            <div className="h-[500px] overflow-y-auto px-6 pb-4 space-y-4 scroll-smooth">
              {messages.map((message, index) => (
                <div 
                  key={message.id} 
                  className={`flex animate-fadeInUp ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                      message.type === "user" 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-4" 
                        : "bg-white border border-gray-200 text-gray-900 mr-4"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`p-1 rounded-full ${
                        message.type === "user" ? "bg-white/20" : "bg-blue-100"
                      }`}>
                        {message.type === "user" ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 text-blue-600" />
                        )}
                      </div>
                      <span className={`text-xs font-medium ${
                        message.type === "user" ? "text-white/90" : "text-gray-600"
                      }`}>
                        {message.type === "user" ? "You" : "AI Interviewer"}
                      </span>
                      <span className={`text-xs ${
                        message.type === "user" ? "text-white/70" : "text-gray-400"
                      }`}>
                        {message.timestamp.toLocaleTimeString('en-US', { 
                          hour12: true, 
                          hour: 'numeric', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className={`text-sm leading-relaxed whitespace-pre-line ${
                      message.type === "user" ? "text-white" : "text-gray-800"
                    }`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fadeInUp">
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg mr-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-1 rounded-full bg-blue-100">
                        <Bot className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">AI Interviewer</span>
                      <span className="text-xs text-gray-400">typing...</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-100 p-6 bg-gray-50/50">
              {!score ? (
                <div className="flex items-center space-x-3">
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Share your thoughts and experiences here..."
                      onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                      className="flex-1 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-white shadow-sm"
                      disabled={isTyping}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleRecording}
                      className={`h-12 w-12 rounded-xl transition-all duration-300 ${
                        isRecording 
                          ? "bg-red-100 text-red-600 border-red-300 shadow-lg animate-pulse" 
                          : "bg-white hover:bg-gray-50 border-gray-300 hover:shadow-lg"
                      }`}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputMessage.trim() || isTyping}
                    className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>Send</span>
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Interview Complete! 🎉</h3>
                    <p className="text-green-700 mb-4">
                      Great job completing your mock interview session! Review the feedback above and keep practicing to improve.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <Link href="/dashboard">
                        <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                          Back to Dashboard
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => window.location.reload()} 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Start New Interview
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips Panel */}
        {!score && (
          <Card className="mt-8 shadow-lg border-0 backdrop-blur-sm bg-white/70 animate-fadeInUp animation-delay-600">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>Interview Tips</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span>Use the STAR method (Situation, Task, Action, Result) for behavioral questions</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>Provide specific examples with quantifiable results when possible</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                  <span>Take your time to think before answering complex questions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
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

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}


// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Mic, MicOff, Send, User, Bot } from "lucide-react"

// interface Message {
//   id: string
//   type: "user" | "bot"
//   content: string
//   timestamp: Date
// }

// export default function MockInterviewPage() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       type: "bot",
//       content:
//         "Hi! I'm your AI mock interviewer. I'll be conducting a technical interview simulation today. Are you ready to begin? Please tell me about yourself and the role you're applying for.",
//       timestamp: new Date(),
//     },
//   ])
//   const [inputMessage, setInputMessage] = useState("")
//   const [isRecording, setIsRecording] = useState(false)
//   const [interviewStarted, setInterviewStarted] = useState(false)
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [score, setScore] = useState<number | null>(null)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const interviewQuestions = [
//     "Tell me about yourself and why you're interested in this role.",
//     "What's your experience with JavaScript and modern frameworks?",
//     "How do you handle debugging complex issues in your code?",
//     "Describe a challenging project you've worked on recently.",
//     "How do you stay updated with new technologies?",
//     "What are your career goals for the next 2-3 years?",
//   ]

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const handleSendMessage = () => {
//     if (!inputMessage.trim()) return

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       type: "user",
//       content: inputMessage,
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInputMessage("")

//     // Simulate AI response
//     setTimeout(() => {
//       let botResponse = ""

//       if (!interviewStarted) {
//         botResponse = "Great! Let's begin the interview. " + interviewQuestions[0]
//         setInterviewStarted(true)
//       } else if (currentQuestion < interviewQuestions.length - 1) {
//         botResponse = `Thank you for that answer. ${interviewQuestions[currentQuestion + 1]}`
//         setCurrentQuestion((prev) => prev + 1)
//       } else {
//         botResponse =
//           "Thank you for completing the mock interview! Based on your responses, I'd rate your performance as 85/100. You demonstrated good technical knowledge and communication skills. Areas for improvement include providing more specific examples and asking clarifying questions."
//         setScore(85)
//       }

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         type: "bot",
//         content: botResponse,
//         timestamp: new Date(),
//       }

//       setMessages((prev) => [...prev, botMessage])
//     }, 1500)
//   }

//   const toggleRecording = () => {
//     setIsRecording(!isRecording)
//     // In a real implementation, you would handle speech-to-text here
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
//             <div className="flex items-center space-x-4">
//               <Badge variant="secondary">
//                 Question {currentQuestion + 1} of {interviewQuestions.length}
//               </Badge>
//               {score && <Badge className="bg-green-100 text-green-800">Score: {score}/100</Badge>}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Chat Interface */}
//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Card className="h-[600px] flex flex-col">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Bot className="w-5 h-5" />
//               <span>AI Mock Interview</span>
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="flex-1 flex flex-col">
//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto space-y-4 mb-4">
//               {messages.map((message) => (
//                 <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
//                   <div
//                     className={`max-w-[80%] rounded-lg p-4 ${
//                       message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-2 mb-2">
//                       {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
//                       <span className="text-sm font-medium">{message.type === "user" ? "You" : "AI Interviewer"}</span>
//                     </div>
//                     <p className="text-sm leading-relaxed">{message.content}</p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Area */}
//             {!score && (
//               <div className="flex items-center space-x-2">
//                 <div className="flex-1 flex items-center space-x-2">
//                   <Input
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     placeholder="Type your answer here..."
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     className="flex-1"
//                   />
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={toggleRecording}
//                     className={isRecording ? "bg-red-100 text-red-600" : ""}
//                   >
//                     {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
//                   </Button>
//                 </div>
//                 <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
//                   <Send className="w-4 h-4" />
//                 </Button>
//               </div>
//             )}

//             {score && (
//               <div className="text-center p-4 bg-green-50 rounded-lg">
//                 <h3 className="text-lg font-semibold text-green-800 mb-2">Interview Complete!</h3>
//                 <p className="text-green-700">Great job! Review the feedback above and keep practicing.</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   )
// }
