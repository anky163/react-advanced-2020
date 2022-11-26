export const reducer = (state, action) => {
  // console.log(state);

  if (action.type === 'NO_VALUE') {
    return { 
      ...state, 
      isModalOpen: true, 
      modalContent: 'please enter value' 
    };
  }

  if (action.type === 'ADD_ITEM') {
    const newPeople = [ ...state.people, action.payload ]
    return { 
      ...state, 
      people: newPeople, 
      isModalOpen: true, 
      modalContent: 'item added' 
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    const newPeople = state.people.filter(person => person.id !== action.payload);
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: 'item removed'
    }
  }

  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state, 
      isModalOpen: false,
    }
  }

  throw new Error('no matching action type');
};