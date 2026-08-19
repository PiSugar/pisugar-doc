import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';

import styles from './styles.module.css';

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

type PlaylistData = {
  playlistId: string;
  items: PlaylistItem[];
};

type Props = {
  playlistId: string;
};

export default function YouTubePlaylist({playlistId}: Props): React.ReactNode {
  const data = usePluginData('youtube-playlist', undefined, {
    failfast: true,
  }) as PlaylistData;

  if (data.playlistId !== playlistId) {
    throw new Error(`No build-time data found for YouTube playlist ${playlistId}.`);
  }

  return (
    <div className={styles.playlist}>
      {data.items.map((item) => (
        <article className={styles.video} key={item.id}>
          <div className={styles.player}>
            <iframe
              src={`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`}
              title={item.snippet.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <h2>{item.snippet.title}</h2>
        </article>
      ))}
    </div>
  );
}
