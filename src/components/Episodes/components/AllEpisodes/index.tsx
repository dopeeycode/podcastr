import { EspisodeProps } from '@/pages'
import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.scss'

interface AllEpisodesProps {
  episode: EspisodeProps
}

export default function AllEpisodes({ episode }: AllEpisodesProps) {
  return (
    <tr className={styles.container}>
      <td>
        <Image
          width={120}
          height={120}
          src={episode.thumbnail}
          alt={episode.title}
        />
      </td>
      <td>
        <Link href={`/episode/${episode.id}`}>{episode.title}</Link>
      </td>
      <td>{episode.members}</td>
      <td style={{ width: 100 }}>{episode.published_at}</td>
      <td>{episode.durationAsString}</td>
      <td>
        <button type="button">
          <img src="/play-green.svg" alt="Tocar episódio" />
        </button>
      </td>
    </tr>
  )
}
