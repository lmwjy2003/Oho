import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE)
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
class ThreeCamera extends Component {
  constructor() {
    super();
    this.state = {
      control: true,
      domReady: false,
    }
    this.init = this.init.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  init() {
    const dom = this.refs.camera;
    const renderer = new THREE.WebGLRenderer({canvas: dom});
    renderer.clear();
    renderer.setSize(dom.clientWidth, dom.clientHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, dom.clientWidth / dom.clientHeight, 1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(scene.position);

    const light = new THREE.PointLight(0xffffff);
    light.position.set(300, 400, 200);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x333333));

    const cube = new THREE.BoxGeometry(100, 100, 100);
    const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    const mesh = new THREE.Mesh(cube, cubeMaterial);
    scene.add(mesh);

    function render() {
      renderer.render(scene, camera);
    }

    render();
    const cameraControls = new OrbitControls(camera, dom);
    cameraControls.addEventListener('change', render);
  }

  componentDidMount() {
    this.init();
  }

  renderCanvas() {
    if (this.state.domReady) {
      return <canvas id="camera" ref="camera"></canvas>;
    }
    return <CircularProgress size={80} thickness={5} />
  }

  render() {
    return (
      <div className="three-camera">
        <h1>相机控制DEMO，按住鼠标拖动旋转</h1>
        <canvas id="camera" ref="camera"></canvas>
      </div>
    );
  }
}

export default ThreeCamera;