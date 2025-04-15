"use client"

import dynamic from 'next/dynamic'

// Import the animation component with SSR disabled
const HeroAnimation = dynamic(() => import('./hero-animation').then(mod => ({ 
  default: mod.HeroAnimation 
})), { 
  ssr: false,
  loading: () => (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/20">
      {/* Simple loading state placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-background/90 shadow-lg border border-primary/20 flex items-center justify-center">
          <div className="h-16 w-16 text-primary opacity-50"></div>
        </div>
      </div>
    </div>
  )
})

export { HeroAnimation }