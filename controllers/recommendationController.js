import supabase from '../supabaseClient.js';
import config from '../config/index.js';

function calculateSimilarity(goal1, goal2) {
  // Implement your similarity calculation algorithm here
  // This is a simple example using string comparison
  return goal1.toLowerCase() === goal2.toLowerCase() ? 1 : 0;
}

exports.getRecommendations = async (req, res) => {
  try {
    const { user_id } = req.query;

    // Fetch the user's goal
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('goal')
      .eq('id', user_id)
      .single();

    if (userError) throw userError;

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userGoal = userData.goal;

    // Fetch all other users
    const { data: allUsers, error: usersError } = await supabase
      .from('users')
      .select('id, username, goal')
      .neq('id', user_id);

    if (usersError) throw usersError;

    // Calculate similarity and filter recommendations
    const recommendations = allUsers
      .map(user => ({
        ...user,
        similarity: calculateSimilarity(userGoal, user.goal)
      }))
      .filter(user => user.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity);

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error getting recommendations', error: error.message });
  }
};
