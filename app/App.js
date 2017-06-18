import React, { Component } from 'react';
import People from './components/demo/index.js';
import ThreeDemo from './components/threeDemo/index.js';
import ThreeCamera from './components/ThreeCamera/index.js';
import VRDemo from './components/VRDemo/index.js';
import Oho from './components/Oho/index.js';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const components = [
  {name: 'People', component: <People />},
  {name: 'ThreeDemo', component: <ThreeDemo />},
  {name: 'ThreeCamera', component: <ThreeCamera />},
  {name: 'VRDemo', component: <VRDemo />},
  {name: 'Oho', component: <Oho />},
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      showComponent: 0
    }
  }

  renderMenuItems() {
    return components.map((component, index) => (
      <MenuItem
        key={index}
        onClick={() => this.setState({showComponent: index})}
      >{component.name}</MenuItem>
    ));
  }

  renderContainer(index) {
    return components[index].component;
  }

  render() {
    return (
      <div className="App">
        <div className="left-nav">
          <Drawer open>{this.renderMenuItems()}</Drawer>
        </div>
        <div className="container">
          {this.renderContainer(this.state.showComponent)}
        </div>
      </div>
    );
  }
}

export default App;