import supabase from '../supabaseClient.js';
import config from '../config/index.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    req.user = data.user;

    const refreshToken = req.cookies?.get('refreshToken');
    if (refreshToken) {
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
      if (refreshError) throw refreshError;
      req.user = refreshData.user;
      res.setHeader('Set-Cookie', `refreshToken=${refreshData.session.refresh_token}; HttpOnly; Secure; SameSite=Strict`);
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token or session expired', error: error.message });
  }
};
