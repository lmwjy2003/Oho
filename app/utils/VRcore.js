import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE)
let Scene, Camera, Renderer, Controls, loopID, LoadingManager, LoaderCount = 0;

function createScene({domContainer = document.body, fov = 50,far = 1000}){
  if (!(domContainer instanceof HTMLElement)) {
		throw new Error('domContainer is not a HTMLElement!');
	}
  // 初始化 scene
	Scene = new THREE.Scene();
	// 初始化 camera
	Camera = new THREE.PerspectiveCamera(fov, domContainer.clientWidth / domContainer.clientHeight, 1, far);
  Camera.position.set( 200, 200, 200 );
  Camera.lookAt(Scene.position);
	Scene.add(Camera);
	// 初始化 renderer
	Renderer = new THREE.WebGLRenderer({ canvas: domContainer, antialias: true, alpha: true } );
  Renderer.clear();
  Renderer.setClearColor( 0xeeeeee, 1); // 更改渲染器颜色
	Renderer.setSize(domContainer.clientWidth, domContainer.clientHeight);
	Renderer.shadowMap.Enabled = true;
	Renderer.setPixelRatio(domContainer.devicePixelRatio);
  initVR();
}

function initVR() {
    // 初始化控制器
    Controls = new OrbitControls(Camera, Renderer.domElement);;
    Controls.addEventListener('change', render);
    Controls.enableZoom = true;
}

function render() {
  Renderer.render(Scene, Camera);
}

function renderStart(callback) {
  loopID = 0; // 记录循环几次，后面有与清除场景中的物体
  if (loopID === -1) return;
  let animate = function(){
    loopID = requestAnimationFrame(animate);
    callback();
    Controls.update();
    render();
  }
  animate();
}

// 暂停动画渲染
function renderStop() {
  if (loopID !== -1) {
      window.cancelAnimationFrame(loopID);
      loopID = -1;
  }
}
// 回收当前场景
function clearScene() {
  for(let i = Scene.children.length - 1; i >= 0; i-- ) {
      Scene.remove(Scene.children[i]);
  }
}
// 清理页面
function cleanPage() {
	renderStop();
	clearScene();
}

export {
  Scene,
  Camera,
  Renderer,
  Controls,
  createScene,
  initVR,
  renderStart,
  renderStop,
  clearScene,
  cleanPage,
  LoadingManager,
  LoaderCount
}
