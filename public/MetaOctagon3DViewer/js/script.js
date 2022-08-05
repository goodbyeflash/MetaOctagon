// Canvas
const canvas = document.querySelector('canvas.webgl');

// Our Javascript will go here.
const scene = new THREE.Scene();
const clock = new THREE.Clock();

//scene.add(new THREE.AxesHelper(5));

let mixer;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Lights
const lightState = {
  ambientIntensity: 0,
  ambientColor: 0xffffff,
  directIntensity: 2,
  directColor: 0xffffff,
};

const hemisphereLight = new THREE.HemisphereLight();
const ambientLight = new THREE.AmbientLight(
  lightState.ambientColor,
  lightState.ambientIntensity
);
const directionalLight = new THREE.DirectionalLight(
  lightState.directColor,
  lightState.directIntensity
);

// const pointLight = new THREE.PointLight(0xff9000, 0.9, 15, 3);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;

// const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 30, Math.PI * 0.1, 0.1, 1);
// spotLight.position.set(0, 2, 3);
// scene.add(spotLight);

// spotLight.target.position.x = -0.75;
// scene.add(spotLight.target);

// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 10, 5);
// rectAreaLight.position.set(-1.5, 0, 1.5);
// rectAreaLight.lookAt(new THREE.Vector3());

// Light Helpers
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//   hemisphereLight,
//   0.2
// );
// scene.add(hemisphereLightHelper);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);


directionalLight.position.x = 2;

//scene.add(rectAreaLight);
scene.add(hemisphereLight);
scene.add(ambientLight);
scene.add(directionalLight);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;

const tick = () => {
  // Update Orbital Controls
  oribitControls.update();

  if (mixer) {
    mixer.update(clock.getDelta());
  }

  // Render
  renderer.render(scene, camera);

  //spotLightHelper.update();

  if (camera.position.x >= 50) {
    camera.position.x -= 0.01;
    camera.position.y -= 0.001;
    camera.position.z -= 0.001;
  }

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

// GLTF
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load(
  './models/Octafinal.gltf',
  (gltf) => {
    const model = gltf.scene;    
    model.position.y = -18;

    //mixer = new THREE.AnimationMixer(model);

    //const clips = gltf.animations;

    // clips.forEach((clip) => {
    //   const liTag = document.createElement('li');      
    //   liTag.innerText = clip.name;
    //   liTag.style.cursor = 'pointer';
    //   liTag.onclick = (e) => {
    //     // 특정 애니메이션 재생
    //     const clip = THREE.AnimationClip.findByName(clips, e.target.innerText);
    //     const action = mixer.clipAction(clip);
    //     action.play();
    //   };
    // });

    // model.traverse(function (child) {      
      
    //   if (child.isMesh) {
    //       const m = child;
    //       m.receiveShadow = true;
    //       m.castShadow = true;
    //   }
    //   if (child.isLight) {
    //       const l = child;
    //       l.castShadow = true;
    //       l.shadow.bias = -0.003;
    //       l.shadow.mapSize.width = 2048;
    //       l.shadow.mapSize.height = 2048;
    //   }     
    // });

    scene.add(model);

    // const btnTag = document.createElement('Button');
    // btnTag.innerText = 'reset';
    // btnTag.onclick = (e) => {
    //   mixer.stopAllAction();
    // };

    tick();    
    sendMsgToParent("gltfLoading");

  },
  undefined,
  (error) => {
    console.error(error);
  }
);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  20,
  sizes.width / sizes.height,
  70,
  1000
);
camera.position.x = 100;
camera.position.y = 0;
camera.position.z = 0;

scene.add(camera);

// Controls
const oribitControls = new THREE.OrbitControls(camera, canvas);
oribitControls.enableDamping = true;
oribitControls.enableZoom = false;

oribitControls.minPolarAngle = (90 - 20) * Math.PI / 180;
oribitControls.maxPolarAngle = (90 + 30) * Math.PI / 180;

oribitControls.maxAzimuthAngle = 165 * Math.PI / 180;
oribitControls.minAzimuthAngle = 10 * Math.PI / 180;

/**
 * Animate
 */
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
});

function sendMsgToParent( msg ) {
  window.parent.postMessage( msg, '*' );
}