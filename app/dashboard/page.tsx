import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Dashboard() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials are not set')
    return <div>Error: Supabase credentials are not set. Please check your environment variables.</div>
  }

  const supabase = createServerComponentClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()
    return <div>Hello {user?.email}</div>
  } catch (error) {
    console.error('Error fetching user:', error)
    return <div>Error: Unable to fetch user data</div>
  }
}
