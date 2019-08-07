const initialState = {
  avaliacoesList: []
};


const avaliacaoReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SALVAR_AVALIACAO':
      return {
        ...state,
        avaliacoesList: [...state.avaliacoesList, action.payload]
      };
    case 'LIMPAR_AVALIACOES':
      return {
        ...state,
        avaliacoesList: initialState
      };
    default:
      return state;
  }
};

export default avaliacaoReducers;