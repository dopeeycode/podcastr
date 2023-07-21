import { EspisodeProps } from '@/pages'
import LatestEpisodes from './components/LatestEpisodes'

import styles from './styles.module.scss'
import AllEpisodes from './components/AllEpisodes'

interface EpisodesIndexProps {
  allEpisodes: EspisodeProps[]
  latestEpisodes: EspisodeProps[]
}

export default function Episodes({
  allEpisodes,
  latestEpisodes,
}: EpisodesIndexProps) {
  return (
    <>
      <section className={styles.lastestEpisodes}>
        <h2>Últimos episódios</h2>
        <ul>
          {latestEpisodes.map((episode) => (
            <LatestEpisodes key={episode.id} episode={episode} />
          ))}
        </ul>
      </section>
      <section className={styles.all_episodes}>
        <h2>Todos episódios</h2>
        <table cellPadding={0}>
          <thead>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
            <tbody>
              {allEpisodes.map((episode) => (
                <AllEpisodes key={episode.id} episode={episode} />
              ))}
            </tbody>
          </thead>
        </table>
      </section>
    </>
  )
}
