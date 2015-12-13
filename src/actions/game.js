export const timestep = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'TIMESTEP',
      delta: Date.now() - getState().world.time
    });
  }
}

export const start = () => {
  return {
    type: 'GAME_START'
  };
}

export const keyDown = (key) => {
  return (dispatch, getState) => {
    if (!getState().keys[key]) {
      dispatch({
        type: 'KEY_DOWN',
        key: key
      });
    }
  }
}

export const keyUp = (key) => {
  return (dispatch, getState) => {
    if (getState().keys[key]) {
      dispatch({
        type: 'KEY_UP',
        key: key
      });
    }
  }
}

export const orientation = (orientation) => {
  return {
    type: 'ORIENTATION',
    values: orientation
  }
}
