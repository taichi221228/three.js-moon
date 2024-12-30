import "./style.css";
import * as THREE from "three";
import moonBumpMap from "./moon-bump@8k.jpg";
import moonMap from "./moon@8k.jpg";

const { width, height } = { width: 1472, height: 864 };

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

const moonGeometry = new THREE.SphereGeometry(200, 128, 128);
const moonTexture = loader.load(moonMap);
moonTexture.colorSpace = THREE.SRGBColorSpace;
const moonBumpTexture = loader.load(moonBumpMap);
moonBumpTexture.colorSpace = THREE.SRGBColorSpace;
const moonMaterial = new THREE.MeshPhongMaterial({
	map: moonTexture,
	bumpMap: moonBumpTexture,
	bumpScale: 0.1,
	emissive: 0xffffff,
	emissiveIntensity: 0.005,
});
const mesh = new THREE.Mesh(moonGeometry, moonMaterial);
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
