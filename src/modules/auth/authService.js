const supabase = require('../../supabaseClient');

exports.register = async (userData) => {
  const { data, error } = await supabase.auth.signUp(userData);
  if (error) throw error;
  return data.user;
};

exports.login = async (credentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw error;
  return { user: data.user, token: data.session.access_token };
};

exports.logout = async (userId) => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

exports.getUser = async (userId) => {
  const { data, error } = await supabase.auth.getUser(userId);
  if (error) throw error;
  return data.user;
};
