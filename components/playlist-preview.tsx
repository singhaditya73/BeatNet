"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Users } from "lucide-react"

export function PlaylistPreview() {
  return (
    <Card className="w-full border-2 border-primary/10 shadow-lg backdrop-blur-sm bg-background/80">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Top Voted Tracks
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" /> Listeners
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {/* Content will be populated from backend */}
        </div>
      </CardContent>
    </Card>
  )
}