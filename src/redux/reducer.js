const initialState = {
  followingUsers: [],
};

const followingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FOLLOWING_USER':
      return {
        ...state,
        followingUsers: [...state.followingUsers, action.user],
      };
    case 'REMOVE_FOLLOWING_USER':
      return {
        ...state,
        followingUsers: state.followingUsers.filter(user => user.id !== action.userId),
      };
    default:
      return state;
  }
};

export default followingReducer;