		// SETTINGS
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

$(document).ready(function(){
	$("#boutonScore").click(function(){
		var ligne =  $("#sliderL").val();
		var colonne = $("#sliderC").val();
		
	});	
});

		// GRILLE		
$(document).on('pageinit','#grille',function(){
	
			// variable grille (le mal)
	var myImg = new Image();
	myImg.src = 'images/lovesolife.png';
	var hauteur;
	var largeur;
	var ligne = localStorage.getItem("ligne");
	var colonne = localStorage.getItem("colonne");
	var espace = localStorage.getItem("espace");	
	var idCaseCachee;
	var compteur = 0;
	

		// function grille
	function grille(){
		var nbL;
		var nbC	;
		var nbDiv =0;
		for(nbL = 0; nbL < ligne;nbL++){
			for (nbC = 0; nbC < colonne; nbC++){
				var nouvelleDiv = $("<div class = 'shadow' id = L"+(nbL+1)+"C"+(nbC+1)+" name = "+nbDiv+"></div>"); 
				nouvelleDiv.css('height', hauteur/ligne);
				nouvelleDiv.css('width', largeur/colonne);
				nouvelleDiv.css('background-image', "url("+myImg.src+")");	
				nouvelleDiv.css('background-size', largeur+"px "+ hauteur+"px");				
				nouvelleDiv.css('background-position' , -nbC*largeur/colonne+"px "+ -nbL*hauteur/ligne+"px");
				nouvelleDiv.css('margin-right' , espace+"px ");
				nouvelleDiv.css('margin-bottom', espace-5+"px ");
				$("#base").append(nouvelleDiv);			
				nbDiv++;
			}
		var nouvelleDiv2 = $("<div></div>");
		nouvelleDiv2.css("height","0px");
			$("#base").append(nouvelleDiv2);
		}
		idCaseCachee = "L1C1";
		$('#L1C1').css('visibility','hidden' );
	};
	
		
			// function tailleImageTaquin
	function tailleImageTaquin(){	
		var screenWidth = $(window).width(); 
		var screenHeight = $(window).height();
		var hauteurOriginal = myImg.height;		
		var largeurOriginal  = myImg.width;
		if ( hauteurOriginal/screenHeight <= largeurOriginal/screenWidth){
			largeur = screenWidth *75/100
			hauteur = hauteurOriginal/largeurOriginal * largeur;
		}
		else {
			hauteur = screenHeight * 75/100 - 30; // -30 pour compenser le header et footer
			largeur = largeurOriginal/hauteurOriginal *hauteur;
		}
	};
	
	
		// function permuter
	function permuter(idClique){
		divCache = $('#'+idCaseCachee).css("background-position").split(" "); 
		divClique = $('#'+idClique).css("background-position").split(" ");
		$('#'+idClique).css("background-position",divCache[0] +" "+ divCache[1]);
		$('#'+idClique).css('visibility','hidden' );
		$('#'+idCaseCachee).css("background-position",divClique[0] +" "+ divClique[1]);
		$('#'+idCaseCachee).css('visibility','visible' ); 			
		var temp = $('#'+idClique).attr('name'); //changement des noms pour déterminer la victoire
		var nameClique = $('#'+idClique).attr('name');
		var nameCachee = $('#'+idCaseCachee).attr('name');
		$('#'+idClique).attr('name', nameCachee);
		$('#'+idCaseCachee).attr('name', temp);
		idCaseCachee = idClique;		
	};
		
		// function mélanger
	function shuffle (repeter){
		var choixPrecedent = "";
		for (var n = 0; n < repeter; n++){
			var i = parseInt(idCaseCachee.substring(1,2));
			var j = parseInt(idCaseCachee.substring(3,4));
			var choix1 = 'L'+(i-1)+'C'+j;
			var choix2 = 'L'+(i+1)+'C'+j;
			var choix3 = 'L'+i+'C'+(j-1);
			var choix4 = 'L'+i+'C'+(j+1);
			var choixPossible = [];
			
			if ( i !=1 && choix1 != choixPrecedent){ 
				choixPossible.push(choix1);
			}
			if ( i != ligne && choix2 != choixPrecedent){
				choixPossible.push(choix2);
			}
			if ( j !=1 && choix3 != choixPrecedent){
				choixPossible.push(choix3);
			}
			if ( j != colonne && choix4 != choixPrecedent){
				choixPossible.push(choix4);
			}
			var nombreAleatoire = Math.floor((Math.random() * choixPossible.length));
			choixPrecedent = idCaseCachee;
			permuter(choixPossible[nombreAleatoire]);
		}		
	};
			// function taille de l'image du pop up
	function setImagePopup(){
		$("#imageModele").attr('src', 'images/lovesolife.png');
		$("#imageModele").css('width', largeur+"px");
		$("#imageModele").css('height', hauteur+"px");
	}
		// fonction qui détermine si le joueur à gagner
	function victoire(){
		var nbDiv = 0;
		if (idCaseCachee != 'L1C1'){		
			return false;
		}
		for( var nbL = 1; nbL <= ligne; nbL++){
			for (nbC = 1; nbC <= colonne; nbC++){	
				var id = "L"+nbL+"C"+nbC;
				if ( $("#"+id).attr('name') == nbDiv && nbDiv < ligne*colonne-1 ){
					nbDiv++;
				}
				else if ( $("#"+id).attr('name') == nbDiv && nbDiv == ligne*colonne-1 ) {
					return true;
				}
				else {
					return false;
				}			
			}
		}		
	}
		// fonction qui exécute des actions quand le joueur a gagné
	function affichageVictoire(){
		if(victoire() == true){
			var score = compteur;
			//localStorage.removeItem(colonne+"x"+ligne+"Score");
			var ancienRecord = localStorage.getItem(colonne+"x"+ligne+"Score");
			console.log(ancienRecord);
			console.log(compteur);
			if ( ancienRecord > score || ancienRecord == null){
				localStorage.setItem(ancienRecord, score);
				alert("Vous avez battu votre record ! \n Vous avez gagné en "+compteur+" coups");
				window.location = 'menuTaquin.html#settings';
			}
			else {
				alert("Vous avez gagné en "+compteur+" coups");
				window.location = 'menuTaquin.html#settings';
			}
		}
	}
	
		// action
	$("#base").click(function(e) {
		var i = parseInt(idCaseCachee.substring(1,2));
		var j = parseInt(idCaseCachee.substring(3,4));
		if ( e.target.id == 'L'+i+'C'+(j+1) ) {
			permuter(e.target.id);
			compteur++;
			affichageVictoire();	
		} 
		else if ( e.target.id == 'L'+i+'C'+(j-1) ) { 
		   permuter(e.target.id);
		   compteur++;
		   affichageVictoire();	
		}
		else if ( e.target.id == 'L'+(i+1)+'C'+j ) { 
		   permuter(e.target.id);
		   compteur++;
		   affichageVictoire();
		}
		else if ( e.target.id == 'L'+(i-1)+'C'+j ) { 
		   permuter(e.target.id);
		   compteur++;
		   affichageVictoire();
		}
		$("#compteur").text("Coups : " + compteur);
		
	});

			// création de la vue
	myImg.onload = function() {
		tailleImageTaquin();
		grille = new grille();
		shuffle(colonne*ligne*5);
		setImagePopup();
		$("#compteur").text("Coups : " + compteur);
	}
	
});
		
		
		// MODIFIERIMAGE	
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
		$("#imageAModifier").css("width", taille); 	
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

	

