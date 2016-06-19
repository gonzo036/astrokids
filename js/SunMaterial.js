THREE.SunMaterial = function ( parameters ) {

    THREE.ShaderMaterial.call( this );

    this.sunTexture = new THREE.TextureLoader().load("Images/sun_surface.png");
    this.sunTexture.anisotropy = 1;
    this.sunTexture.wrapS = THREE.RepeatWrapping;
    this.sunTexture.wrapT = THREE.RepeatWrapping;

    this.blending = THREE.AdditiveBlending;

    this.uniforms= {
        "texturePrimary": { type: "t", value: this.sunTexture },
        "textureColor": { type: "t", value: new THREE.TextureLoader().load("Images/star_colorshift.png") },
        "textureSpectral": { type: "t", value: 0x0 },
        "time": { type: "f", value: 0 },
        "spectralLookup": { type: "f", value: 0 }
    };

    this.vertexShader= [
        "varying vec2 vUv;",
        "varying vec3 vNormal;",
        "void main() {",
        "    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "    vNormal = normalize( normalMatrix * normal );",
        "    vUv = uv;",
        "}"
    ].join("\n");

    this.fragmentShader= [

"            varying vec2 vUv;",
"            varying vec3 vNormal;",
"            uniform sampler2D texturePrimary;",
"            uniform sampler2D textureColor;",
"            uniform sampler2D textureSpectral;",
"            uniform float time;",
"            uniform float spectralLookup;",
"",
"            void main() {",
"            float uvMag = 2.0;",
"            float paletteSpeed = 0.2;",
"            float minLookup = 0.2;",
"            float maxLookup = 0.98;",
"",
"            //	let's double up on the texture to make the sun look more detailed",
"            vec2 uv = vUv * uvMag;",
"",
"            //	do a lookup for the texture now, but hold on to its gray value",
"            vec3 colorIndex = texture2D( texturePrimary, uv ).xyz;",
"            float lookupColor = colorIndex.x;",
"",
"            //	now cycle the value, and clamp it, we're going to use this for a second lookup",
"            lookupColor = fract( lookupColor - time * paletteSpeed );",
"            lookupColor = clamp(lookupColor, minLookup, maxLookup );",
"",
"            //	use the value found and find what color to use in a palette texture",
"            vec2 lookupUV = vec2( lookupColor, 0. );",
"            vec3 foundColor = texture2D( textureColor, lookupUV ).xyz;",
"",
"            //	now do some color grading",
"            foundColor.xyz *= 0.6;",
"            foundColor.x = pow(foundColor.x, 2.);",
"            foundColor.y = pow(foundColor.y, 2.);",
"            foundColor.z = pow(foundColor.z, 2.);",
"",
"            foundColor.xyz += vec3( 0.6, 0.6, 0.6 ) * 1.4;",
"            //foundColor.xyz += vec3(0.6,0.35,0.21) * 2.2;",
"",
"            float spectralLookupClamped = clamp( spectralLookup, 0., 1. );",
"            vec2 spectralLookupUV = vec2( 0., spectralLookupClamped );",
"            vec4 spectralColor = texture2D( textureSpectral, spectralLookupUV );",
"",
"            spectralColor.x = pow( spectralColor.x, 2. );",
"            spectralColor.y = pow( spectralColor.y, 2. );",
"            spectralColor.z = pow( spectralColor.z, 2. );",
"",
"            foundColor.xyz *= spectralColor.xyz;",
"",
"",
"            //	apply a secondary, subtractive pass to give it more detail",
"            //	first we get the uv and apply some warping",
"            vec2 uv2 = vec2( vUv.x + cos(time) * 0.001, vUv.y + sin(time/5.0) * 0.0500 );",
"            vec3 secondaryColor = texture2D( texturePrimary, uv2 ).xyz;",
"",
"            //	finally give it an outer rim to blow out the edges",
"            float intensity = 1.15 - dot( vNormal, vec3( 0.0, 0.0, 0.5 ) );",
"            vec3 outerGlow = vec3( 1.0, 0.8, 0.6 ) * pow( intensity, 6.0 );",
"",
"            vec3 desiredColor = foundColor + outerGlow - secondaryColor;",
"            float darkness = 4.0 - clamp( length( desiredColor ), 0., 1. );",
"            //vec3 colorCorrection = vec3(0.7, 0.4, 0.01) * pow(darkness,2.0) * secondaryColor;            ",
"            //vec3 colorCorrection = vec3(0.8, 0.6, 0.2) * pow(darkness,2.0) * secondaryColor;",
"            vec3 colorCorrection = vec3(0.95, 0.20, 0.10) * pow(darkness,2.0) * secondaryColor;",
"            //vec3 colorCorrection = vec3(0.95, 0.00, 0.00) * pow(darkness,2.0) * secondaryColor;",
"            desiredColor += colorCorrection;",
"",
"            //	the final composite color",
"            gl_FragColor = vec4( desiredColor, 1.0 );            ",
"            //gl_FragColor = vec4( 0.9,0.9,0.9, 1.0 );",
"",
"            }"

    ].join("\n")

};


THREE.SunMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.SunMaterial.prototype.constructor = THREE.SunMaterial;

//THREE.SunMaterial.prototype.copy = function (source) {

//    THREE.ShaderMaterial.prototype.copy.call(this, source);
//    return this;

//};