export const reducer = (state, action) => {
  if (action.type === 'SHOW_SIDEBAR') {
    return { ...state, showSideBar: true };
  }

  if (action.type === 'CLOSE_SIDEBAR') {
    return { ...state, showSideBar: false };
  }

  if (action.type === 'SHOW_MODAL') {
    return { ...state, showModal: true };
  }

  if (action.type === 'CLOSE_MODAL') {
    return { ...state, showModal: false };
  }

  throw new Error('no matching type');
};