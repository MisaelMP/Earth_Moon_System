//Camera, scene, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
scene.add(camera);
camera.position.set(0, 35, 70);
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//Orbit Controls
const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
//Lights
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const spotLight = new THREE.DirectionalLight(0xffffff);
spotLight.position.set(100, 100, 100);
scene.add(spotLight);
//Objects (We build a mesh using a geometry and a material)
//Earth
// const material.bumpMap = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg')
// material.bumpScale = 0.05
const earthGeometry = new THREE.SphereGeometry(10, 50, 50);
var loader = new THREE.TextureLoader();
const texture = loader.load('images/8081_earthmap10k.jpg');
const bump = loader.load('images/earthbump1k.jpg');
const spec = loader.load('images/earthspec1k.jpg');
const earthMaterial = new THREE.MeshPhongMaterial({
  map: texture,
  color: 0xf2f2f2,
  bumpMap: bump,
  bumpScale: 0.09,
  specularMap: spec,
  shininess: 5
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);
//Clouds
const cloudGeometry = new THREE.SphereGeometry(10.3, 50, 50);
const cloudTexture = loader.load('images/earthcloudmap.jpg');
// const cityTexture = loader.load('/images/earthlights1k.jpg');
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: cloudTexture,
  // specular: cityTexture,
  transparent: true,
  opacity: 0.1
});
const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(clouds);
//Stars
const starGeometry = new THREE.SphereGeometry(1000, 50, 50);
const starTexture = loader.load('images/starfield.png');
const starMaterial = new THREE.MeshPhongMaterial({
  map: starTexture,
  side: THREE.DoubleSide,
  shininess: 0
});
const starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);
//Moon
const moonGeometry = new THREE.SphereGeometry(3.5, 50, 50);
const moonTexture = loader.load('images/moonmap1k.jpg');
const moonBump = loader.load('images/moonbump1k.jpg');
const moonMaterial = new THREE.MeshPhongMaterial({
  map: moonTexture,
  bumpMap: moonBump
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(35, 0, 0);
scene.add(moon);
//Camera vector
const earthVec = new THREE.Vector3(0, 0, 0);
const r = 35;
let theta = 0;
const dTheta = 2 * Math.PI / 1000;
let dx = .01;
let dy = -.01;
let dz = -.05;
//Render loop
const render = function() {
  earth.rotation.y += .0009;
  clouds.rotation.y += .00005;
  //Moon orbit
  theta += dTheta;
  moon.position.x = r * Math.cos(theta);
  moon.position.z = r * Math.sin(theta);
  //Flyby
  if (camera.position.z < 0) {
    dx *= -1;
  }
  camera.position.x += dx;
  camera.position.y += dy;
  camera.position.z += dz;
  camera.lookAt(earthVec);
  //Flyby reset
  if (camera.position.z < -100) {
    camera.position.set(0, 35, 70);
  }
  camera.lookAt(earthVec);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
