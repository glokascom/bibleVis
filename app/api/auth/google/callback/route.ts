import { NextResponse } from 'next/server'

// The client you created from the Server-Side Auth instructions
import { createClient } from '@/app/supabase/server'
import { supabaseService } from '@/app/supabase/service'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'
  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user.id) {
      const { data: currentUser, error: userError } = await supabase
        .from('private_user_view')
        .select('username')
        .eq('id', data.user.id)
        .maybeSingle()

      // если username пустой или null то создаем его
      if (currentUser?.username || userError) {
        return NextResponse.redirect(origin + next)
      }

      let username = (data.user.email || '').split('@')[0]
      username = username.replace(/[^A-Za-z0-9_]/g, '')
      if (username.length < 5) {
        username = username.padStart(5, '0')
      } else if (username.length > 20) {
        username = username.slice(0, 20)
      }

      let dataUser = await supabase
        .from('private_user_view')
        .select('username')
        .eq('username', username)
        .maybeSingle()

      while (dataUser.data) {
        username = username.slice(0, 15) + '_' + Math.random().toString(36).slice(2, 6)

        dataUser = await supabase
          .from('private_user_view')
          .select('username')
          .eq('username', username)
          .maybeSingle()
      }

      await supabaseService.from('users').update({ username }).eq('id', data.user.id)

      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } else {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
