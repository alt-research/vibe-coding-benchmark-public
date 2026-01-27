import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">VibeCodingBench Template</h1>

        {user ? (
          <div>
            <p className="mb-4">Welcome, {user.email}!</p>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <div>
            <p className="mb-4">Please sign in to continue.</p>
            <a
              href="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
            >
              Sign In
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
