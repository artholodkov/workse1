import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ColorKeyframeTrack } from 'three'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    premultipliedAlpha: false,
  });

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 1
    cursor.y = - (event.clientY / sizes.height - 1)
})

// Scene
const scene = new THREE.Scene()


/**
 * Font
 */
 const fontLoader = new THREE.FontLoader()


 fontLoader.load(
     '/fonts/Recta-Bold_☞.json',
     (font) =>
     {
         const textGeometry = new THREE.TextBufferGeometry(
             'work se',{
                 font: font,
                 size: 0.5,
                 height: 0.2,
                 curveSegments: 7,
                 bevelEnabled: true,
                 bevelThickness: 0.03,
                 bevelSize: 0.02,
                 bevelOffset: 0,
                 bevelSegments: 8
             }
         )
 
      
         // textGeometry.computeBoundingBox()
         // textGeometry.translate(
         //     -(textGeometry.boundingBox.max.x) * 0.5,
         //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
         //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
         // )
 
         textGeometry.center()
 
         const material = new THREE.MeshNormalMaterial()
         
         const text = new THREE.Mesh(textGeometry, material)
         scene.add(text)
 
     }
 )



 /**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
//const controls = new OrbitControls(camera, canvas)
//controls.target.y = 2
//controls.enableDamping = true



renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    //controls.update()

    //update 
    camera.position.y = Math.sin(cursor.y * Math.PI/3)*3
    camera.position.z = Math.cos(cursor.y * Math.PI/3)*3
    //camera.position.y = cursor.y * 5
    camera.lookAt(0,0,0)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()