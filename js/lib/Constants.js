
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
var MODELS_FOLDER = 'Models/';
var IMAGES_FOLDER = 'Images/';

// escala de la esfera glow puesta sobre el planeta
var GLOW_SCALE = 1.05;

// luz ambiente en vista sistema solar
var AMBIENT_LIGHT_DIM = 0.2;

// luz ambiente en vista planeta
var AMBIENT_LIGHT_FULL = 1.0;

// informacion del comportamiento de los planetas/lunas
var Planets = [
    //{ name: "Sun", radius: 40 * PLANETSCALE, orbit: 01, rotation: 0.0005, translation: 0.084, phi: 0.600, threeObject: null, inclination: 0, type: "sun", bumpScale: 0, parent: -1 },
    { name: "Sun", radius: 40 * PLANETSCALE, orbit: 01, rotation: 0.0005, translation: 0.084, phi: 0.600, threeObject: null, inclination: 0, type: "basic", bumpScale: 0, parent: -1 },
    { name: "Mercury", radius: 5 * PLANETSCALE, orbit: 400, rotation: 0.0015, translation: 0.2, phi: 0.7, threeObject: null, inclination: 177.36, type: "phong", bumpScale: 0.5, parent: 0 },
    { name: "Venus", radius: 10 * PLANETSCALE, orbit: 600, rotation: 0.0017, translation: 0.12, phi: 0.3, threeObject: null, inclination: 23.45, type: "phong", bumpScale: 0.3, parent: 0 },
    { name: "Earth", radius: 10 * PLANETSCALE, orbit: 1000, rotation: 0.0012, translation: 0.09, phi: 0.8, threeObject: null, inclination: 25.19, type: "spec", bumpScale: 0.5, parent: 0 },
    { name: "Mars", radius: 10 * PLANETSCALE, orbit: 1400, rotation: 0.0019, translation: 0.06, phi: 0.2, threeObject: null, inclination: 25.19, type: "phong", bumpScale: 0.2, parent: 0 },
    { name: "Jupiter", radius: 30 * PLANETSCALE, orbit: 1800, rotation: 0.0017, translation: 0.036, phi: 0.9, threeObject: null, inclination: 3.13, type: "phong", bumpScale: 0.5, parent: 0 },
    { name: "Saturn", radius: 25 * PLANETSCALE, orbit: 2400, rotation: 0.0016, translation: 0.018, phi: 0.5, threeObject: null, inclination: 25.33, type: "phong", bumpScale: 0.5, parent: 0 },
    { name: "Uranus", radius: 20 * PLANETSCALE, orbit: 2800, rotation: 0.0021, translation: 0.01, phi: 0.6, threeObject: null, inclination: 97.86, type: "phong", bumpScale: 0.5, parent: 0 },
    { name: "Neptune", radius: 20 * PLANETSCALE, orbit: 3200, rotation: 0.0025, translation: 0.005, phi: 0.1, threeObject: null, inclination: 28.31, type: "phong", bumpScale: 0.5, parent: 0 },
    { name: "Pluto", radius: 5 * PLANETSCALE, orbit: 3600, rotation: 0.0007, translation: 0.003, phi: 0.4, threeObject: null, inclination: 122.72, type: "phong", bumpScale: 0.8, parent: 0 },
    { name: "Moon", radius: 5 * PLANETSCALE, orbit: 200, rotation: 0.0007, translation: 0.3, phi: 0.4, threeObject: null, inclination: 0.72, type: "phong", bumpScale: 0.8, parent: 3 }//,
//    { name: "Sun", radius: 50 * scale, orbit: 5000, rotation: 0.007, translation: 0.007, phi: 0.4, threeObject: null, inclination: 122.72, type: "shader", bumpScale: 0.8 }
];

// informacion de los signos zodiacales
ZODIAC_SIGNS = [
    { name: 'SolarSystem', constelation: "constelacion.png", planet: -1, astroGirl: "", astroBoy: "" },
    { name: 'Aries', constelation: "constelacion.png", planet: 4, astroGirl: "F_Aries.json", astroBoy: "M_Aries.json" },
    { name: 'Tauro', constelation: "constelacion.png", planet: 2, astroGirl: "F_Tauro.json", astroBoy: "M_Tauro.json" },
    { name: 'Gemini', constelation: "constelacion.png", planet: 1, astroGirl: "F_Geminis.json", astroBoy: "M_Geminis.json" },
    { name: 'Cancer', constelation: "constelacion.png", planet: 10, astroGirl: "F_Cancer.json", astroBoy: "M_Cancer.json" },
    { name: 'Leo', constelation: "constelacion.png", planet: 0, astroGirl: "F_Leo.json", astroBoy: "M_Leo.json" },
    { name: 'Virgo', constelation: "constelacion.png", planet: 1, astroGirl: "F_Virgo.json", astroBoy: "M_Virgo.json" },
    { name: 'Libra', constelation: "constelacion.png", planet: 2, astroGirl: "F_Libra.json", astroBoy: "M_Libra.json" },
    { name: 'Scorpio', constelation: "constelacion.png", planet: 9, astroGirl: "F_Escorpion.json", astroBoy: "M_Escorpion.json" },
    { name: 'Sagitario', constelation: "constelacion.png", planet: 5, astroGirl: "F_Sagitario.json", astroBoy: "M_Sagitario.json" },
    { name: 'Capricornio', constelation: "constelacion.png", planet: 6, astroGirl: "F_Capricornio.json", astroBoy: "M_Capricornio.json" },
    { name: 'Acuario', constelation: "constelacion.png", planet: 7, astroGirl: "F_Acuario.json", astroBoy: "M_Acuario.json" },
    { name: 'Piscis', constelation: "constelacion.png", planet: 4, astroGirl: "F_Piscis.json", astroBoy: "M_Piscis.json" },
]

// informacion de los objetos a cargar para cada planeta
var Gods = [
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
var starLayer = [
    //[10000, 0xffffff, 75.5],
    //[20000, 0xcccccc, 25.5],
    //[20000, 0x6666cc, 25.5],
    //[20000, 0xcc6666, 50.1]
    [5000, 0xffffff, 75.5],
    [10000, 0xcccccc, 25.5],
    [10000, 0x6666cc, 25.5],
    [10000, 0xcc6666, 50.1]
];