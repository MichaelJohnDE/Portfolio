import { NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server';
import { cookies } from 'next/headers';
import { logAudit } from '../../../../lib/logger';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const supabase = await createClient();
    
    // First, verify we have a logged in user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the password by attempting to sign in
    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: password,
    });

    if (error) {
      await logAudit('AUTH', `Failed Sudo Mode login attempt for user: ${user.email}`);
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    // Password is correct. Set the sudo cookie.
    await logAudit('AUTH', `Successful Sudo Mode unlock for user: ${user.email}`);
    // By omitting maxAge/expires, it becomes a session cookie (destroyed on browser close)
    const cookieStore = await cookies();
    cookieStore.set('sudo_session', 'verified', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Sudo verification error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
