import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://zrjbnrzqtfidfinwgqvy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyamJucnpxdGZpZGZpbndncXZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODMxOTM3NywiZXhwIjoyMDUzODk1Mzc3fQ.YFAIuo-5kt7H1MmGAgaaPKnPdM5rl1fxpwJz2RRhlig '
const supabase = createClient(supabaseUrl, supabaseKey,  {
    auth: {
    persistSession: true, // important
    autoRefreshToken: true // rafraîchit automatiquement le token
  }
})
export default supabase
