import { api } from '@/services/axios'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'

import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import { GetStaticProps } from 'next'

import styles from './styles.module.scss'
import LatestEpisodes from '@/components/Episodes/components/LatestEpisodes'
import AllEpisodes from '@/components/Episodes/components/AllEpisodes'
import Episodes from '@/components/Episodes'

export interface EspisodeProps {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  durationAsString: string
  description: string
  file: {
    duration: number
    url: string
  }
}

export interface HomeProps {
  allEpisodes: EspisodeProps[]
  latestEpisodes: EspisodeProps[]
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homePage}>
      <Episodes allEpisodes={allEpisodes} latestEpisodes={latestEpisodes} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = data.map((episode: EspisodeProps) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      published_at: format(parseISO(episode.published_at), 'd MMM y', {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration),
      ),
      description: episode.description,
      ul: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.lenght)

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
