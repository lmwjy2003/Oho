import * as THREE from 'three';
export function createTextLabel(camera) {
  var div = document.createElement('div');
  div.className = 'text-label';
  div.style.position = 'absolute';
  div.style.width = 100;
  div.style.height = 100;
  div.innerHTML = "hi there!";
  div.style.top = -1000;
  div.style.left = -1000;
  
  return {
    element: div,
    parent: false,
    position: new THREE.Vector3(0,0,0),
    setHTML: function(html) {
      this.element.innerHTML = html;
    },
    setParent: function(threejsobj) {
      this.parent = threejsobj;
    },
    updatePosition: function() {
      if(parent) {
        this.position.copy(this.parent.position);
      }
      
      var coords2d = this.get2DCoords(this.position, camera);
      this.element.style.left = coords2d.x + 'px';
      this.element.style.top = coords2d.y + 'px';
    },
    get2DCoords: function(position, camera) {
      var vector = position.project(camera);
      vector.x = (vector.x + 1)/2 * window.innerWidth;
      vector.y = -(vector.y - 1)/2 * window.innerHeight;
      return vector;
    }
  };
}

export function drawAxis(scene, font) {
  const material = new THREE.LineBasicMaterial({
    color: 0x0000ff,
    linewidth: 3,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin:  'round' //ignored by WebGLRenderer
  });

  const linsGeometry = new THREE.Geometry();
  const axisPath = [
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 1000, 0, 0 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, 1000, 0 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, 0, 1000 ),
  ];

  axisPath.forEach(function(p){
    linsGeometry.vertices.push(p);
  });

  const axisLine = new THREE.Line( linsGeometry, material );
  scene.add( axisLine );

  const axisText = {
    xAxis: {
      text: 'x',
      position: new THREE.Vector3( 1000, 0, 0 )
    },
    yAxis: {
      text: 'y',
      position: new THREE.Vector3( 0, 1000, 0 )
    },
    zAxis: {
      text: 'z',
      position: new THREE.Vector3( 0, 0, 1000 )
    },
  }

  const materials = [
    new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
    new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
  ];

  Object.keys(axisText).forEach(a => {
    let textGeometry = new THREE.TextGeometry( axisText[a].text, {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelSegments: 5
    });
    let mesh = new THREE.Mesh( textGeometry, materials );
    mesh.position[axisText[a].text] = 1100;
    scene.add( mesh );
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function draw3Dbar(scene) {
  let data = [];
  for (let i = 0; i < 200; i++) {
    data.push({
      height: getRandomInt(100, 700)
    })
  }
  data.forEach((d, i) => {
    let geometry = new THREE.BoxGeometry( 5, d.height, 5 );
    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set(2 * (5 * i) + 5, d.height / 2, 2 * (5 * i) + 5);
    scene.add( cube );
  });
}