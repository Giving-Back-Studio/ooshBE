const supabase = require('../supabaseClient');
const { logger } = require('../logger');

exports.createOpportunity = async (req, res) => {
  try {
    const { title, category, location, start_date, end_date, details } = req.body;
    const { data, error } = await supabase
      .from('opportunities')
      .insert({ 
        user_id: req.user.id,
        title,
        category,
        location,
        start_date,
        end_date,
        details
      })
      .select();

    if (error) throw error;

    logger.info('Opportunity created', { opportunityId: data[0].id, userId: req.user.id });
    res.status(201).json(data[0]);
  } catch (error) {
    logger.error('Error creating opportunity', { error: error.message, userId: req.user.id });
    res.status(500).json({ message: 'Error creating opportunity', error: error.message });
  }
};

exports.getOpportunities = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching opportunities', error: error.message });
  }
};

exports.getOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching opportunity', error: error.message });
  }
};

exports.updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, location, start_date, end_date, details } = req.body;
    const { data, error } = await supabase
      .from('opportunities')
      .update({ title, category, location, start_date, end_date, details })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: 'Opportunity not found or you do not have permission to update it' });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating opportunity', error: error.message });
  }
};

exports.deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: 'Opportunity not found or you do not have permission to delete it' });
    }

    res.status(200).json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting opportunity', error: error.message });
  }
};
