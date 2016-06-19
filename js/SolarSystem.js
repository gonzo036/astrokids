//var internalShaders = null;
//var Planet = function (tipo, nombre, radio, orbita, rotacion, traslacion, phi, inclination, bumpScale) {
var AstroKids = function() {
    var preloader = null;
    var stats = null;
    var stats2 = null;
    var controller = null;
    var currentShape = -1;
    var paused = true;
    var raf = null;
    this.loadedShape = null;

    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var FLOOR = -0;
    var container;
    var camera, scene; //, sceneAnimationClip;
    var renderer;
    var controls;
    //var mixers = [];
    //var mesh, mesh2, helper;
    //var mixer;
    var mouseX = 0,
        mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var clock = null;
    var sistemaSolar = null;
    //var gui = new dat.GUI();
    var mouse = null;

    var selectedSign = 0;
    //document.addEventListener('mousemove', onMouseMove, false);

    // Resolucion de esfera, mayor el numero mejor visualmente
    var SPHERE_RESOLUTION = 32;

    // radio donde comienzan las estrellas
    var INITIAL_SKYDOME_RADIUS = 10000;

    // radio donde terminan las estrellas
    var FINAL_SKYDOME_RADIUS = 25000;

    // distancia entre el radio exterior de las estellas y el background skydome
    var FINAL_SKYDOME_OFFSET = 100;

    // posicion inicial de la camara en vista de sistema solar
    var INITIAL_CAMERA_POSITION_X = 0;
    var INITIAL_CAMERA_POSITION_Y = 1500;
    var INITIAL_CAMERA_POSITION_Z = -8000;

    // tiempo de transicion al seleccionar un planeta
    //var PLANET_VIEW_TRANSITION_TIME = 0.1;
    var PLANET_VIEW_TRANSITION_TIME = 5.0;
    var PLANET_VIEW_CAMERA_ACCELERATION = 5.0;

    // escala del tamano de planeta
    var PLANETSCALE = 6;

    // distancia de visualizacion al planeta en modo vista planeta
    var PLANET_VIEW_ZOOM = 300.0 / (10 * PLANETSCALE);

    // elevacion de la camara en modo vista planeta
    var PLANET_VIEW_ELEVATION = 1.3;

    // escala de visualizaicon chispas, normalizado
    var SPARKLES_SCALE = 10.0 / (7 * PLANETSCALE);

    // distancia de visualizaicon chispas
    var SPARKLES_DISTANCE = 50;

    // escala de visualizaicon dios
    var GOD_SCALE = 1.0 / (5 * PLANETSCALE);

    // posicion del dios en modo vista planeta
    var GOD_POSITION_OFFSET_Y = 1.10;

    // intensidad de rotacion con el mouse del dios en modo vista planeta
    var GOD_TURN_INTENSITY = 2.0;

    // inclinacion del dios
    var GOD_INCLINATION = 0.5;


    // distancia maxima de camara
    var MAX_CAMERA_DISTANCE = 9000;

    // carpetas del sistema
    var MODELS_FOLDER = 'models/';
    var IMAGES_FOLDER = 'images/';

    // escala de la esfera glow puesta sobre el planeta
    var GLOW_SCALE = 1.05;

    // luz ambiente en vista sistema solar
    var AMBIENT_LIGHT_DIM = 0.2;

    // luz ambiente en vista planeta
    var AMBIENT_LIGHT_FULL = 1.0;

    // informacion del comportamiento de los planetas/lunas

    var Planets = null;
    var ZODIAC_SIGNS = null;
    var Gods = null;
    var starLayer = null;

    this.init = function() {
        this.hasWEBGL = !!window.WebGLRenderingContext;
        console.log("webgl activo", this.hasWEBGL);
        this.preload();
    }
    this.preload = function() {
        var manifest = [{
            src: IMAGES_FOLDER+"textures/Earth_Bump.jpg",
            id: "Earth_Bump"
        }, {
            src: IMAGES_FOLDER+"textures/Earth_Diffuse.jpg",
            id: "Earth_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Earth_Spec.jpg",
            id: "Earth_Spec"
        }, {
            src: IMAGES_FOLDER+"textures/Earth_Spec.png",
            id: "Earth_Spec_png"
        }, {
            src: IMAGES_FOLDER+"textures/Jupiter_Bump.jpg",
            id: "Jupiter_Bump"
        }, {
            src: IMAGES_FOLDER+"textures/Jupiter_Diffuse.jpg",
            id: "Jupiter_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Mars_Bump.jpg",
            id: "Mars_Bump"
        }, {
            src: IMAGES_FOLDER+"textures/Mars_Diffuse.jpg",
            id: "Mars_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Mercury_Bump.jpg",
            id: "Mercury_Bump"
        }, {
            src: IMAGES_FOLDER+"textures/Mercury_Diffuse.jpg",
            id: "Mercury_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Mercury_Diffuse.png",
            id: "Mercury_Diffuse_png"
        }, {
            src: IMAGES_FOLDER+"textures/Moon_Bump.jpg",
            id: "Moon_Bump"
        }, {
            src: IMAGES_FOLDER+"textures/Moon_Diffuse.jpg",
            id: "Moon_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Neptune_Bump.jpg",
            id: "Neptune_Bump"
        }, {
            src: IMAGES_FOLDER+"textures/Neptune_Diffuse.jpg",
            id: "Neptune_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Pluto_Bump.jpg",
            id: "Pluto_Bump"
        }, {
            src: IMAGES_FOLDER+"textures/Pluto_Diffuse.jpg",
            id: "Pluto_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Pluto_Diffuse.png",
            id: "Pluto_Diffuse_png"
        }, {
            src: IMAGES_FOLDER+"textures/Saturn_Bump.jpg",
            id: "Saturn_Bump"
        }, {
            src: IMAGES_FOLDER+"textures/Saturn_Diffuse.jpg",
            id: "Saturn_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Sun_Diffuse.jpg",
            id: "Sun_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Uranus_Bump.jpg",
            id: "Uranus_Bump"
        }, {
            src: IMAGES_FOLDER+"textures/Uranus_Diffuse.jpg",
            id: "Uranus_Diffuse"
        }, {
            src: IMAGES_FOLDER+"textures/Venus_Bump.jpg",
            id: "Earth_Spec"
        }, {
            src: IMAGES_FOLDER+"textures/Venus_Diffuse.jpg",
            id: "Earth_Spec"
        }, {
            src: IMAGES_FOLDER+"textures/Uranus_Ring.png",
            id: "Uranus_Ring"
        }, {
            src: IMAGES_FOLDER+"textures/Saturn_Ring.png",
            id: "Saturn_Ring"
        }, {
            src: IMAGES_FOLDER+"textures/Saturn_Ring2.png",
            id: "Saturn_Ring2"
        }, {
            src: IMAGES_FOLDER+"flares/lensflare0.png",
            id: "lensflare0"
        }, {
            src: IMAGES_FOLDER+"flares/lensflare1.png",
            id: "lensflare1"
        }, {
            src: IMAGES_FOLDER+"flares/lensflare2.png",
            id: "lensflare2"
        }, {
            src: IMAGES_FOLDER+"textures/skydome.jpg",
            id: "skydome"
        }];
        //preloader.getResult("tree")

        preloader = new createjs.LoadQueue(false);
        $('#carga_t').text('Loading Universe...');
        preloader.addEventListener("complete", this.completePreload);
        preloader.addEventListener("progress", this.progressPreload);
        preloader.loadManifest(manifest);
    }
    this.progressPreload = function(e){
        var valor = Math.round(e.loaded *100)+"%";
        $('#carga').text(valor);
        $('#pre_line').css( "width", valor);
    }

    this.completePreload = function() {
        $('#carga_t').text('Universe Loaded!');
        $('#start').click(function(){
            document.getElementById("loader").style.display = "none";
            astro.launch();
        })
        $('#start').css( "display", "block");
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }


    function onMouseMove(event) {
        sistemaSolar.mousex = (event.clientX / window.innerWidth) * 2 - 1;
        sistemaSolar.mousey = -(event.clientY / window.innerHeight) * 2 + 1;
    }


    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }

    function render() {
        var delta = clock.getDelta();
        sistemaSolar.Tick(delta, mouse);
        renderer.render(scene, camera);
    }
    this.launch = function() {
        Planets = [
            //{ name: "Sun", radius: 40 * PLANETSCALE, orbit: 01, rotation: 0.0005, translation: 0.084, phi: 0.600, threeObject: null, inclination: 0, type: "sun", bumpScale: 0, parent: -1 },
            {
                name: "Sun",
                radius: 40 * PLANETSCALE,
                orbit: 01,
                rotation: 0.0005,
                translation: 0.084,
                phi: 0.600,
                threeObject: null,
                inclination: 0,
                type: "basic",
                bumpScale: 0,
                parent: -1
            }, {
                name: "Mercury",
                radius: 5 * PLANETSCALE,
                orbit: 400,
                rotation: 0.0015,
                translation: 0.2,
                phi: 0.7,
                threeObject: null,
                inclination: 177.36,
                type: "phong",
                bumpScale: 0.5,
                parent: 0
            }, {
                name: "Venus",
                radius: 10 * PLANETSCALE,
                orbit: 600,
                rotation: 0.0017,
                translation: 0.12,
                phi: 0.3,
                threeObject: null,
                inclination: 23.45,
                type: "phong",
                bumpScale: 0.3,
                parent: 0
            }, {
                name: "Earth",
                radius: 10 * PLANETSCALE,
                orbit: 1000,
                rotation: 0.0012,
                translation: 0.09,
                phi: 0.8,
                threeObject: null,
                inclination: 25.19,
                type: "spec",
                bumpScale: 0.5,
                parent: 0
            }, {
                name: "Mars",
                radius: 10 * PLANETSCALE,
                orbit: 1400,
                rotation: 0.0019,
                translation: 0.06,
                phi: 0.2,
                threeObject: null,
                inclination: 25.19,
                type: "phong",
                bumpScale: 0.2,
                parent: 0
            }, {
                name: "Jupiter",
                radius: 30 * PLANETSCALE,
                orbit: 1800,
                rotation: 0.0017,
                translation: 0.036,
                phi: 0.9,
                threeObject: null,
                inclination: 3.13,
                type: "phong",
                bumpScale: 0.5,
                parent: 0
            }, {
                name: "Saturn",
                radius: 25 * PLANETSCALE,
                orbit: 2400,
                rotation: 0.0016,
                translation: 0.018,
                phi: 0.5,
                threeObject: null,
                inclination: 25.33,
                type: "phong",
                bumpScale: 0.5,
                parent: 0
            }, {
                name: "Uranus",
                radius: 20 * PLANETSCALE,
                orbit: 2800,
                rotation: 0.0021,
                translation: 0.01,
                phi: 0.6,
                threeObject: null,
                inclination: 97.86,
                type: "phong",
                bumpScale: 0.5,
                parent: 0
            }, {
                name: "Neptune",
                radius: 20 * PLANETSCALE,
                orbit: 3200,
                rotation: 0.0025,
                translation: 0.005,
                phi: 0.1,
                threeObject: null,
                inclination: 28.31,
                type: "phong",
                bumpScale: 0.5,
                parent: 0
            }, {
                name: "Pluto",
                radius: 5 * PLANETSCALE,
                orbit: 3600,
                rotation: 0.0007,
                translation: 0.003,
                phi: 0.4,
                threeObject: null,
                inclination: 122.72,
                type: "phong",
                bumpScale: 0.8,
                parent: 0
            }, {
                name: "Moon",
                radius: 5 * PLANETSCALE,
                orbit: 200,
                rotation: 0.0007,
                translation: 0.3,
                phi: 0.4,
                threeObject: null,
                inclination: 0.72,
                type: "phong",
                bumpScale: 0.8,
                parent: 3
            } //,
            //    { name: "Sun", radius: 50 * scale, orbit: 5000, rotation: 0.007, translation: 0.007, phi: 0.4, threeObject: null, inclination: 122.72, type: "shader", bumpScale: 0.8 }
        ];

        // informacion de los signos zodiacales
        ZODIAC_SIGNS = [{
            name: 'SolarSystem',
            constelation: "constelacion.png",
            planet: -1,
            astroGirl: "",
            astroBoy: ""
        }, {
            name: 'Aries',
            constelation: "constelacion.png",
            planet: 4,
            astroGirl: "F_Aries.json",
            astroBoy: "M_Aries.json"
        }, {
            name: 'Tauro',
            constelation: "constelacion.png",
            planet: 2,
            astroGirl: "F_Tauro.json",
            astroBoy: "M_Tauro.json"
        }, {
            name: 'Gemini',
            constelation: "constelacion.png",
            planet: 1,
            astroGirl: "F_Geminis.json",
            astroBoy: "M_Geminis.json"
        }, {
            name: 'Cancer',
            constelation: "constelacion.png",
            planet: 10,
            astroGirl: "F_Cancer.json",
            astroBoy: "M_Cancer.json"
        }, {
            name: 'Leo',
            constelation: "constelacion.png",
            planet: 0,
            astroGirl: "F_Leo.json",
            astroBoy: "M_Leo.json"
        }, {
            name: 'Virgo',
            constelation: "constelacion.png",
            planet: 1,
            astroGirl: "F_Virgo.json",
            astroBoy: "M_Virgo.json"
        }, {
            name: 'Libra',
            constelation: "constelacion.png",
            planet: 2,
            astroGirl: "F_Libra.json",
            astroBoy: "M_Libra.json"
        }, {
            name: 'Scorpio',
            constelation: "constelacion.png",
            planet: 9,
            astroGirl: "F_Escorpion.json",
            astroBoy: "M_Escorpion.json"
        }, {
            name: 'Sagitario',
            constelation: "constelacion.png",
            planet: 5,
            astroGirl: "F_Sagitario.json",
            astroBoy: "M_Sagitario.json"
        }, {
            name: 'Capricornio',
            constelation: "constelacion.png",
            planet: 6,
            astroGirl: "F_Capricornio.json",
            astroBoy: "M_Capricornio.json"
        }, {
            name: 'Acuario',
            constelation: "constelacion.png",
            planet: 7,
            astroGirl: "F_Acuario.json",
            astroBoy: "M_Acuario.json"
        }, {
            name: 'Piscis',
            constelation: "constelacion.png",
            planet: 4,
            astroGirl: "F_Piscis.json",
            astroBoy: "M_Piscis.json"
        }, ];

        // informacion de los objetos a cargar para cada planeta
        Gods = [
            'Jupiter.json', //0
            'Neptune.json', //1
            'Saturn.json', //2
            'M_Tauro.json', //3
            'Neptune.json', //4
            'Jupiter.json', //5
            'Saturn.json', //6
            'Uranus.json', //7
            'Neptune.json', //8
            'Uranus.json', //9
            'Jupiter.json', //10
        ];

        // configuracion de la capa de estrellas (numero, color, tamano)
        starLayer = [
            //[10000, 0xffffff, 75.5],
            //[20000, 0xcccccc, 25.5],
            //[20000, 0x6666cc, 25.5],
            //[20000, 0xcc6666, 50.1]
            [5000, 0xffffff, 75.5],
            [10000, 0xcccccc, 25.5],
            [10000, 0x6666cc, 25.5],
            [10000, 0xcc6666, 50.1]
        ];


        container = document.getElementById('container');
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2 * (FINAL_SKYDOME_RADIUS + FINAL_SKYDOME_OFFSET));
        camera.position.x = INITIAL_CAMERA_POSITION_X;
        camera.position.y = INITIAL_CAMERA_POSITION_Y;
        camera.position.z = INITIAL_CAMERA_POSITION_Z;

        scene = new THREE.Scene();
        //scene.fog = new THREE.Fog(0x59472b, 1000, 3000);
        scene.add(camera);

        var sunLight = new THREE.PointLight(new THREE.Color(0xffffff), 1.0, FINAL_SKYDOME_RADIUS, 2);
        sunLight.position.set(0, 0, 0);

        sunLight.castShadow = false;
        scene.add(sunLight);

        
        //loadEvents();

        this.initEngine();
        //this.togglePlayPause();
    }
    this.initEngine = function() {

        clock = new THREE.Clock();
        sistemaSolar = new SolarSystem();
        //var gui = new dat.GUI();
        mouse = new THREE.Vector2();

        // RENDERER
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        //renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = false;
        //renderer.shadowMap.type = THREE.BasicShadowMap;
        renderer.shadowMap.cullFace = THREE.CullFaceBack;

        // options passed gui
        var options = {
            selected: -1,
            //seguimiento: false,
            //zoom: 600,
            //phi: 0
        };

        //gui.add(options, "selected", -1, 10, 1).onFinishChange(function (value) {
        // Fires when a controller loses focus.
        //alert("The new value is " + value);
        //    sistemaSolar.changeSelected(value);
        //});

        sistemaSolar.InitObjects(renderer, scene, camera, options);

        // STATS
        stats = new Stats();
        container.appendChild(stats.domElement);
        // EVENTS
        window.addEventListener('resize', this.onWindowResize, false);
        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('touchmove', this.onMouseMove, false);

        animate()

    }

    var Planet = function(variablePlanet) {
        this.nombre = variablePlanet.name;
        this.radio = variablePlanet.radius;
        this.tipo = variablePlanet.type;
        this.bumpScale = variablePlanet.bumpScale;
        this.orbita = variablePlanet.orbit;
        this.phi = variablePlanet.phi * 2 * Math.PI;
        this.mesh = null;
        this.inclination = Math.PI * variablePlanet.inclination / 180;
        this.inclinationVector = new THREE.Vector3(0, 1, 0);
        this.rotacion = variablePlanet.rotation;
        this.traslacion = variablePlanet.translation;
        this.t = 0.0;
        this.update = null;
        this.parent = variablePlanet.parent;
        this.CrearMesh = function() {

            //PLANETA
            var geometry = new THREE.SphereBufferGeometry(this.radio, SPHERE_RESOLUTION, SPHERE_RESOLUTION / 2);
            var texture = new THREE.TextureLoader().load(IMAGES_FOLDER +"textures/"+ this.nombre + '_Diffuse.jpg');
            //var texture = new THREE.TextureLoader().load(preloader.getResult(this.nombre + '_Diffuse'));
            if (this.tipo == "phong") {
                var bmap = new THREE.TextureLoader().load(IMAGES_FOLDER +"textures/"+ this.nombre + '_Bump.jpg');
                //var bmap = new THREE.TextureLoader().load(preloader.getResult(this.nombre + '_Bump'));
                var material = new THREE.MeshPhongMaterial({
                    map: texture,
                    bumpMap: bmap,
                    bumpScale: this.bumpScale,
                    shininess: 10,
                    shading: THREE.SmoothShading
                });
                this.mesh = new THREE.Mesh(geometry, material);
            } else if (this.tipo == "lambert") {
                var bmap = new THREE.TextureLoader().load(IMAGES_FOLDER +"textures/"+ this.nombre + '_Bump.jpg');
                //var bmap = new THREE.TextureLoader().load(preloader.getResult(this.nombre + '_Bump'));
                var material = new THREE.MeshLambertMaterial({
                    map: texture
                });
                this.mesh = new THREE.Mesh(geometry, material);
            } else if (this.tipo == "spec") {
                var bmap = new THREE.TextureLoader().load(IMAGES_FOLDER +"textures/"+ this.nombre + '_Bump.jpg');
                var specular = new THREE.TextureLoader().load(IMAGES_FOLDER +"textures/"+ this.nombre + '_Spec.jpg');
                //var bmap = new THREE.TextureLoader().load(preloader.getResult(this.nombre + '_Bump'));
                //var specular = new THREE.TextureLoader().load(preloader.getResult(this.nombre + '_Spec'));
                var material = new THREE.MeshPhongMaterial({
                    map: texture,
                    bumpMap: bmap,
                    specularMap: specular,
                    shading: THREE.SmoothShading
                });
                this.mesh = new THREE.Mesh(geometry, material);
            } else if (this.tipo == "basic") {
                var material = new THREE.MeshBasicMaterial({
                    map: texture
                });
                this.mesh = new THREE.Mesh(geometry, material);
            } else if (this.tipo == "sun") {
                this.mesh = new THREE.Mesh(geometry, new THREE.SunMaterial({}));
                this.update = function(value) {
                    this.mesh.material.uniforms.time.value = value;
                }
            }
            this.mesh.position.x = 0;
            this.mesh.position.z = this.orbita;
            this.mesh.position.y = 0;
            this.mesh.rotation.z = this.inclination;
            return this.mesh;
        }
        this.Tick = function(delta) {
            this.t += delta;
            this.mesh.rotateOnAxis(this.inclinationVector, this.rotacion * 60 * delta);
            var xOffset = (Planets[this.parent] && Planets[this.parent].threeObject.mesh.position.x) || 0;
            var zOffset = (Planets[this.parent] && Planets[this.parent].threeObject.mesh.position.z) || 0;
            this.mesh.position.x = xOffset + this.orbita * Math.sin(this.traslacion * this.t + this.phi);
            this.mesh.position.z = zOffset + this.orbita * Math.cos(this.traslacion * this.t + this.phi);
            this.mesh.position.y = 0; //ACTUALIZAR ELEVACION EN MODO SEGUIMIENTO
            if (this.update != null)
                this.update(this.t);
        }
    }

    // ANADIR SHADERS
    // ANADIR ORBITAS
    // ANADIR ANGULO PARA EL MODO SEGUIMIENTO
    // CAMARA LEJANA
    // ORBITAS OCULTAS EN MODO SEGUIMIENTO
    // SOL SHADER
    // ESTRELLAS

    // SELECCIONAR PERSONAJE ENCIMA DEL PLANETA
    //      CLICK A UN GLIFO
    //      MOSTRAR CONSTELACION
    // UBICAR CAMARA SIGUIENDO AL PLANETA

    // MODIFICAR TRASLACION DE PLANETAS PARA QUE SE VEA MAS DINAMICO
    // SUBIR PLANETA EN MODO SEGUIMIENTO NINO
    // MODIFICAR PARTICULAR PARA DARLE MAS DINAMISMO EN LA TRANSICION DIOS NINO



    var SolarSystem = function() {
        this.skydome = null;
        this.freecamera = null;
        this.scene = null;
        this.controls = null;
        this.options = null;
        this.glowPlanet = null;
        this.planetOrbits = new Array(Planets.length);
        this.astroKid = null;
        this.hemiLight = null;
        this.localZoom = 0;
        this.mousex = 0;
        this.mousey = 0;
        this.animating = false;
        this.particleGroup = null;
        this.PlanetsCreate = function(scene) {
            for (index = 0; index < Planets.length; index++) {
                var planet = Planets[index];
                planet.threeObject = new Planet(planet);
                scene.add(planet.threeObject.CrearMesh());

                //ORBITA
                if (Planets[index].orbit > 0) {
                    var orbitaCirculo = new THREE.Mesh(new THREE.TorusGeometry(Planets[index].orbit, 0.6, 6, 128), new THREE.MeshBasicMaterial({
                        color: 0xcccccc,
                        transparent: true,
                        opacity: 0.4
                    }));
                    orbitaCirculo.rotation.x = Math.PI / 2
                    this.planetOrbits[index] = orbitaCirculo;
                    scene.add(orbitaCirculo)
                }


            }

        }

        this.Tick = function(delta, mouse) {
            for (index = 0; index < Planets.length; index++) {
                Planets[index].threeObject.Tick(delta);
            }
            if (this.particleGroup)
                this.particleGroup.tick(delta);
            this.MoveCamera(mouse, delta);
        }

        this.InitObjects = function(renderer, scene, camera, options) {
            this.scene = scene;
            this.freecamera = new FreeCamera();
            this.freecamera.setCamera(camera);
            //this.options = options;
            this.intSelected = -1;
            this.renderer = renderer;
            this.raycaster = new THREE.Raycaster();
            this.prevSelected = -1;

            // LIGHTS
            this.hemiLight = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_DIM);
            scene.add(this.hemiLight);


            this.PlanetsCreate(this.scene);
            this.CreateSkydome(this.scene);
            //this.addLensFlare(this.scene);
            this.controls = new THREE.OrbitControls(this.freecamera.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 1.25;
            this.controls.enableZoom = true;

            var mesh = new THREE.Mesh(
                new THREE.XRingGeometry(1.2 * Planets[6].radius, 2 * Planets[6].radius, 2 * 20, 5, 0, Math.PI * 2),
                new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(IMAGES_FOLDER + 'textures/Saturn_Ring2.png'),
                    //map: new THREE.TextureLoader().load(preloader.getResult('Saturn_Ring2')),
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.8
                })
            );


            Planets[6].threeObject.mesh.add(mesh);

            // SUN GLOW
            var customMaterial = new THREE.GlowMaterial({
                //glowColor: new THREE.Vector3(0.8, 0.6, 0.4)
                //glowColor: new THREE.Vector3(0.95, 0.95, 0.5)
                glowColor: new THREE.Vector3(0.95, 0.50, 0.1)
            });
            //4347-160002145518
            var ballGeometry = new THREE.SphereGeometry(Planets[0].threeObject.radio * 1.3, SPHERE_RESOLUTION, SPHERE_RESOLUTION);
            var ball = new THREE.Mesh(ballGeometry, customMaterial);
            Planets[0].threeObject.mesh.add(ball);
        }

        this.CreateSkydome = function(scene) {
            var skydomeRadiusMax = FINAL_SKYDOME_RADIUS;
            var skydomeRadiusMin = INITIAL_SKYDOME_RADIUS;
            var skyGeo = new THREE.SphereBufferGeometry(skydomeRadiusMax + FINAL_SKYDOME_OFFSET, 8, 8);
            var texture = new THREE.TextureLoader().load(IMAGES_FOLDER + 'textures/skydome.jpg');
            //var texture = new THREE.TextureLoader().load(preloader.getResult('skydome'));
            var material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.BackSide
            });
            this.skydome = new THREE.Mesh(skyGeo, material);
            scene.add(this.skydome);

            // create the particle variables
            for (var sl = 0; sl < starLayer.length; sl++) {
                var particleCount = starLayer[sl][0],
                    particles = new THREE.Geometry(),
                    pMaterial = new THREE.PointsMaterial({
                        color: starLayer[sl][1],
                        size: starLayer[sl][2],
                        sizeAttenuation: true
                    });

                // now create the individual particles
                for (var p = 0; p < particleCount; p++) {
                    var phi = (1 * Math.random() - 1) * 2 * Math.PI;
                    var skydomeRadius = (Math.random() * (skydomeRadiusMax - skydomeRadiusMin)) + skydomeRadiusMin;
                    var el = Math.asin(2 * (Math.random() - 0.5));
                    var pX = skydomeRadius * Math.sin(phi) * Math.cos(el),
                        pY = skydomeRadius * Math.sin(el),
                        pZ = skydomeRadius * Math.cos(phi) * Math.cos(el),
                        particle = new THREE.Vector3(pX, pY, pZ);
                    particles.vertices.push(particle);
                }

                // create the particle system
                var particleSystem = new THREE.Points(
                    particles,
                    pMaterial);

                // add it to the scene
                scene.add(particleSystem);
            }
        }

        this.changeSelected = function(value) {
            var intPrevSelected = Math.round(this.prevSelected);
            this.intSelected = Math.round(value);
            if (intPrevSelected != this.intSelected) {

                if (intPrevSelected >= 0 && this.glowPlanet != null) {
                    Planets[intPrevSelected].threeObject.mesh.remove(this.glowPlanet);
                }
                if (intPrevSelected >= 0 && this.planetOrbits[intPrevSelected] != null) {
                    this.scene.add(this.planetOrbits[intPrevSelected]);
                }

                // OBJECTS RESET
                if (this.astroKid != null) {
                    this.scene.remove(this.astroKid);
                    this.astroKid = null;
                }
                if (this.particleGroup != null) {
                    this.scene.remove(this.particleGroup.mesh);
                    this.particleGroup = null;
                }

                var activePlanet = Planets[this.intSelected];
                if (this.intSelected >= 0) {
                    this.controls.target = activePlanet.threeObject.mesh.position;


                    if (this.planetOrbits[this.intSelected] != null) {
                        this.scene.remove(this.planetOrbits[this.intSelected]);
                    }
                    //GLOW
                    var customMaterial = new THREE.GlowMaterial({
                        glowColor: new THREE.Vector3(1.0, 1.0, 1.0)
                    });

                    var ballGeometry = new THREE.SphereBufferGeometry(activePlanet.threeObject.radio * GLOW_SCALE, SPHERE_RESOLUTION, SPHERE_RESOLUTION / 2);
                    var ball = new THREE.Mesh(ballGeometry, customMaterial);
                    activePlanet.threeObject.mesh.add(ball);
                    this.glowPlanet = ball;

                    //ASTROKID
                    var localObject = this;
                    this.astroKid = this.createObject(MODELS_FOLDER + Gods[this.intSelected]);
                    //var astroKidScale = activePlanet.radius / Planets[1].radius;
                    //this.astroKid.scale.set(astroKidScale, astroKidScale, astroKidScale);
                    //this.scene.add(this.astroKid);
                    this.localZoom = (PLANET_VIEW_ZOOM * activePlanet.radius); // / Planets[3].radius;


                    // CAMERA DIRECTOR
                    this.freecamera.purge();
                    //this.freecamera.setWayPoint({
                    //    x: this.freecamera.camera.position.x,
                    //    y: 1000,
                    //    z: this.freecamera.camera.position.z,
                    //    acceleration: 1,
                    //    time: PLANET_VIEW_TRANSITION_TIME / 3.0,
                    //    lookAtMode: 'S',
                    //    //zeroPointObject: activePlanet.threeObject.mesh.position,
                    //    //referenceObject: { x: 0, y: 0, z: 0 }
                    //});
                    //this.freecamera.setWayPoint({
                    //    x: -activePlanet.threeObject.mesh.position.x + this.freecamera.camera.position.x,
                    //    y: -activePlanet.threeObject.mesh.position.y + 1000,
                    //    z: -activePlanet.threeObject.mesh.position.z + this.freecamera.camera.position.z,
                    //    acceleration: 1,
                    //    time: PLANET_VIEW_TRANSITION_TIME / 3.0,
                    //    zeroPointObject: activePlanet.threeObject.mesh.position,
                    //    referenceObject: { x: -100000, y: 0, z: 0 }
                    //});


                    // SCRIPT TRANSICION A MODO DIOS
                    if (this.intSelected != 3) {
                        this.freecamera.setWayPoint({
                            x: this.freecamera.camera.position.x,
                            y: 1000,
                            z: this.freecamera.camera.position.z,
                            acceleration: 1,
                            time: PLANET_VIEW_TRANSITION_TIME / 3.0,
                            //zeroPointObject: activePlanet.threeObject.mesh.position,
                            referenceObject: {
                                x: -100000,
                                y: 0,
                                z: 0
                            },
                            lookAtMode: 'O',
                            lookAtObject: activePlanet.threeObject.mesh.position
                        });

                        this.freecamera.setWayPoint({
                            x: 0,
                            y: 1000,
                            z: 0,
                            acceleration: 1,
                            time: PLANET_VIEW_TRANSITION_TIME / 3.0,
                            //zeroPointObject: activePlanet.threeObject.mesh.position,
                            referenceObject: {
                                x: -100000,
                                y: 0,
                                z: 0
                            },
                            lookAtMode: 'O',
                            lookAtObject: activePlanet.threeObject.mesh.position
                        });

                        this.freecamera.setWayPoint({
                            x: 0 * this.localZoom,
                            y: 0,
                            z: 1 * this.localZoom,
                            acceleration: PLANET_VIEW_CAMERA_ACCELERATION,
                            time: PLANET_VIEW_TRANSITION_TIME / 1.0,
                            zeroPointObject: activePlanet.threeObject.mesh.position,
                            referenceObject: {
                                x: 0,
                                y: 0,
                                z: 0
                            },
                            completeCallback: function() {

                                //var astroKidScale = activePlanet.radius / Planets[1].radius;
                                var astroKidScale = activePlanet.radius * GOD_SCALE;

                                //localObject.particleGroup = ParticleExamples.Sparkles({ scale: activePlanet.radius * SPARKLES_SCALE });
                                //localObject.scene.add(localObject.particleGroup.mesh);


                                localObject.astroKid.scale.set(astroKidScale, astroKidScale, astroKidScale);
                                localObject.scene.add(localObject.astroKid);
                                if (localObject.intSelected != 3) {
                                    var genderButtons = document.getElementById('gender');
                                    genderButtons.style.visibility = 'visible';
                                }
                            }
                        });

                        this.freecamera.setWayPoint({
                            x: 0 * this.localZoom,
                            y: activePlanet.radius * PLANET_VIEW_ELEVATION,
                            z: 0.4 * this.localZoom,
                            acceleration: PLANET_VIEW_CAMERA_ACCELERATION,
                            time: PLANET_VIEW_TRANSITION_TIME / 3.0,
                            zeroPointObject: activePlanet.threeObject.mesh.position,
                            referenceObject: {
                                x: 0,
                                y: 0,
                                z: 0
                            },
                            lookAtMode: 'XZ'
                        });
                    } else
                    //SCRIPT TRANSICION MODO NINO
                    {

                        this.particleGroup = ParticleExamples.Sparkles({
                            scale: activePlanet.radius * SPARKLES_SCALE
                        });
                        this.scene.add(this.particleGroup.mesh);

                        var astroKidScale = activePlanet.radius * GOD_SCALE;
                        this.astroKid.scale.set(astroKidScale, astroKidScale, astroKidScale);


                        this.freecamera.setWayPoint({
                            x: 0 * this.localZoom,
                            y: activePlanet.radius,
                            z: 0.4 * this.localZoom,
                            acceleration: PLANET_VIEW_CAMERA_ACCELERATION,
                            time: PLANET_VIEW_TRANSITION_TIME,
                            zeroPointObject: activePlanet.threeObject.mesh.position,
                            referenceObject: {
                                x: 0,
                                y: 0,
                                z: 0
                            },
                            lookAtMode: 'O',
                            lookAtObject: this.astroKid.position,
                        });

                        this.freecamera.setWayPoint({
                            x: 0 * this.localZoom,
                            y: activePlanet.radius * PLANET_VIEW_ELEVATION,
                            z: 0.4 * this.localZoom,
                            acceleration: PLANET_VIEW_CAMERA_ACCELERATION,
                            time: PLANET_VIEW_TRANSITION_TIME,
                            zeroPointObject: activePlanet.threeObject.mesh.position,
                            referenceObject: {
                                x: 0,
                                y: 0,
                                z: 0
                            },
                            lookAtMode: 'XZ',
                            lookAtObject: this.astroKid.position,
                            completeCallback: function() {


                                //var astroKidScale = activePlanet.radius / Planets[1].radius;
                                var astroKidScale = activePlanet.radius * GOD_SCALE;

                                //localObject.particleGroup = ParticleExamples.Sparkles({ scale: activePlanet.radius * SPARKLES_SCALE });
                                //localObject.scene.add(localObject.particleGroup.mesh);
                                localObject.particleGroup.mesh.material.transparent = true;
                                createjs.Tween.get(localObject.particleGroup.mesh.material, {
                                        override: true
                                    })
                                    .to({
                                        opacity: 1.0
                                    }, 100)
                                    .to({
                                        opacity: 0.5
                                    }, 100)
                                    .to({
                                        opacity: 0.0
                                    }, 5000)
                                    .call(function() {
                                        if (localObject.particleGroup) {
                                            localObject.scene.remove(localObject.particleGroup.mesh);
                                            localObject.particleGroup = null;
                                        }
                                        localObject.scene.add(localObject.astroKid);
                                    });
                            }
                        });
                    }

                    //this.freecamera.setWayPoint({
                    //    x: 0 * this.localZoom,
                    //    y: activePlanet.radius * PLANET_VIEW_ELEVATION,
                    //    z: -1 * this.localZoom,
                    //    acceleration: 1,
                    //    time: -1,
                    //    zeroPointObject: this.astroKid.position,
                    //    referenceObject: { x: 0, y: 0, z: 0 },
                    //    lookAtMode: 'XZ'
                    //});
                    this.hemiLight.intensity = AMBIENT_LIGHT_FULL;

                } else {
                    this.freecamera.purge();
                    this.controls.target = Planets[0].threeObject.mesh.position;
                    //if (this.astroKid != null)
                    //    this.scene.remove(this.astroKid);
                    this.freecamera.setPosition(INITIAL_CAMERA_POSITION_X, INITIAL_CAMERA_POSITION_Y, INITIAL_CAMERA_POSITION_Z);
                    this.hemiLight.intensity = AMBIENT_LIGHT_DIM;
                    //this.freecamera.setWayPoint({
                    //    x: INITIAL_CAMERA_POSITION_X,
                    //    y: INITIAL_CAMERA_POSITION_Y,
                    //    z: INITIAL_CAMERA_POSITION_Z,
                    //    acceleration: PLANET_VIEW_CAMERA_ACCELERATION,
                    //    time: PLANET_VIEW_TRANSITION_TIME,
                    //    zeroPointObject: { x: 0, y: 0, z: 0 },
                    //    referenceObject: { x: 0, y: 0, z: 0 }
                    //});
                    //this.camera.position.x = INITIAL_CAMERA_POSITION_X;
                    //this.camera.position.y = INITIAL_CAMERA_POSITION_Y;
                    //this.camera.position.z = INITIAL_CAMERA_POSITION_Z;
                }
                this.prevSelected = this.intSelected;

            }


        }

        this.MoveCamera = function(mouse, delta) {
            if (this.intSelected >= 0) {

                var activePlanet = Planets[this.intSelected];
                var localOrbit = 1.0 * activePlanet.threeObject.mesh.position.x * activePlanet.threeObject.mesh.position.x + 1.0 * activePlanet.threeObject.mesh.position.z * activePlanet.threeObject.mesh.position.z;
                var dx = activePlanet.threeObject.mesh.position.x / Math.sqrt(localOrbit);
                var dz = activePlanet.threeObject.mesh.position.z / Math.sqrt(localOrbit);



                this.freecamera.Tick(delta);


                if (this.astroKid) {
                    this.astroKid.position.z = activePlanet.threeObject.mesh.position.z;
                    this.astroKid.position.x = activePlanet.threeObject.mesh.position.x;
                    this.astroKid.position.y = activePlanet.threeObject.mesh.position.y + activePlanet.radius * GOD_POSITION_OFFSET_Y;

                    this.astroKid.lookAt(new THREE.Vector3(
                        this.freecamera.camera.position.x + (dx * activePlanet.radius) * GOD_TURN_INTENSITY * this.mousex,
                        this.freecamera.camera.position.y - activePlanet.radius * GOD_INCLINATION,
                        this.freecamera.camera.position.z + (dz * activePlanet.radius) * GOD_TURN_INTENSITY * this.mousex));
                }

                if (this.particleGroup) {
                    //console.warn("completado fase 1: ");
                    //this.particleGroup.mesh.position.x = this.freecamera.camera.position.x - (this.freecamera.camera.position.x - this.astroKid.position.x) / 5.0;
                    //this.particleGroup.mesh.position.y = this.freecamera.camera.position.y - (this.freecamera.camera.position.y - this.astroKid.position.y) / 5.0;
                    //this.particleGroup.mesh.position.z = this.freecamera.camera.position.z - (this.freecamera.camera.position.z - this.astroKid.position.z) / 5.0;
                    //console.warn("completado fase 1: ");
                    var heading = new THREE.Vector3().subVectors(this.freecamera.camera.position, this.astroKid.position).normalize();

                    this.particleGroup.mesh.position.x = this.freecamera.camera.position.x - SPARKLES_DISTANCE * heading.x;
                    this.particleGroup.mesh.position.y = this.freecamera.camera.position.y - SPARKLES_DISTANCE * heading.y;
                    this.particleGroup.mesh.position.z = this.freecamera.camera.position.z - SPARKLES_DISTANCE * heading.z;
                }
            } else {
                this.controls.update();
                //this.freecamera.Tick(delta);
            }


            if (this.freecamera.camera.position.length() > MAX_CAMERA_DISTANCE) {
                this.freecamera.camera.position.setLength(MAX_CAMERA_DISTANCE)
            }

        }


        // return a mesh from an obj file   
        this.createObject = function(objFile) {
            var container = new THREE.Object3D();
            var loader = new THREE.ObjectLoader();
            //var loader = new THREE.ColladaLoader();

            loader.load(objFile, function(object) {
                //object.name = objName;
                container.add(object);
            });
            return container;
        }

        this.addLensFlare = function(scene) {
            // lens flares
            var textureLoader = new THREE.TextureLoader();
            var textureFlare0 = textureLoader.load("Images/flares/lensflare0.png");
            var textureFlare2 = textureLoader.load("Images/flares/lensflare2.png");
            var textureFlare3 = textureLoader.load("Images/flares/lensflare3.png");
            //addLight(0.55, 0.9, 0.5, 5000, 0, -1000);
            //addLight(0.08, 0.8, 0.5, 0, 0, -1000);
            //addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);
            addLight(0.995, 0.5, 0.9, 0, 0, 0);

            function addLight(h, s, l, x, y, z) {
                //var light = new THREE.PointLight(0xffffff, 1.5, 2000);
                //light.color.setHSL(h, s, l);
                //light.position.set(x, y, z);
                //scene.add(light);

                var flareColor = new THREE.Color(0xffffff);
                flareColor.setHSL(h, s, l + 0.5);
                //var lensFlare = new THREE.LensFlare(textureFlare2, 700, 0.0, THREE.AdditiveBlending, flareColor);
                var lensFlare = new THREE.LensFlare(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
                lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
                lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
                lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
                lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
                lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
                lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);
                lensFlare.customUpdateCallback = this.lensFlareUpdateCallback;
                lensFlare.position.x = x;
                lensFlare.position.y = y;
                lensFlare.position.z = z;
                lensFlare.size = 16000;
                scene.add(lensFlare);
            }
        }

        this.lensFlareUpdateCallback = function(object) {
            var f, fl = object.lensFlares.length;
            var flare;
            var vecX = -object.positionScreen.x * 2;
            var vecY = -object.positionScreen.y * 2;
            for (f = 0; f < fl; f++) {
                flare = object.lensFlares[f];
                flare.x = object.positionScreen.x + vecX * flare.distance;
                flare.y = object.positionScreen.y + vecY * flare.distance;
                flare.rotation = 0;
            }
            object.lensFlares[2].y += 0.025;
            object.lensFlares[3].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad(45);
        }
    }

    this.showConstellation = function(src) {
        var constellationImage = document.getElementById('constellation-image');
        constellationImage.src = IMAGES_FOLDER + src;
        target = constellationImage.style;
        target.opacity = 0.0;
        createjs.Tween.get(target, {
            override: true
        }).to({
            opacity: 0.1
        }, 20).to({
            opacity: 1.0
        }, 1000);
    }

    this.hideConstellation = function() {
        var constellationImage = document.getElementById('constellation-image');
        target = constellationImage.style;
        target.opacity = 1.0;
        createjs.Tween.get(target, {
            override: true
        }).to({
            opacity: 0.9
        }, 20).to({
            opacity: 0.0
        }, 1000).call(
            function() {
                constellationImage.src = "";
            }
        );
    }

    this.showAstrokid = function(bg) {
        console.warn("call selected sign: " + selectedSign);
        if (bg == 'B')
            Gods[3] = ZODIAC_SIGNS[selectedSign].astroBoy;
        if (bg == 'G')
            Gods[3] = ZODIAC_SIGNS[selectedSign].astroGirl;
        sistemaSolar.changeSelected(3);
        document.getElementById('gender').style.visibility = 'hidden';

    }

    this.loadButtonEvents = function(object, index) {
        var signOptions = ZODIAC_SIGNS[index];
        object.addEventListener('click', function() {
            document.getElementById('gender').style.visibility = 'hidden';
            if (index === 0)
                $("#right-menu").fadeIn(1000, function() {
                    // Animation complete.
                });
            else
                $("#right-menu").fadeOut(2000, function() {
                    // Animation complete.
                });
            selectedSign = index;
            hideConstellation();
            sistemaSolar.changeSelected(signOptions.planet);
        }, false);
        object.addEventListener('mouseover', function() {
            showConstellation(signOptions.constelation);
        }, false);
        object.addEventListener('mouseout', function() {
            hideConstellation();
        }, false);
    }

    this.loadEvents = function() {
        loadButtonEvents(document.getElementById('back-button'), 0);
        loadButtonEvents(document.getElementById('aries-button'), 1);
        loadButtonEvents(document.getElementById('tauro-button'), 2);
        loadButtonEvents(document.getElementById('gemini-button'), 3);
        loadButtonEvents(document.getElementById('cancer-button'), 4);
        loadButtonEvents(document.getElementById('leo-button'), 5);
        loadButtonEvents(document.getElementById('virgo-button'), 6);
        loadButtonEvents(document.getElementById('libra-button'), 7);
        loadButtonEvents(document.getElementById('scorpio-button'), 8);
        loadButtonEvents(document.getElementById('sagitario-button'), 9);
        loadButtonEvents(document.getElementById('capricornio-button'), 10);
        loadButtonEvents(document.getElementById('acuario-button'), 11);
        loadButtonEvents(document.getElementById('piscis-button'), 12);
    }

}

window.onload = function(e) {
    var astro = new AstroKids();
    astro.init();

    window.astro = astro;
}