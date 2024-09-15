import developmentConfig from './development.js';
import productionConfig from './production.js';

const env = process.env.NODE_ENV || 'development';

const configs = {
  development: developmentConfig,
  production: productionConfig,
};

export default configs[env];
