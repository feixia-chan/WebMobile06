//global
	var ligne;
	var colonne;
	var caseCachee;
	var montre;
	var idCaseActuelle;
	var idCaseCachee;
	
		// settings
$(document).ready(function(){
	$("#boutonJouer").click(function(){
		ligne =  $("#sliderLC").val();
		colonne = $("#sliderLC").val();
		espace = $("#sliderE").val();
		var hauteur = $("#imageAModifier").height();
		//console.log(hauteur);
		//console.log(ligne);
		//console.log(colonne);
		//console.log(espace);
		window.location = "#grille"; 
	});	
});

		// grille
		
		

		
$(document).on('pageinit','#grille',function(){
	console.log(ligne);
	console.log(colonne);
	var taille;
	var nbL;
	var nbC	;
	var nbDiv =0;
	var Base = $("#base"); 	
	
	
	/*function quelIDActuel(div){
		//document.write(that.id);
		idCaseActuelle = $(this).attr('id');
	};*/

	
	function grille(){
		for(nbC=0; nbC<colonne;nbC++){
			for (nbL=0; nbL<ligne; nbL++){
				var nouvelleDiv = $("<div class = 'shadow' id = L"+(nbC+1)+"C"+(nbL+1)+"></div>"); // PLUS JAMAIS D'ID SANS LETTRE !!! (#j'ai perdu 2h de ma vie)
				nouvelleDiv.css('height', taille/ligne);
				nouvelleDiv.css('width', taille/colonne);
				nouvelleDiv.css('background-size', taille+"px "+ taille+"px");				
				nouvelleDiv.css('background-position' , -nbL*taille/ligne+"px "+ -nbC*taille/colonne+"px");	
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
		var hauteur = $("#shadow.background-image").height();
		taille = (Math.min(screenWidth,screenHeight))*75/100;
	};

	tailleImageTaquin();
	grille = new grille();
	idCaseCachee = "L1C1";
	$('#L1C1').css('visibility','hidden' );//c'est la case qu'on verra pas de la partie
	//console.log(idCaseCachee);
	
	
	
	
	
	
	
	
	
	
			/*
			#####################################################################
										OK !!!!!
				Maintenant on va tenter de déplacer ces carrés moches
				Il faut : 	une case cachée
							echanger les div de deux cases
							vérifier que les cases bougées sont autour de la CC
			#####################################################################*/
							
	
	
			/* TEST : si on clique le bouton ca change bien de couleur la finction animate est ratée on l'oublie !

			$('#go1').on('click',function(onClique){
			  $("#t5").css("background-color","pink");
			});*/

	//ETAPE 1 : on affecte une case blanche au pif qu'on peut montrer
	
	function cachevide(nouvelID){
	idCaseCachee= nouvelID; //modif dans le css...
	$('#'+cache).css('visibility','hidden' );
	};
	
	function montrevide(nouvelID){
		montre = nouvelID; //modif dans le css...
	$('#'+montre).css('visibility','visible' );
	};

	//la fonction est OK
	
	//ETAPE 2 : echange de div
	function kkn(evt){
	idCaseActuelle= evt.attr('id');
	}

	
	$('#base').on('click',function(onClique){
		kkn(onClique);
		
		//idCaseActuelle= $('div').attr('id');
			//idCaseActuelle = this.id;
		
	
		//on réccupère l'idCaseActuelle
		/*$(document).on('click',function() {
		idCaseActuelle = $(this).attr('id');
		//alert(idCaseActuelle);
		});*/
		
	
		
		
		
		console.log(idCaseActuelle);
		console.log(idCaseCachee);
	});
	
		/*document.getElementById(idCaseCachee).id = "lol";//on a cliqué dessus
		document.getElementById(idCaseActuelle).id = idCaseCachee; //on intervertit les deux id de div mais ca change pas le background
		document.getElementById('lol').id = idCaseActuelle;
		
		//22 : caché; 23 : actuel
		//Stockage du background 
		myIm22 = $('#'+idCaseCachee).css("background-position").split(" "); //On stocke dans un tableau myIm22 les valeurs
		//console.log(myIm22);
		myIm23 = $('#'+idCaseActuelle).css("background-position").split(" ");
				//stocker
		var valeurX=myIm23[0];
		var valeurY=myIm23[1];
				//On change 23
		myIm23[0]=myIm22[0];
		//console.log(myIm23[0]);
		myIm23[1]=myIm22[1];
				//On change 22
		myIm22[0]=valeurX;
		//console.log(myIm23[0]);
		myIm22[1]=valeurY;
				//Génial ! plus qu'a tout bien affecter
		$('#'+idCaseActuelle).css("background-position",myIm22[0] +" "+ myIm22[1]);
		$('#'+idCaseCachee).css("background-position",myIm23[0] +" "+ myIm23[1]);
		
		cachevide(idCaseCachee); //cache la nouvelle case
		montrevide(idCaseActuelle);//montre case cachée précédemment
		*/
	
});
	

	
//code boc clément 3A495FC3412950C8C8A6087E28



  
		//var $this = $(this); //$this est un nom de variable dégueulasse qui permet de mettre de la variable courante
		//$this.animate({
		//	$('#t5').animate({
			//background-color: black$('#t5').position().top + $('#t5').height()+10 },1000); // le nouveau top correspond au top de l'image + sa taille
		//left: "+=50"},1000,function(){});

//});
		
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

	
