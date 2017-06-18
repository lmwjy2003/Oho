import * as THREE from 'three';
export default class ThreeDemo {
  constructor(dom, camera, type) {
    this.dom= dom;
    this.type = type;
    this.camera = camera;
    return this;
  }

  init() {
    const dom = this.dom;
    const renderer = new THREE.WebGLRenderer({
        canvas: dom,
    });
    renderer.clear();
    renderer.setClearColor(0x000000); // black

    // scene
    const scene = new THREE.Scene();
    let camera;
    // camera
    if (this.camera === 'OrthographicCamera') {
      camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
      camera.position.set(4, -3, 5);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    } else {
      camera = new THREE.PerspectiveCamera(25, dom.clientWidth / dom.clientHeight, 1, 1000);
      camera.position.set(4, -3, 5);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    scene.add(camera);

    // a cube in the scene
    const graph = this.createGraph(this.type);

    scene.add(graph);
    renderer.setSize(dom.clientWidth, dom.clientHeight);
    renderer.render(scene, camera);
  }

  createGraph(type) {
    const graphs = {
      CubeGeometry: function() {
        return new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
          new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          })
        );
      },
      PlaneGeometry: function() {
        return new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
          new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          })
        ); 
      },
      SphereGeometry: function() {
        return new THREE.Mesh(new THREE.SphereGeometry(1, 18, 12),
          new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          })
        ); 
      },
      CircleGeometry: function() {
        return new THREE.Mesh(new THREE.CircleGeometry(1, 18),
          new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          })
        ); 
      },
      CylinderGeometry: function() {
        return new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 18, 3),
          new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          })
        ); 
      },
      TetrahedronGeometry: function() {
        return new THREE.Mesh(new THREE.TetrahedronGeometry(1),
          new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          })
        ); 
      },
      OctahedronGeometry: function() {
        return new THREE.Mesh(new THREE.OctahedronGeometry(1),
          new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          })
        ); 
      },
      IcosahedronGeometry: function() {
        return new THREE.Mesh(new THREE.IcosahedronGeometry(1),
          new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          })
        ); 
      },
      TorusGeometry: function() {
        return new THREE.Mesh(new THREE.TorusGeometry(1, .3, 12, 18),
          new THREE.MeshBasicMaterial({
              color: 0xff0000,
              wireframe: true
          })
        ); 
      },
    }
    return graphs[type]();
  }
}