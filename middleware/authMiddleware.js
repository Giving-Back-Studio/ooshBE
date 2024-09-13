const { createClient } = require('@supabase/supabase-js');
const config = require('../config/' + (process.env.NODE_ENV || 'development'));

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};
