import * as THREE from 'three';
import * as VRcore from './VRcore.js';

export default class VRpage {
  constructor(options) {
    // 创建场景
    VRcore.createScene(options);
    this.start();
    this.loadPage();
  }
  loadPage() {
    VRcore.renderStart(() => this.update());
    this.loaded();
  }
	initPage() {
		this.loadPage();
		this.start();
	}
	start() {}
	loaded() {}
	update() {}
}