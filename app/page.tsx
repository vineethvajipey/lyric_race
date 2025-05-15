import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-white">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">LyricRace</h1>
        <p className="text-xl text-muted-foreground">Sing fast. Sing true.</p>

        <div className="grid gap-4 mt-8">
          <h2 className="text-2xl font-semibold">Pick Your Track</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/game?song=rap_god"
              className="group relative overflow-hidden rounded-lg border p-2 hover:border-foreground/20 transition-colors"
            >
              <div className="bg-muted rounded-md aspect-video flex items-center justify-center">
                <span className="text-lg font-medium">Rap God</span>
              </div>
              <div className="mt-2">
                <h3 className="font-medium">Rap God</h3>
              </div>
            </Link>

            <Link
              href="/game?song=birds_of_feather"
              className="group relative overflow-hidden rounded-lg border p-2 hover:border-foreground/20 transition-colors"
            >
              <div className="bg-muted rounded-md aspect-video flex items-center justify-center">
                <span className="text-lg font-medium">Birds of a Feather</span>
              </div>
              <div className="mt-2">
                <h3 className="font-medium">Birds of a Feather</h3>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/practice">
            <Button size="lg" className="gap-2">
              Practice Mode
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          
        </div>
      </div>
    </main>
  )
}
