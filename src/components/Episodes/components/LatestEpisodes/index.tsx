import { EspisodeProps } from '@/pages'
import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.scss'

interface LatestEpisodesProps {
  episode: EspisodeProps
}

export default function LatestEpisodes({ episode }: LatestEpisodesProps) {
  return (
    <li className={styles.container}>
      <Image
        width={190}
        height={190}
        src={episode.thumbnail}
        alt={episode.title}
      />

      <div className={styles.episodeDetails}>
        <Link href={`/episode/${episode.id}`}>{episode.title}</Link>
        <p>{episode.members}</p>
        <span>{episode.published_at}</span>
        <span>{episode.durationAsString}</span>
      </div>

      <button type="button">
        <img src="/play-green.svg" alt={episode.title} />
      </button>
    </li>
  )
}
