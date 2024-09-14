const supabase = require('../supabaseClient');

exports.uploadImage = async (file, path) => {
  const { data, error } = await supabase.storage
    .from('farm-enterprises')
    .upload(path, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { publicURL, error: urlError } = supabase.storage
    .from('farm-enterprises')
    .getPublicUrl(data.path);

  if (urlError) throw urlError;

  return publicURL;
};
