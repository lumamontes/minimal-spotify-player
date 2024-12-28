import { AudioVisualizer } from "@/components/audio-visualizer";
import { SpotifyPlayer } from "@/components/spotify-player";
import { getCurrentTokens, getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function Home() {
  const user = await getCurrentTokens()
  if (!user) {
    return notFound()
  }

  return (
    <>
      <main className="relative flex w-full h-full overflow-hidden">
        <div className="fixed inset-0 flex items-center justify-center max-w-2xl mx-auto">
          {await SpotifyPlayer()}
        </div>
        <AudioVisualizer  />
      </main>
    </>

  );
}
