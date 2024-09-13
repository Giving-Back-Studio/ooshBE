const { createClient } = require('@supabase/supabase-js');
const config = require('./config/' + (process.env.NODE_ENV || 'development'));

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

module.exports = supabase;
