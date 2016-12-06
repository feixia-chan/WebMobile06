//global

	
		// settings
$(document).ready(function(){
	$("#boutonJouer").click(function(){
		var ligne =  $("#sliderL").val();
		var colonne = $("#sliderC").val();
		var espace = $("#sliderE").val();
		localStorage.removeItem("ligne");
		localStorage.removeItem("colonne");
		localStorage.removeItem("espace");  	
		localStorage.setItem("ligne", ligne);
		localStorage.setItem("colonne", colonne);
		localStorage.setItem("espace", espace);
		window.location = "taquin.html"; 
	});	
});

		// grille
		
		
$(document).on('pageinit','#grille',function(){
	var myImg = new Image();
	myImg.src = '../images/death note.png';
	var hauteur;
	var largueur;
	var nbL;
	var nbC	;
	var nbDiv =0;
	var Base = $("#base");
	var ligne = localStorage.getItem("ligne");
	var colonne = localStorage.getItem("colonne");
	var espace = localStorage.getItem("espace");

	
	function grille(){
		for(nbL = 0; nbL < ligne;nbL++){
			for (nbC = 0; nbC < colonne; nbC++){
				var nouvelleDiv = $("<div class = 'shadow' id = t"+nbDiv+"></div>"); // PLUS JAMAIS D'ID SANS LETTRE !!! (#j'ai perdu 2h de ma vie)
				nouvelleDiv.css('height', hauteur/ligne);
				nouvelleDiv.css('width', largeur/colonne);
				nouvelleDiv.css('background-image', "url("+myImg.src+")");	
				nouvelleDiv.css('background-size', largeur+"px "+ hauteur+"px");				
				nouvelleDiv.css('background-position' , -nbC*largeur/colonne+"px "+ -nbL*hauteur/ligne+"px");
				nouvelleDiv.css('margin-right' , espace+"px ");
				nouvelleDiv.css('margin-bottom', espace-5+"px ");
				Base.append(nouvelleDiv);
				nbDiv++;
			}
		var nouvelleDiv2 = $("<div></div>");
		nouvelleDiv2.css("height","0px");
			Base.append(nouvelleDiv2);
		}
	};
		
	function tailleImageTaquin(){
		var screenWidth = $(window).width(); 
		var screenHeight = $(window).height();
		var hauteurOriginal = myImg.height;
		var largeurOriginal = myImg.width;
		if ( hauteurOriginal/screenHeight <= largeurOriginal/screenWidth){
			largeur = screenWidth *75/100
			hauteur = hauteurOriginal/largeurOriginal * largeur;
		}
		else {
			hauteur = screenHeight * 75/100;
			largeur = largeurOriginal/hauteurOriginal *hauteur;
		}
	};
	
	
	tailleImageTaquin();
	grille = new grille();
		
});
		
		// modifierImage
		
$(document).on('pageinit','#modifierImage',function (){
	var img =$("#imageAModifier");
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
		$("imageAModifier").css("width", taille); 	
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

	

