ParticleExamples = {
    Fire: function () {
        var particleGroup = new SPE.Group({
            texture: {
                value: new THREE.TextureLoader().load('Images/smokeparticle.png')
            },
            blending: THREE.AdditiveBlending,
            scale: 30,
        });
        var emitter = new SPE.Emitter({
            type: SPE.distributions.SPHERE,
            maxAge: {
                value: 4
            },
            position: {
                value: new THREE.Vector3(0, 0, 0),
                spread: new THREE.Vector3(0, 0, 0)
            },
            acceleration: {
                value: new THREE.Vector3(0, 0, 0),
                spread: new THREE.Vector3(0, 0, 0)
            },
            velocity: {
                value: new THREE.Vector3(0, 25, 0),
                spread: new THREE.Vector3(100, 100, 100)
            },
            color: {
                value: [new THREE.Color('white'), new THREE.Color('yellow')]
            },
            size: {
                //value: 500
                value: Planets[0].radius * 12
            },
            particleCount: 200
        });
        particleGroup.addEmitter(emitter);
        return particleGroup;
        //this.scene.add(this.particleGroup.mesh);
    },
    Sparkles : function (parameters) {
        var particleGroup = new SPE.Group({
            texture: {
                value: new THREE.TextureLoader().load('Images/smokeparticle.png')
            },
            blending: THREE.AdditiveBlending,
            scale: parameters.scale?parameters.scale:30,
        });
        var emitter = new SPE.Emitter({
            type: SPE.distributions.SPHERE,
            maxAge: {
                value: 2
            },
            position: {
                value: new THREE.Vector3(0, 0, 0),
                spread: new THREE.Vector3(5, 5, 5)
            },
            acceleration: {
                value: new THREE.Vector3(0, 100, 0),
                spread: new THREE.Vector3(100, 100, 100)
            },
            velocity: {
                value: new THREE.Vector3(0, 2, 0),
                spread: new THREE.Vector3(2, 2, 2)
            },
            color: {
                //value: [new THREE.Color('white'), new THREE.Color('yellow')]
                value: [new THREE.Color('cyan')]
            },
            size: {
                value: 200
                //value: Planets[0].radius * 12
            },
            duration: 6,
            particleCount: 200
        });
        particleGroup.addEmitter(emitter);
        return particleGroup;
        //this.scene.add(this.particleGroup.mesh);
    },

    Explosion: function () {
        var group = new SPE.Group({
            texture: {
                //value: THREE.ImageUtils.loadTexture('Images/sprite-explosion2.png'),
                value: THREE.ImageUtils.loadTexture('Images/smokeparticle.png'),
                frames: new THREE.Vector2(5, 5),
                loop: 1
            },
            depthTest: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            scale: 600
        });
        var shockwaveGroup = new SPE.Group({
            texture: {
                value: THREE.ImageUtils.loadTexture('Images/smokeparticle.png'),
            },
            depthTest: false,
            depthWrite: true,
            blending: THREE.NormalBlending,
        });
        var shockwave = new SPE.Emitter({
            particleCount: 200,
            type: SPE.distributions.DISC,
            position: {
                radius: 5,
                spread: new THREE.Vector3(5)
            },
            maxAge: {
                value: 2,
                spread: 0
            },
            // duration: 1,
            activeMultiplier: 2000,
            velocity: {
                value: new THREE.Vector3(40)
            },
            rotation: {
                axis: new THREE.Vector3(1, 0, 0),
                angle: Math.PI * 0.5,
                static: true
            },
            size: { value: 2 },
            color: {
                value: [
                    new THREE.Color(0.4, 0.2, 0.1),
                    new THREE.Color(0.2, 0.2, 0.2)
                ]
            },
            opacity: { value: [0.5, 0.2, 0] }
        });
        var debris = new SPE.Emitter({
            particleCount: 100,
            type: SPE.distributions.SPHERE,
            position: {
                radius: 0.1,
            },
            maxAge: {
                value: 2
            },
            // duration: 2,
            activeMultiplier: 40,
            velocity: {
                value: new THREE.Vector3(100)
            },
            acceleration: {
                value: new THREE.Vector3(0, -20, 0),
                distribution: SPE.distributions.BOX
            },
            size: { value: 2 },
            drag: {
                value: 1
            },
            color: {
                value: [
                    new THREE.Color(1, 1, 1),
                    new THREE.Color(1, 1, 0),
                    new THREE.Color(1, 0, 0),
                    new THREE.Color(0.4, 0.2, 0.1)
                ]
            },
            opacity: { value: [0.4, 0] }
        });
        var fireball = new SPE.Emitter({
            particleCount: 20,
            type: SPE.distributions.SPHERE,
            position: {
                radius: 1
            },
            maxAge: { value: 2 },
            // duration: 1,
            activeMultiplier: 20,
            velocity: {
                value: new THREE.Vector3(10)
            },
            size: { value: [20, 100] },
            color: {
                value: [
                    new THREE.Color(0.5, 0.1, 0.05),
                    new THREE.Color(0.2, 0.2, 0.2)
                ]
            },
            opacity: { value: [0.5, 0.35, 0.1, 0] }
        });
        var mist = new SPE.Emitter({
            particleCount: 50,
            position: {
                spread: new THREE.Vector3(10, 10, 10),
                distribution: SPE.distributions.SPHERE
            },
            maxAge: { value: 2 },
            // duration: 1,
            activeMultiplier: 2000,
            velocity: {
                value: new THREE.Vector3(8, 3, 10),
                distribution: SPE.distributions.SPHERE
            },
            size: { value: 40 },
            color: {
                value: new THREE.Color(0.2, 0.2, 0.2)
            },
            opacity: { value: [0, 0, 0.2, 0] }
        });
        flash = new SPE.Emitter({
            particleCount: 50,
            position: { spread: new THREE.Vector3(5, 5, 5) },
            velocity: {
                spread: new THREE.Vector3(30),
                distribution: SPE.distributions.SPHERE
            },
            size: { value: [2, 20, 20, 20] },
            maxAge: { value: 2 },
            activeMultiplier: 2000,
            opacity: { value: [0.5, 0.25, 0, 0] }
        });
        group.addEmitter(fireball).addEmitter(flash);
        shockwaveGroup.addEmitter( debris ).addEmitter( mist );
        return shockwaveGroup;
    }
//shockwaveGroup.addEmitter( debris ).addEmitter( mist );


}