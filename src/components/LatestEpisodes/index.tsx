import { EspisodeProps } from '@/pages'
import Image from 'next/image'

import styles from './styles.module.scss'

interface LatestEpisodesProps {
  episode: EspisodeProps
}

export default function LatestEpisodes({ episode }: LatestEpisodesProps) {
  return (
    <div className={styles.latestEpisodes}>
      <li>
        <Image
          width={190}
          height={190}
          src={episode.thumbnail}
          alt={episode.title}
        />

        <div className={styles.episodeDetails}>
          <a href="#">{episode.title}</a>
          <p>{episode.members}</p>
          <span>{episode.published_at}</span>
          <span>{episode.durationAsString}</span>
        </div>

        <button type="button">
          <img src="/play-green.svg" alt={episode.title} />
        </button>
      </li>
    </div>
  )
}
