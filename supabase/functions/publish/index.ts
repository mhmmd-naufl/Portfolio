// Supabase Edge Function: publish relay.
// Browser cannot POST to api.cloudflare.com (CORS), so the panel calls HERE
// (same Supabase origin) and this function POSTs to the Deploy Hook server-side.
//
// Deploy (no CLI needed):
//   1. Dashboard → Edge Functions → Create function, name: publish → paste this file → Deploy.
//   2. Same page → Secrets → add DEPLOY_HOOK = <Cloudflare build hook URL>.
//   3. Done. Panel Publish button calls /functions/v1/publish with the user JWT.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  const jwt = (req.headers.get('Authorization') ?? '').replace('Bearer ', '');
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: `Bearer ${jwt}` } },
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: 'unauthorized' }, { status: 401, headers: cors });
  }

  const hook = Deno.env.get('DEPLOY_HOOK') ?? '';
  if (!hook) {
    return Response.json({ error: 'DEPLOY_HOOK secret missing' }, { status: 500, headers: cors });
  }
  const r = await fetch(hook, { method: 'POST' });
  return Response.json({ ok: r.ok }, { headers: cors });
});
