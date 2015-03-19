window.onload = function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight;

	var frequency = 220;
	
	var mouse = {
		x : 0,
		y : 0,
		isClicked : false
	};

	var girl = {
		image : new Image(),
		x : 0,
		y : height/5,
		leftNipple : {
			x : 0,
			y : 0
		},
		synth : new Tone.AMSynth(),
		frequency : 220,
		init : function(){
			this.image.src = 'data/girl.png';
			this.leftNipple.x = this.x+144;
			this.leftNipple.y = this.y+89;
			this.synth.toMaster();
			this.synth.triggerAttack(this.frequency);
		},
		updateNipple : function(x,y){
			this.leftNipple.x = x+144;
			this.leftNipple.y = y+89;
		},
		isClicked : function(context,x,y){
			context.beginPath();
			context.rect(this.x,this.y,this.image.width,this.image.height);
			if(context.isPointInPath(x,y)){
				return true;
			}else{
				return false;
			}
		},
		updateFrequency : function(){
			this.frequency = this.frequency+ this.x/100;
		}
	};

	var boy = {
		image : new Image(),
		x : 1000,
		y : height/5,
		rightNipple : {
			x : 0,
			y : 0
		},
		synth : new Tone.AMSynth(),
		frequency : 230,
		init : function(){
			this.image.src = 'data/boy.png';
			this.rightNipple.x = this.x+88;
			this.rightNipple.y = this.y+105;
			this.synth.toMaster();
			this.synth.triggerAttack(this.frequency);
		},
		updateNipple : function(x,y){
			this.rightNipple.x = x+88;
			this.rightNipple.y = y+105;
		},
		isClicked : function(context,x,y){
			context.beginPath();
			context.rect(this.x,this.y,this.image.width,this.image.height+10);
			if(context.isPointInPath(x,y)){
				return true;
			}else{
				return false;
			}
		},
		updateFrequency : function(){
			this.frequency += this.x/1000;
		}
	};
	
	girl.init();
	boy.init();
	
	girl.image.onload = function(){
		context.drawImage(girl.image,0,height/5);
		boy.image.onload = function(){
			context.drawImage(boy.image,1000,height/5);
			context.beginPath();

			context.fillStyle = 'f22';
			//boy.rightNipple.x = boy.x + 82;
			//boy.rightNipple.y = boy.y + 99;
			//console.log('boy left nipple : ' + boy.rightNipple.x + ',' + boy.rightNipple.y);
			//context.fillRect(girl.leftNipple.x,girl.leftNipple.y,10,10);
			//context.fillRect(boy.rightNipple.x,boy.rightNipple.y,10,10);

			context.moveTo(girl.leftNipple.x, girl.leftNipple.y);
			context.lineTo(boy.rightNipple.x, boy.rightNipple.y);
			
			context.strokeStyle = "#F00";	
			context.stroke();
		}
	};


    canvas.addEventListener('mousedown', function(event){
		mouse.isClicked = true;
		console.log('boy freq : ' + boy.frequency);
		console.log('girl freq : ' + girl.frequency);
	});

	canvas.addEventListener('mouseup', function(event){
		mouse.isClicked = false;
	});

	canvas.addEventListener('mousemove',function(event){
	if(mouse.isClicked){
		mouse.x = event.x - canvas.offsetLeft;
		mouse.y = event.y - canvas.offsetTop;
		if(boy.isClicked(context,mouse.x,mouse.y)){
			boy.x = mouse.x - 100;
			//boy.y = mouse.y - 100;
			reDrawCanvas();
		};
		if(girl.isClicked(context,mouse.x,mouse.y)){
			girl.x = mouse.x - 100;
			//girl.y = mouse.y - 100;
			reDrawCanvas();
		};
	}
	});

	reDrawCanvas = function(){
		context.fillStyle = '#fff';
		context.fillRect(0,0,canvas.width,canvas.height);
		context.drawImage(boy.image,boy.x,boy.y);
		context.drawImage(girl.image,girl.x,girl.y);
		boy.updateNipple(boy.x,boy.y);
		girl.updateNipple(girl.x,girl.y);
		boy.updateFrequency();
		girl.updateFrequency();

		context.beginPath();
		context.moveTo(girl.leftNipple.x, girl.leftNipple.y);
		context.lineTo(boy.rightNipple.x, boy.rightNipple.y);
		context.strokeStyle = '#F00';
		context.stroke();
	};
}
