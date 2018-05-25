const initState = {
  num: 0
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case 'ADD' : {
      return {
        ...state,
        num: ++state.num
      }
    }
    case 'MINUS' : {
      return {
        ...state,
        num: --state.num
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;