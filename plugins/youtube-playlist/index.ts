import type {LoadContext, Plugin} from '@docusaurus/types';

type PluginOptions = {
  playlistId: string;
};

type PlaylistItem = {
  id: string;
  snippet: {
    position: number;
    title: string;
    resourceId: {
      videoId: string;
    };
  };
};

type PlaylistResponse = {
  items?: PlaylistItem[];
  nextPageToken?: string;
  error?: {
    message?: string;
  };
};

export type PlaylistData = {
  playlistId: string;
  items: PlaylistItem[];
};

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

export default function youtubePlaylistPlugin(
  _context: LoadContext,
  options: PluginOptions,
): Plugin<PlaylistData> {
  return {
    name: 'youtube-playlist',

    async loadContent() {
      const apiKey = process.env.YOUTUBE_API_KEY;

      if (!apiKey) {
        console.warn(
          '[youtube-playlist] YOUTUBE_API_KEY is not configured; using the playlist embed fallback.',
        );
        return {playlistId: options.playlistId, items: []};
      }

      try {
        const items: PlaylistItem[] = [];
        let pageToken = '';

        do {
          const params = new URLSearchParams({
            part: 'snippet',
            maxResults: '50',
            playlistId: options.playlistId,
            key: apiKey,
          });

          if (pageToken) {
            params.set('pageToken', pageToken);
          }

          const response = await fetch(`${YOUTUBE_API_URL}?${params}`, {
            signal: AbortSignal.timeout(20_000),
          });
          const data = (await response.json()) as PlaylistResponse;

          if (!response.ok) {
            throw new Error(data.error?.message || 'Unable to load the playlist.');
          }

          items.push(...(data.items ?? []));
          pageToken = data.nextPageToken ?? '';
        } while (pageToken);

        return {
          playlistId: options.playlistId,
          items: items
            .filter((item) => item.snippet.resourceId.videoId)
            .sort((a, b) => a.snippet.position - b.snippet.position),
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(
          `[youtube-playlist] API request failed; using the playlist embed fallback: ${message}`,
        );
        return {playlistId: options.playlistId, items: []};
      }
    },

    contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}
