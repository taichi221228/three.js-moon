import "./style.css";
import * as THREE from "three";
import moon from "./moon@2k.jpg";

const { width, height } = { width: 960, height: 540 };

const { canvas } = (() => {
	const app = document.getElementById("app");
	return { app, canvas: app.querySelector("canvas") };
})();

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, width / height, 1);
camera.position.set(0, 0, 1000);

const loader = new THREE.TextureLoader();

const geometry = new THREE.SphereGeometry(200, 200, 200);
const map = loader.load(moon);
map.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshPhongMaterial({
	map,
	bumpMap: loader.load(moon),
	bumpScale: 0.05,
	emissive: 0xffffff,
	emissiveIntensity: 0.005,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
scene.add(ambientLight);

renderer.render(scene, camera);

tick();

function tick() {
	requestAnimationFrame(tick);
	mesh.rotation.y += 0.01;
	renderer.render(scene, camera);
}
