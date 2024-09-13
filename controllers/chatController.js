const { createClient } = require('@supabase/supabase-js');
const config = require('../config/' + (process.env.NODE_ENV || 'development'));

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

exports.getChats = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chats', error: error.message });
  }
};

exports.createChat = async (req, res) => {
  try {
    const { message } = req.body;
    const { data, error } = await supabase
      .from('chats')
      .insert({ user_id: req.user.id, message })
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat', error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { data, error } = await supabase
      .from('messages')
      .insert({ user_id: req.user.id, content: message })
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// Add more chat-related controller functions as needed
