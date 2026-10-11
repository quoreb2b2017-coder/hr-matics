import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/** Cookie-less anon client. Respects RLS. Safe for ISR routes like sitemap. */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const nextInit = { ...(init ?? {}) } as RequestInit & {
            next?: { revalidate?: number };
          };
          // A no-store fetch opts the whole article page out of caching.
          // LinkedIn then reports the URL as an empty page.
          delete nextInit.cache;
          nextInit.next = { ...nextInit.next, revalidate: 300 };
          return fetch(input, nextInit);
        },
      },
    },
  );
}
