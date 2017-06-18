import * as THREE from 'three';
import { createTextLabel, drawAxis, draw3Dbar } from './uitils.js';
const fonts = require('json!../fonts/fonts.json');
const OrbitControls = require('three-orbit-controls')(THREE)

export default class ThreeFactory {
  constructor(dom, option) {
    this.dom = dom;
    this.option = option;
    return this;
  }

  init() {
    const dom = this.dom;
    const renderer = new THREE.WebGLRenderer({canvas: dom, alpha: true });

    renderer.clear();
    renderer.setClearColor( 0xeeeeee, 1); // 更改渲染器颜色
    renderer.setSize(dom.clientWidth, dom.clientHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, dom.clientWidth / dom.clientHeight, 1, 5000);
    camera.position.set(2000, 2000, 2000);
    camera.lookAt(scene.position);

    const PointLight = new THREE.PointLight(0xffffff);
    PointLight.position.set(1000, 1000, 1000);
    const AmbientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add(PointLight);
    scene.add(AmbientLight);

    scene.background = new THREE.Color( 0xeeeeee ); // 更改场景背景色

    const cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.addEventListener('change', render);
    cameraControls.enableZoom = true;
    function render() {
      renderer.render(scene, camera);
    }
    var animate = function() {
      requestAnimationFrame(animate);
      cameraControls.update();
      render();
    }
    draw3Dbar(scene);

    const loader = new THREE.FontLoader();
    loader.load( '../app/fonts/fonts.json', function ( font ) {
      drawAxis(scene, font);
      animate();
    } );
  }
}
