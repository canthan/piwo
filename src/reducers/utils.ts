export const reduceReducers = (...reducers) => (previous, current) =>
  reducers.reduce((p, r) => r(p, current), previous);

export const reduceReducers2 = (...reducers) => {
  console.log(reducers);
  console.log(...reducers);
  return (previous, current) => {
    console.log('previous', previous);
    console.log('current', current);
    return reducers.reduce((p, r) => {
      console.log('p', p);
      console.log('r', r);
      return r(p, current);
    }, previous);
  };
};

export const createReducer = (initialState, fnMap) => (
  state = initialState,
  { type, payload }
) => {
  const handler = fnMap[type];
  return handler ? handler(state, payload) : state;
};

export const createConditionalSliceReducer = (
  sliceName,
  fnMap,
  initialState
) => {
  const sliceReducer = createReducer(initialState, fnMap);
  return (state = initialState, action) => {
    if (fnMap[action.type]) {
      return {
        ...state,
        [sliceName]: sliceReducer(state[sliceName], action)
      };
    }
    return state;
  };
};
