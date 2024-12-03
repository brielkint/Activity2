// Importing Three.js and OrbitControls
import * as THREE from 'three';  // Import Three.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';  // Import OrbitControls

// Scene setup
const scene = new THREE.Scene();  // Create the scene

// Initial window size and camera setup
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 7;  // Position camera on the z-axis

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl') });
renderer.setSize(sizes.width, sizes.height);  // Set renderer size to match window size
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));  // Optimize pixel ratio for retina displays
document.body.appendChild(renderer.domElement);  // Attach renderer to the DOM

// Create a Torus Knot geometry (a unique and interesting 3D shape)
const geometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16);  // Radius, tube radius, tubular segments, radial segments
const material = new THREE.MeshStandardMaterial({ color: 0xff6347, metalness: 0.6, roughness: 0.4 });  // Red color material
const torusKnot = new THREE.Mesh(geometry, material);  // Create the torus knot mesh
scene.add(torusKnot);  // Add the torus knot to the scene

// Lights setup
// Ambient Light (Soft global light)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);  // White color, low intensity
scene.add(ambientLight);

// Directional Light (Simulates sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // White color, high intensity
directionalLight.position.set(5, 5, 5);  // Position light at (5, 5, 5)
scene.add(directionalLight);

// Point Light (Omni-directional light)
const pointLight = new THREE.PointLight(0xff0000, 1, 10);  // Red color, intensity 1, distance 10
pointLight.position.set(-3, 3, 0);  // Position it on the left side
scene.add(pointLight);

// Hemisphere Light (Sky-ground lighting)
const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x444444, 0.5);  // Sky and ground colors
scene.add(hemisphereLight);

// OrbitControls setup (to move the camera interactively)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Enable damping for smooth camera movement
controls.dampingFactor = 0.25;  // Adjust damping speed
controls.screenSpacePanning = false;  // Disable panning in screen space

// Window resizing functionality
window.addEventListener('resize', () => {
  // Update sizes on resize
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  
  // Update camera aspect ratio and projection matrix
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  // Update renderer size and pixel ratio
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Fullscreen functionality (toggle on double-click)
window.addEventListener('dblclick', () => {
  const canvas = renderer.domElement;
  
  // Check if already in fullscreen
  if (!document.fullscreenElement) {
    // Request fullscreen
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { // Firefox
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { // IE/Edge
      canvas.msRequestFullscreen();
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
});

// Animation loop to rotate the torus knot
function animate() {
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  controls.update();  // Update controls for smooth camera movement
  renderer.render(scene, camera);
  requestAnimationFrame(animate);  // Recursively call animate
}

animate();  // Start the animation loop
