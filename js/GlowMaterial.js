THREE.GlowMaterial = function (parameters) {

    THREE.ShaderMaterial.call(this);
    this.glowColor = parameters.glowColor;
    //this.blending = THREE.AdditiveBlending;

    this.side = THREE.BackSide;
    //this.side = THREE.FrontSide;
    this.blending = THREE.AdditiveBlending;
    this.transparent = true;

    this.uniforms = {
        "glowColor": { type: "v3", value: this.glowColor }
        
    };

    this.vertexShader = [
"        varying vec3 vNormal;",
"        void main()",
"        {",
"            vNormal = normalize( normalMatrix * normal );",
"            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
"        }"
    ].join("\n");

    this.fragmentShader = [
"    varying vec3 vNormal;",
"    uniform vec3 glowColor;",
"    void main()",
"    {",
"        vec3 desiredColor = vec3( 0.9, 0.0, 1.0 );",
"        float intensity = pow( 0.4 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 2.0 );",
"        //float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 2.0 );",
"        gl_FragColor = vec4( glowColor, 1.0 ) * intensity;",
"    }"
    ].join("\n")

};


THREE.GlowMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.GlowMaterial.prototype.constructor = THREE.GlowMaterial;

THREE.GlowMaterial.prototype.copy = function (source) {

    THREE.ShaderMaterial.prototype.copy.call(this, source);
    this.glowColor = source.glowColor;
    return this;

};


THREE.GlowMaterial.prototype.toJSON = function (meta) {

    var data = THREE.ShaderMaterial.prototype.toJSON.call(this, meta);
    data.glowColor = this.glowColor;
    return data;

};