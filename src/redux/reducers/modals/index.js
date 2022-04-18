export const EDIT_CARD_MODAL = "EDIT_CARD_MODAL";

const initialState = {
  editModal: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_CARD_MODAL:
      return { ...state, editModal: !state.editModal };
    default:
      return state;
  }
}
