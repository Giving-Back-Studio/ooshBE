import supabase from '../supabaseClient.js';
import config from '../config/index.js';

exports.createUser = async (req, res) => {
  try {
    const { username, goal, preferences } = req.body;
    const { data, error } = await supabase
      .from('users')
      .insert({ username, goal, preferences })
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username, goal, preferences } = req.body;
    const { data, error } = await supabase
      .from('users')
      .update({ username, goal, preferences })
      .eq('id', user_id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};
