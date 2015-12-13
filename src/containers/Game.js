import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../actions/game'

let images = {
  boom: require('../images/boom.png'),
  alien: require('../images/alien.png')
}

let gameStyle = {
  background: '#eeeeff',
  width: '100vw',
  height: '100vh',
  position: 'relative'
};

let shipStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '30px',
  fontSize: '30px',
  transform: 'translate(-50%, -50%) rotate(-42deg)'
};

function topRelativeToWorld(location, world) {
  let worldLocation = world.location;
  let worldHeight = world.height;

  let delta = location - worldLocation;
  return (100 - (50 + (delta/worldHeight)*100)) + '%';
}

let Game = React.createClass({
  componentDidMount() {
    let keyMap = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    window.addEventListener('deviceorientation', (eventData) => {
      this.props.gameActions.orientation({
        alpha: Math.floor(eventData.alpha),
        beta: Math.floor(eventData.beta),
        gamma: Math.floor(eventData.gamma),
      });
    });

    document.body.addEventListener('keydown', (event) => {
      let { keyCode } = event;
      let key = keyMap[keyCode];
      if (key) {
        this.props.gameActions.keyDown(key);
      }
    });

    document.body.addEventListener('keyup', (event) => {
      let { keyCode } = event;
      let key = keyMap[keyCode];
      if (key) {
        this.props.gameActions.keyUp(key);
      }
    });

    let loop = () => {
      this.props.gameActions.timestep();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    this.props.gameActions.start();
  },

  render() {
    shipStyle.top = topRelativeToWorld(this.props.ship.distance, this.props.world);
    shipStyle.left = (50 + (this.props.ship.x)) + '%';
    shipStyle.transform = `translate(-50%, -50%) rotate(${this.props.orientation.gamma}deg)`;

    return (
      <div style={gameStyle}>
        <div style={shipStyle}>
          <img src={require('../images/rocket.png')} />
        </div>
        {this.props.aliens.map((alien, index) => {
          let alienStyle = {
            top: topRelativeToWorld(alien.location, this.props.world),
            left: (50 + alien.x) + '%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            width: 25
          };

          return (
            <div style={alienStyle}>
              <img src={alien.dead ? images.boom : images.alien} />
            </div>
          );
        })}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    ship: state.world.ship,
    world: state.world,
    orientation: state.orientation,
    aliens: state.world.aliens
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
