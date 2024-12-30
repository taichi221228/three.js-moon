import "./style.css";
import * as THREE from "three";
import moonBumpMap from "./moon-bump.jpg";
import moonMap from "./moon.jpg";
import starsMap from "./stars.jpg";

const { width, height } = { width: 1472, height: 864 };

const { canvas } = (() => {
	const app = document.getElementById("app");
	return { app, canvas: app.querySelector("canvas") };
})();

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, width / height, 1);
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
	emissive: 0xfff0a0,
	emissiveIntensity: 0.0025,
});
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moonMesh);

const starsGeometry = new THREE.SphereGeometry(1000, 128, 128);
const starsTexture = loader.load(starsMap);
starsTexture.colorSpace = THREE.SRGBColorSpace;
const starsMaterial = new THREE.MeshBasicMaterial({
	map: starsTexture,
	side: THREE.BackSide,
});
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(starsMesh);

const directionalLight = new THREE.DirectionalLight(0xfff0a0, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xfff0a0, 0.01);
scene.add(ambientLight);

renderer.render(scene, camera);

tick();

function tick() {
	requestAnimationFrame(tick);
	moonMesh.rotation.y += 0.01;
	renderer.render(scene, camera);
}
