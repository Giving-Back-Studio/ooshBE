module.exports = {
  PORT: process.env.PORT || 3000,
  SUPABASE_URL: process.env.SUPABASE_URL || 'https://dyepbhurpqfkfdnalpxl.supabase.co',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZXBiaHVycHFma2ZkbmFscHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMzcwMDMsImV4cCI6MjA0MTgxMzAwM30.pdhbkwacJvZEJ_E7Z05AP9PTR_oo15_YwILn2W_mqaU',
  SUPABASE_DB_URL: process.env.SUPABASE_DB_URL || 'postgresql://postgres.dyepbhurpqfkfdnalpxl:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres'
};
