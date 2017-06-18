import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from './Page.js';
class Oho extends Component {
  constructor() {
    super();
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    const dom = document.querySelector('#Oho');
    this.init(dom);
  }

  init(dom) {
    const page = new Page({domContainer: dom});
  }

  render() {
    return (
      <div className="three-demo">
        <canvas id="Oho" ref="camera"></canvas>
      </div>
    );
  }
}

export default Oho;