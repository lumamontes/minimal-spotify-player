import { getCurrentTokens } from "@/lib/session"
import Playback from "./playback";

export const SpotifyPlayer = async () => {
    const user = await getCurrentTokens()

    if (!user || !user.accessToken) {
        return <p>Not authenticated</p>;
      }

    return <Playback accessToken={user.accessToken} />
}