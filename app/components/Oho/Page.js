import * as THREE from 'three';
import VRpage from '../../utils/VRpage.js';
import * as VRcore from '../../utils/VRcore.js';

export default class Page extends VRpage {
  start() { // 启动渲染之前，创建场景3d模型
    let geometry = new THREE.CubeGeometry(100,100,100);
    let material = new THREE.MeshLambertMaterial( { color:0x0000ff} );
    this.box = new THREE.Mesh(geometry,material);
    this.box.position.set(3, -2, -3);
    const PointLight = new THREE.PointLight(0xffffff);
    PointLight.position.set(500, 500, 500);
    const AmbientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    VRcore.Scene.add(PointLight);
    VRcore.Scene.add(AmbientLight);
    VRcore.Scene.background = new THREE.Color( 0xeeeeee ); // 更改场景背景色
    VRcore.Scene.add(this.box);
  }
  update() {
    this.box.rotation.y += 0.01;
  }
}