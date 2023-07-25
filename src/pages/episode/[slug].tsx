import { api } from '@/services/axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import format from 'date-fns/format'
import { parseISO } from 'date-fns'
import { ParsedUrlQuery } from 'querystring'
import { convertDurationToTimeString } from '@/utils/convertDurationToTimeString'
import { ptBR } from 'date-fns/locale'

import styles from './episode.module.scss'
import Image from 'next/image'

interface Params extends ParsedUrlQuery {
  slug: string
}

type Episode = {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  durationAsString: string
  description: string
}

type EpisodeProps = {
  episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <button>
          <img src="/arrow-left.svg" alt="Voltar" />
        </button>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          alt="Thumbnail"
          objectFit="cover"
        />
        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.published_at}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    published_at: format(parseISO(data.published_at), 'd MMM y', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    ul: data.file.url,
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
