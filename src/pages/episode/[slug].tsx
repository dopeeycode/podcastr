import { useRouter } from 'next/router'

export default function Episode() {
  const slug = useRouter()
  return <div>{slug.query.slug}</div>
}
