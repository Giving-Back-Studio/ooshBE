const supabase = require('../supabaseClient');

exports.createRequest = async (req, res) => {
  try {
    const { title, details } = req.body;
    const { data, error } = await supabase
      .from('requests')
      .insert({ 
        user_id: req.user.id,
        title,
        details
      })
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('requests')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching request', error: error.message });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, details } = req.body;
    const { data, error } = await supabase
      .from('requests')
      .update({ title, details })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: 'Request not found or you do not have permission to update it' });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error: error.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('requests')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: 'Request not found or you do not have permission to delete it' });
    }

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error: error.message });
  }
};