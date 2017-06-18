import * as THREE from 'three';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ThreeGraph from './threeDemo';
import RaisedButton from 'material-ui/RaisedButton';
class ThreeDemo extends Component {
  constructor() {
    super();
    this.renderBtns = this.renderBtns.bind(this);
    this.init = this.init.bind(this);
  }

  renderBtns() {
    const btns = [
      {camera: 'OrthographicCamera', type: 'CubeGeometry', name: '正交投影摄像机'},
      {camera: 'PerspectiveCamera', type: 'CubeGeometry', name: '透视投影摄像机'},
      {camera: 'PerspectiveCamera', type: 'CubeGeometry', name: '正方体'},
      {camera: 'PerspectiveCamera', type: 'PlaneGeometry', name: '平面'},
      {camera: 'PerspectiveCamera', type: 'SphereGeometry', name: '球体'},
      {camera: 'PerspectiveCamera', type: 'CircleGeometry', name: '圆形'},
      {camera: 'PerspectiveCamera', type: 'CylinderGeometry', name: '圆柱体'},
      {camera: 'PerspectiveCamera', type: 'TetrahedronGeometry', name: '正四面体'},
      {camera: 'PerspectiveCamera', type: 'OctahedronGeometry', name: '正八面体'},
      {camera: 'PerspectiveCamera', type: 'IcosahedronGeometry', name: '正二十面体'},
      {camera: 'PerspectiveCamera', type: 'TorusGeometry', name: '圆环面'},      
    ];
    return btns.map((btn, index) => (
      <RaisedButton
        onClick={() => this.init(btn.camera, btn.type)}
        id={index}
        key={index}
        primary={true}
        className="button"
      >{btn.name}</RaisedButton>
    ));
  }

  init(camera, type) {
    const dom = this.refs.demo;
    const a = new ThreeGraph(dom, camera, type);
    a.init();
  }

  componentDidMount() {
    this.init('OrthographicCamera', 'CubeGeometry');
  }

  render() {
    return (
      <div className="three-demo">
        <div>{this.renderBtns()}</div>
        <canvas id="demo" ref="demo"></canvas>
      </div>
    );
  }
}

export default ThreeDemo;