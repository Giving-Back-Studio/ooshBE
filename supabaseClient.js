import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import config from './config/index.js';

dotenv.config();

const supabaseUrl = config.SUPABASE_URL;
const supabaseKey = config.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
