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
        throw new Error(
          '[youtube-playlist] YOUTUBE_API_KEY is required to expand the playlist during the build.',
        );
      }

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
          throw new Error(
            `[youtube-playlist] ${data.error?.message || 'Unable to load the playlist.'}`,
          );
        }

        items.push(...(data.items ?? []));
        pageToken = data.nextPageToken ?? '';
      } while (pageToken);

      const expandedItems = items
        .filter((item) => item.snippet.resourceId.videoId)
        .sort((a, b) => a.snippet.position - b.snippet.position);

      if (expandedItems.length === 0) {
        throw new Error(
          `[youtube-playlist] Playlist ${options.playlistId} did not return any videos.`,
        );
      }

      return {
        playlistId: options.playlistId,
        items: expandedItems,
      };
    },

    contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}
