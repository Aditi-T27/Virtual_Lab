"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Send, User, Bot } from "lucide-react"

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
        "Hi! I'm your AI mock interviewer. I'll be conducting a technical interview simulation today. Are you ready to begin? Please tell me about yourself and the role you're applying for.",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const interviewQuestions = [
    "Tell me about yourself and why you're interested in this role.",
    "What's your experience with JavaScript and modern frameworks?",
    "How do you handle debugging complex issues in your code?",
    "Describe a challenging project you've worked on recently.",
    "How do you stay updated with new technologies?",
    "What are your career goals for the next 2-3 years?",
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

    // Simulate AI response
    setTimeout(() => {
      let botResponse = ""

      if (!interviewStarted) {
        botResponse = "Great! Let's begin the interview. " + interviewQuestions[0]
        setInterviewStarted(true)
      } else if (currentQuestion < interviewQuestions.length - 1) {
        botResponse = `Thank you for that answer. ${interviewQuestions[currentQuestion + 1]}`
        setCurrentQuestion((prev) => prev + 1)
      } else {
        botResponse =
          "Thank you for completing the mock interview! Based on your responses, I'd rate your performance as 85/100. You demonstrated good technical knowledge and communication skills. Areas for improvement include providing more specific examples and asking clarifying questions."
        setScore(85)
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1500)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real implementation, you would handle speech-to-text here
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
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {interviewQuestions.length}
              </Badge>
              {score && <Badge className="bg-green-100 text-green-800">Score: {score}/100</Badge>}
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>AI Mock Interview</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      <span className="text-sm font-medium">{message.type === "user" ? "You" : "AI Interviewer"}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {!score && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 flex items-center space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your answer here..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleRecording}
                    className={isRecording ? "bg-red-100 text-red-600" : ""}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}

            {score && (
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Interview Complete!</h3>
                <p className="text-green-700">Great job! Review the feedback above and keep practicing.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
