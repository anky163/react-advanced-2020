export const reducer = (state, action) => {
  if (action.type === 'UPDATE_BAG') {
    return action.payload;
  }

  if (action.type === 'INCREASE_ITEM') {
    let addedPrice = 0;
    const newItems = state.items.map(item => {
      if (item.id === action.payload) {
        addedPrice = parseFloat(item.price);
        return { ...item, amount: item.amount + 1 }
      }
      return item;
    });
    const newState = { 
      items: newItems,  
      totalAmount: state.totalAmount + 1, 
      totalPrice: state.totalPrice + addedPrice, 
    };
    return newState;
  }

  if (action.type === 'DECREASE_ITEM') {
    let minusPrice = 0;
    const newItems = state.items.reduce((array, item) => {
      if (item.id === action.payload) {
        minusPrice = parseFloat(item.price);
        const newAmount = item.amount - 1;
        if (newAmount > 0) {
          array.push({ ...item, amount: newAmount });
        }
      } else {
        array.push(item);
      }
      return array;
    }, []);
    const newState = { 
      items: newItems,  
      totalAmount: state.totalAmount - 1, 
      totalPrice: state.totalPrice - minusPrice, 
    };
    return newState;
  }

  if (action.type === 'REMOVE_ITEM') {
    const removedId = action.payload;
    const removedItem = state.items.find(item => item.id === removedId);
    const minusPrice = parseFloat(removedItem.price) * (removedItem.amount);
    const newState = {
      items: state.items.filter(item => item.id !== removedId),
      totalAmount: state.totalAmount - removedItem.amount,
      totalPrice: state.totalPrice - minusPrice,
    };
    return newState;
  }

  if (action.type === 'CLEAR_BAG') {
    return { items: [], totalAmount: 0, totalPrice: 0 };
  }

  throw new Error('Unmatch action type');
};