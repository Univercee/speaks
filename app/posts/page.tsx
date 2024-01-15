import PostsTable from '@/app/ui/posts-table'

export default function Home() {  
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <PostsTable></PostsTable>
    </div>
  )
}
