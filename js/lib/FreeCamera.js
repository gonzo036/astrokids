FreeCamera = function () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.t = 0;
    this.origin = null;
    this.acceleration = 1;
    this.camera = null;
    this.referenceObject = null;
    this.zeroPointObject = null;
    this.lookAtMode = 'Z'; //Z: ZEROPOINT, S: STATIC, XZ: ZEROPOINT XZ, KEEP Y HORIZONTAL
    this.completeCallback = null;
    this.lookAtObject = null;

    this.wayPoints = new Queue();

    this.purge = function () {
        this.wayPoints.empty();
    }

    this.setCamera = function (camera) {
        this.camera = camera;
        this.x = this.camera.position.x;
        this.y = this.camera.position.y;
        this.z = this.camera.position.z;
    }
	
	this.setPosition = function (x,y,z)
	{
		this.camera.position.x = x;
		this.camera.position.y = y;
		this.camera.position.z = z;
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	this.setEndPoint = function (x,y,z,time)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		if(time>=0)
			this.t = time;
	}
	
	this.setWayPoint = function(options)
	{
	    //this.wayPoints.enqueue({ x: options.x, y: options.y, z: options.z, time: options.time, accel: options.accel });
	    this.wayPoints.enqueue(options);
	    //console.warn("queuing: " + options.x + ' ' + options.y + ' ' + options.z + ' ' + options.time + ' q:' + this.wayPoints.getLength());
	    if(this.t==0 && this.wayPoints.getLength()==1)
	    {
	        this.loadWayPoint();
	    }
	}
	
	this.loadWayPoint = function()
	{
		var wayPoint = this.wayPoints.dequeue();
		if(wayPoint)
		{
			this.x=wayPoint.x;
			this.y=wayPoint.y;
			this.z=wayPoint.z;
			this.t = wayPoint.time;
			this.acceleration = wayPoint.acceleration || 1;
			this.referenceObject = wayPoint.referenceObject || { x: -100, y: 0, z: 0 };
			this.zeroPointObject = wayPoint.zeroPointObject || { x: 0, y: 0, z: 0 };
			this.lookAtMode = wayPoint.lookAtMode || 'Z';
			this.completeCallback = wayPoint.completeCallback || null;
			this.lookAtObject = wayPoint.lookAtObject || null;
			//console.warn("loading: " + this.x + ' ' + this.y + ' ' + this.z + ' ' + this.t + ' q:' + this.wayPoints.getLength());
		}
	}
	
	this.lookAt = function (vec3)
	{
		this.camera.lookAt(vec3);
	}
	
	this.Tick = function(delta)
	{ 
		if(this.t>0.01)
		{
		    // RELATIVO A
		    var norm = Math.sqrt(Math.pow(this.zeroPointObject.x - this.referenceObject.x, 2) + Math.pow(this.zeroPointObject.z - this.referenceObject.z, 2));
		    var vx = (this.zeroPointObject.x - this.referenceObject.x) / norm; // cos(angl)
		    var vz = (this.zeroPointObject.z - this.referenceObject.z) / norm; // sin(angl)

		    var dx = -(this.camera.position.x - (this.zeroPointObject.x + vx * this.x - vz * this.z)) / this.t;
		    var dy = -(this.camera.position.y - (this.zeroPointObject.y +      this.y))               / this.t;
		    var dz = -(this.camera.position.z - (this.zeroPointObject.z + vz * this.x + vx * this.z)) / this.t;
			//console.warn("going: " + this.x + ' ' + this.y + ' ' + this.z + ' ' + this.t );
		    this.camera.position.x += dx * delta * this.acceleration;
		    this.camera.position.y += dy * delta * this.acceleration;
		    this.camera.position.z += dz * delta * this.acceleration;
			
		    if (this.lookAtMode == 'Z')
			    this.lookAt(new THREE.Vector3(
				    this.zeroPointObject.x,
				    this.zeroPointObject.y,
				    this.zeroPointObject.z
			    ));
		    if (this.lookAtMode == 'XZ')
		        this.lookAt(new THREE.Vector3(
				    this.zeroPointObject.x,
				    this.camera.position.y,
				    this.zeroPointObject.z
			    ));
		    if (this.lookAtMode == 'O' && this.lookAtObject)
		        this.lookAt(this.lookAtObject);

			this.t -= delta;
		}
		else if (this.wayPoints.getLength() > 0)
		{
		    if (this.completeCallback) this.completeCallback();
		    this.loadWayPoint();
		}
		else
		{
		    if (this.completeCallback) { this.completeCallback(); this.completeCallback = null; }
		    //RELATIVO A
		    var norm = Math.sqrt(Math.pow(this.zeroPointObject.x - this.referenceObject.x, 2) + Math.pow(this.zeroPointObject.z - this.referenceObject.z, 2));
		    var vx = (this.zeroPointObject.x - this.referenceObject.x) / norm; // cos(angl)
		    var vz = (this.zeroPointObject.z - this.referenceObject.z) / norm; // sin(angl)

		    var objectNorm = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.z, 2));

		    this.t = 0;
		    this.camera.position.x = this.zeroPointObject.x + vx * this.x - vz * this.z;
		    this.camera.position.y = this.y + 0;
		    this.camera.position.z = this.zeroPointObject.z + vz * this.x + vx * this.z;
		    if (this.lookAtMode == 'Z')
		        this.lookAt(new THREE.Vector3(
				    this.zeroPointObject.x,
				    this.zeroPointObject.y,
				    this.zeroPointObject.z
			    ));
		    if (this.lookAtMode == 'XZ')
		        this.lookAt(new THREE.Vector3(
				    this.zeroPointObject.x,
				    this.camera.position.y,
				    this.zeroPointObject.z
			    ));
		    if (this.lookAtMode == 'O' && this.lookAtObject)
		        this.lookAt(this.lookAtObject);
		}
		
        //if (this.camera.position.length() > MAX_CAMERA_DISTANCE)
        //{
        //    this.camera.position.setLength(MAX_CAMERA_DISTANCE)
        //}
	}
	
}