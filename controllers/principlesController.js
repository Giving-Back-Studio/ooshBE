import supabase from '../supabaseClient.js';
import config from '../config/index.js';
import { logger } from '../logger.js';

export const getPrinciples = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('principles')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    logger.error('Error fetching principles', { error: error.message });
    next(error);
  }
};

export const createPrinciple = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { data, error } = await supabase
      .from('principles')
      .insert({ title, description })
      .select();

    if (error) throw error;

    logger.info('Principle created', { principleId: data[0].id });
    res.status(201).json(data[0]);
  } catch (error) {
    logger.error('Error creating principle', { error: error.message });
    next(error);
  }
};

// Add more principle-related controller functions as needed
