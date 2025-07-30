"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  uid: string
  email: string | null
  displayName: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking auth state
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    // Simulate Firebase auth
    const mockUser = {
      uid: "mock-uid-" + Date.now(),
      email,
      displayName: email.split("@")[0],
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const signUp = async (email: string, password: string, userData: any) => {
    // Simulate Firebase auth + Supabase user creation
    const mockUser = {
      uid: "mock-uid-" + Date.now(),
      email,
      displayName: userData.name,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))

    // In real app, also save to Supabase users table
    console.log("Saving user data to Supabase:", { ...userData, user_id: mockUser.uid })
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
