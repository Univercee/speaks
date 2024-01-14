import Image from 'next/image'
import PostsTable from '@/app/ui/posts-table'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <PostsTable></PostsTable>
    </main>
  )
}
