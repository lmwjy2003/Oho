import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThreeFactory } from '../../utils/index.js'
class VRdemo extends Component {
  constructor() {
    super();
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    const dom = document.querySelector('#camera');
    this.init(dom);
  }

  init(dom) {
    const demo = new ThreeFactory(dom);
    demo.init();
  }

  render() {
    return (
      <div className="three-demo">
        <canvas id="camera" ref="camera"></canvas>
      </div>
    );
  }
}

export default VRdemo;