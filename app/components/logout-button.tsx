"use client"

import { useState } from "react"
import { LogOut, Loader2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function LogoutButton({ variant = "ghost", size = "default" }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    setIsLoading(true)
    // Simulate logout process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to home page after logout
      window.location.href = "/"
    }, 1500)
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} disabled={isLoading} className="group">
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <LogOut className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
      )}
      Logout
    </Button>
  )
}
