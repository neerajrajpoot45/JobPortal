// jobReducer.js
const jobReducer = (state = [], action) => {
    switch (action.type) {
      case 'DELETE_JOB':
        return state.filter((job) => job._id !== action.payload);
      default:
        return state;
    }
  };
  
  export default jobReducer;