"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Sun } from "lucide-react"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", { username, password })
  }

  return (
    <Card className="w-full max-w-md border-blue-200 shadow-lg">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="bg-yellow-300 p-3 rounded-full mb-2">
          <Sun className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-blue-700">Welcome Back</CardTitle>
        <CardDescription className="text-blue-500">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-blue-700">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit}>
          Sign In
        </Button>
      </CardFooter>
      <div className="px-8 pb-6 text-center">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          Forgot your password?
        </a>
        <div className="mt-4 flex items-center justify-center">
          <div className="text-sm text-gray-500">Don&apos;t have an account?</div>
          <a href="#" className="ml-1 text-sm text-blue-600 hover:text-blue-800">
            Sign up
          </a>
        </div>
      </div>
    </Card>
  )
}
