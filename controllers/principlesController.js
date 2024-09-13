const { createClient } = require('@supabase/supabase-js');
const config = require('../config/' + (process.env.NODE_ENV || 'development'));

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

exports.getPrinciples = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('principles')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching principles', error: error.message });
  }
};

exports.createPrinciple = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { data, error } = await supabase
      .from('principles')
      .insert({ title, description })
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating principle', error: error.message });
  }
};

// Add more principle-related controller functions as needed
