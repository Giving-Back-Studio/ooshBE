import supabase from '../supabaseClient.js';
import config from '../config/index.js';

exports.logInteraction = async (req, res) => {
  try {
    const { user_id, interaction_type, content, inferred_goal } = req.body;
    const { data, error } = await supabase
      .from('interactions')
      .insert({ user_id, interaction_type, content, inferred_goal })
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error logging interaction', error: error.message });
  }
};

exports.getUserInteractions = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .eq('user_id', user_id);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interactions', error: error.message });
  }
};
