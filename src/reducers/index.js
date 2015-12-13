import { combineReducers } from 'redux';

function intersect(c1, c2) {
  let { x: x1, y: y1, r: r1 } = c1;
  let { x: x2, y: y2, r: r2 } = c2;

  let a = Math.pow(r1 - r2, 2)
  let b = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);

  return a <= b && b <= Math.pow(r1 + r2, 2);
}

function keysReducer(state={}, action) {
  switch (action.type) {
    case 'KEY_DOWN': {
      return {
        ...state,
        [action.key]: true
      };
    }
    case 'KEY_UP': {
      return {
        ...state,
        [action.key]: false
      };
    }
    default:
      return state;
  }
}

function shipReducer(state={x: 0, distance: 0, thrust: 0, veer: 0}, action) {
  switch (action.type) {
    case 'TIMESTEP': {
      let { x, distance, veer, thrust } = state;
      let { delta } = action;
      delta = delta/1000;
      let newX = x + veer * delta;

      if (newX > 50) {
        newX = 50;
      } else if (newX < -50) {
        newX = -50;
      }

      return {
        ...state,
        x: newX,
        distance: distance + thrust * delta
      };
    }

    case 'KEY_DOWN': {
      let { veer, thrust } = state;
      let { key } = action;

      if (key === 'left') {
        veer = veer - 20;
      }
      if (key === 'right') {
        veer = veer  + 20;
      }
      if (key === 'up') {
        thrust = thrust + 50;
      }
      if (key === 'down') {
        thrust = thrust - 50;
      }

      return {
        ...state,
        veer,
        thrust
      }
    }

    case 'KEY_UP': {
      let { veer, thrust } = state;
      let { key } = action;

      if (key === 'left') {
        veer = veer + 20;
      }
      if (key === 'right') {
        veer = veer - 20;
      }
      if (key === 'up') {
        thrust = thrust - 50;
      }
      if (key === 'down') {
        thrust = thrust + 50;
      }

      return {
        ...state,
        veer,
        thrust
      }
    }

    case 'ORIENTATION': {
      return {
        ...state,
        veer: action.values.gamma*2,
        thrust: action.values.beta*3
      };
    }

    default:
      return state;
  }
};

function worldReducer(state={height: 300, time: null, playing: false}, action) {
  let aliens = aliensReducer(state.aliens, action);
  let ship = shipReducer(state.ship, action);

  aliens = aliens.map((alien) => {
    alien.dead = alien.dead || false;

    if (!alien.dead) {
      alien.dead = intersect(
        { x: ship.x, y: ship.distance, r: 10 },
        { x: alien.x, y: alien.location, r: 10 },
      );
    }
    return alien;
  });

  state = {
    ...state,
    location: ship.distance || 0,
    ship,
    aliens
  }

  switch (action.type) {
    case 'GAME_START':
      return {
        ...state,
        time: Date.now(),
        playing: true
      };
    case 'TIMESTEP':
      if (state.playing) {
        return {
          ...state,
          time: Date.now()
        };
      }
    default:
      return state;
  }
}

function aliensReducer(state=[], action) {
  switch (action.type) {
    case 'GAME_START': {
      return [
        ...state,
        { x: Math.floor(Math.random()*100) - 50, location: 100},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000},
        { x: Math.floor(Math.random()*100) - 50, location: Math.random()*5000}
      ];
    }

    default:
      return state;
  }

}

function orientationReducer(state={}, action) {
  switch (action.type) {
    case 'ORIENTATION':
      return {
        ...action.values
      };
    default:
      return state;
  }
}


export default combineReducers({
  world: worldReducer,
  keys: keysReducer,
  orientation: orientationReducer,
});
