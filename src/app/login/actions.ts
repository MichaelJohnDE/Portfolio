'use server';

import { logAudit } from '../../lib/logger';
import { createClient } from '../../utils/supabase/server';

export async function logAdminLogin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    await logAudit('AUTH', `Admin successfully logged into the portal: ${user.email}`);
  }
}
