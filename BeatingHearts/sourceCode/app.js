window.onload = function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight;
	//var height = canvas.height;
	//var width = canvas.width;

	console.log(height);
	console.log(width);

	var mouse = {
		x : 0,
		y : 0
	};

	var girlLeftNipple = {
		x : 143,
		y : 223
	};
	var girlRightNipple = {
		x : 139,
		y : 359
	};
	var boyLeftNipple = {
		x : 1061,
		y : 205
	};
	var boyRightNipple ={
		x : 1059, 
		y : 304
	};

	var girlImage = new Image();
	girlImage.src = 'data/girl.png';

	var boyImage = new Image();
	boyImage.src = 'data/boy.png';

	girlImage.onload = function(){
		context.drawImage(girlImage,0,height/5);
		boyImage.onload = function(){
			context.drawImage(boyImage,1000,height/5);
			context.beginPath();

			context.moveTo(girlLeftNipple.x, girlLeftNipple.y);
			context.lineTo(boyRightNipple.x, boyRightNipple.y);
			
			context.moveTo(girlRightNipple.x, girlRightNipple.y);
			context.lineTo(boyLeftNipple.x, boyLeftNipple.y);

			context.strokeStyle = "#F00";	
			context.stroke();
		}
	};


    canvas.addEventListener('click', function(event){
		//console.log('mouse clicked at '+ event.x + "," + event.y);
		mouse.x = event.x - canvas.offsetLeft;
		mouse.y = event.y - canvas.offsetTop;
		console.log(mouse.x + ',' + mouse.y);
	});
}
