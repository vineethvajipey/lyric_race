import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Song, songs } from "@/lib/song-data"

export default function Home() {
  // songs is already a Record<string, Song>
  const songList: Song[] = Object.values(songs)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-white">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">LyricRace</h1>
        <p className="text-xl text-muted-foreground">Sing fast. Sing true.</p>

        <div className="grid gap-4 mt-8">
          <h2 className="text-2xl font-semibold">Pick Your Track</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {songList.map((song) => (
              <Link
                key={song.id}
                href={`/game?song=${song.id}`}
                className="group relative overflow-hidden rounded-lg border p-2 hover:border-foreground/20 transition-colors"
              >
                <div className="rounded-md aspect-video overflow-hidden flex items-center justify-center bg-muted">
                  <img
                    src={song.coverArt || "/default_cover.jpg"}
                    alt={`${song.title} cover art`}
                    className="object-cover w-full h-full"
                    style={{ aspectRatio: '16/9' }}
                  />
                </div>
                <div className="mt-2">
                  <h3 className="font-medium">{song.title}</h3>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
              </Link>
            ))}
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

