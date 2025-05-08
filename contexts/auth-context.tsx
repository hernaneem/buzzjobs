"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"
import {
  createProfileAfterSignUp,
  getCurrentProfile,
  type Profile,
  type ProfileRole,
} from "@/lib/services/profile-service"

type AuthContextType = {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
    data: { user: User | null; session: Session | null } | null
  }>
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: ProfileRole,
  ) => Promise<{
    error: Error | null
    data: { user: User | null; session: Session | null } | null
  }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Obtener la sesión actual al cargar
    const getSession = async () => {
      setIsLoading(true)
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("Error al obtener la sesión:", error)
      }

      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        const userProfile = await getCurrentProfile()
        setProfile(userProfile)
      }

      setIsLoading(false)
    }

    getSession()

    // Configurar el listener para cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        const userProfile = await getCurrentProfile()
        setProfile(userProfile)
      } else {
        setProfile(null)
      }

      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async (email: string, password: string, fullName: string, role: ProfileRole) => {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    })

    // Si el registro es exitoso, también creamos el perfil del usuario
    if (result.data.user) {
      await createProfileAfterSignUp(result.data.user, fullName, role)
    }

    return result
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    profile,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
