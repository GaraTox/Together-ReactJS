export const addFollowingUser = (user) => ({
    type: 'ADD_FOLLOWING_USER',
    user,
  });
  
  export const removeFollowingUser = (userId) => ({
    type: 'REMOVE_FOLLOWING_USER',
    userId,
  });