import supabase from '../supabaseClient.js';
import config from '../config/index.js';

const { logger } = require('../logger');
const { uploadImage } = require('../utils/imageUpload');

exports.createFarmEnterprise = async (req, res, next) => {
  try {
    const { name, website_url, instagram_url, facebook_url, twitter_url } = req.body;
    const { photo } = req.files || {};

    let photo_library = [];
    if (photo) {
      const photoUrl = await uploadImage(photo, `farm-enterprises/${req.user.id}/${photo.name}`);
      photo_library.push(photoUrl);
    }

    const { data, error } = await supabase
      .from('farm_enterprises')
      .insert({ 
        user_id: req.user.id,
        name,
        website_url,
        instagram_url,
        facebook_url,
        twitter_url,
        photo_library
      })
      .select();

    if (error) throw error;

    logger.info('Farm enterprise created', { farmEnterpriseId: data[0].id, userId: req.user.id });
    res.status(201).json(data[0]);
  } catch (error) {
    logger.error('Error creating farm enterprise', { error: error.message, userId: req.user.id });
    next(error);
  }
};

exports.getFarmEnterprises = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('farm_enterprises')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    logger.error('Error fetching farm enterprises', { error: error.message });
    next(error);
  }
};

exports.getFarmEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('farm_enterprises')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ message: 'Farm enterprise not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching farm enterprise', error: error.message });
  }
};

exports.updateFarmEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, website_url, instagram_url, facebook_url, twitter_url } = req.body;
    const { photo } = req.files || {};

    let updateData = { name, website_url, instagram_url, facebook_url, twitter_url };

    if (photo) {
      const photoUrl = await uploadImage(photo, `farm-enterprises/${req.user.id}/${photo.name}`);
      updateData.photo_library = supabase.raw(`array_append(photo_library, '${photoUrl}')`);
    }

    const { data, error } = await supabase
      .from('farm_enterprises')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: 'Farm enterprise not found or you do not have permission to update it' });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating farm enterprise', error: error.message });
  }
};

exports.deleteFarmEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('farm_enterprises')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: 'Farm enterprise not found or you do not have permission to delete it' });
    }

    res.status(200).json({ message: 'Farm enterprise deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting farm enterprise', error: error.message });
  }
};