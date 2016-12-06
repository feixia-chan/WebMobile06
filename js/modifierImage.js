
// put here your JavaScript Code
// Example:

// alert("does it work?");

$(document).on('pageinit','#taquin',function (){
	var img =$("#ttaquin");
	var taille;
	var screenWidth = $(window).width(); 
	var screenHeight = $(window).height();


	img.css("width", (Math.min(screenWidth,screenHeight))*0.5); 

	img.myTransforms = [];
	img.myTransforms[0]=1; //scale
	img.myTransforms[1]=0; //rota

	img.updateCSSProperty = function(){
		this.css("transform","scale("+this.myTransforms[0] +",1) rotate("+this.myTransforms[1]+"deg)");	
	};


	function tailleImageTaquin(){
		var width1 = $("#slider-1").val();		
		taille = (Math.min(screenWidth,screenHeight))*width1/100 ;
		$("#ttaquin").css("width", taille); 	
	};

	function rotaImageTaquin(event){
		img.myTransforms[1]=event.target.value; //comme le $("#slider").val mais en plus efficace : depend directement d'un événemets, on a pkus d'infos dessus
		img.updateCSSProperty();
	};

	function miroirTaquin(event){
		if(event.target.value == "on"){
			img.myTransforms[0]= -1;
		}
		else{
			img.myTransforms[0]= 1;
		}
		img.updateCSSProperty();
	};
	
	$("#slider-1").on("change",tailleImageTaquin);
	$("#slider-2").on("change",rotaImageTaquin);
	$("#flip-1").on("change",miroirTaquin);
});


	
		
