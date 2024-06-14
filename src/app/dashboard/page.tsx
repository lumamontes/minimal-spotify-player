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
        {/* aside fixo with spotify player on the bottom left corner  */}
        <aside className="fixed bottom-0 left-0 flex items-center max-w-sm justify-center md:sw-1/4">
          {await SpotifyPlayer()}
        </aside>
        {/* //Audio Visualizer here */}
        <AudioVisualizer accessToken={user.accessToken} />
      </main>
    </>

  );
}
