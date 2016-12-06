// Cette mini-bibliothèque ne fonctionne pas directement, il faut lui ajouter une api_key de Flikr. 
// Rendez-vous sur la page : http://www.flickr.com/services/api/misc.overview.html 
// créer un compte afin d’obtenir une telle clé. 
// Ensuite recopier votre clé (32 caractères alphanumériques) dans le champs api_key ci-dessous

function _imageURL(image,size){
	return "http://farm"+image.farm+".static.flickr.com/"+image.server+"/"+image.id+"_"+image.secret+size+".jpg";
}

function getImageURL(image,size){
	return _imageURL(image,'');
}

function getSmallImageURL(image) {
	return _imageURL(image,'_s');
}

function getMediumImageURL(image) {
	return _imageURL(image,'_m');
}

function getFlikrApiURL(params) {
	var defaultParams = {
		format: 'json',
		jsoncallback: '?',
		api_key: '39ec76f433c9dd5f5e5548e360cb3f8d',
		method: 'flickr.photos.search',
		text: 'cats',
		per_page: 1
	};

	// overload default options with ones that have been passed if any
	params = $.extend(defaultParams, params);
	
	var apiurl = "https://api.flickr.com/services/rest/?";
	$.each(params,function(key,value){	
		apiurl += '&'+key+'='+value;
	});
	
	return apiurl;
}

function getFlikrApiURLForTextAndNumber(text,numberOfImages) {
	return getFlikrApiURL({text: text, per_page: numberOfImages});
}

function getFlikrApiURLForText(text) {
	return getFlikrApiURL({text: text});
}





//Ca c'était donné.... mtn on charge que des images de manga swagg !

$.getJSON(getFlikrApiURLForTextAndNumber('one piece wallpaper',15),function(json){ 
	var images = json.photos.photo;
	images[1]="lovesolife";
	//console.log(getImageURL(images[1])); //donne le lien de l'image 1
	var imActuelle = 1; //initialisation
	var lienPrec= getImageURL(images[imActuelle-1]); //image prec
	var lienA= getImageURL(images[imActuelle]);
	var lienSuiv=getImageURL(images[imActuelle+1]);
	var chg;								// pour recharger les images
	chg=true;
	var pictureP;							//image Précédente
	var pictureA;							//image Actuelle
	var pictureS;							//image suivante
				
				
				
				//initialisation
	pictureP = $("<div class='ligne' id='ip'><img class='IP' src="+lienPrec+"/></div>"); //on affiche l'image prec
	$("#monImageF").append(pictureP);
	//$(this).append(newP); // comme ca on va les remove() facilement
				
	pictureA = $("<div class='ligne' id='ia'> <img class='IN' src="+lienA+"/></div>"); 		// on affiche l'imageActuelle
	$("#monImageF").append(pictureA);
	//$(this).append(newA);
		
	pictureS = $("<div class='ligne'id='is'><img class= 'IP' src="+lienSuiv+"/> </div>");	//on affiche l'image suiv
	$("#monImageF").append(pictureS);
	
	chg = false;


	//Fonction pour avoir l'image prec
	$("#prec").click(function(){

		if (imActuelle >0){
			console.log("OKL");
			imActuelle--;		//l'image actuelle change
			lienPrec = getImageURL(images[imActuelle-1]); //création de nouvelles images prec
			lienA= getImageURL(images[imActuelle]);
			lienSuiv = getImageURL(images[imActuelle+1]); //l'ancienne imActuelle est la nouvelle suiv
			chg = true;
			onChangeCesImages();
		}
		else {
			console.log("Inf a 0");
		}
					
	});	
			
			
			
			// $( "#swiper-licorne" ).on( "swiperight", function imSuiv( event ){
	$("#suiv").click(function(){
		console.log("okR");
		if (imActuelle <15){
			imActuelle++; 
			lienPrec = getImageURL(images[imActuelle-1]);
			console.log(lienPrec);
			lienA= getImageURL(images[imActuelle]);
			lienSuiv = getImageURL(images[imActuelle+1]);
			chg=true;
			onChangeCesImages();
		}
		else{
			console.log("sup à 15");
		}
	});	
			
	function onChangeCesImages(){
		if(chg){
			var eP = document.getElementById('ip');
			eP.parentNode.removeChild(eP);;
			pictureP = $("<div class='ligne' id = 'ip'><img class='IP' src="+lienPrec+"/></div>"); //on affiche l'image prec
			$("#monImageF").append(pictureP);
				
						
			var eA = document.getElementById('ia');
			eA.parentNode.removeChild(eA);
			pictureA = $("<div class='ligne' id='ia'> <img class='IN' src="+lienA+"/></div>"); 		// on affiche l'imageActuelle
			$("#monImageF").append(pictureA);
			
											
			var eS = document.getElementById('is');
			eS.parentNode.removeChild(eS);
			pictureS = $("<div class='ligne' id='is'><img class= 'IP' src="+lienSuiv+"/> </div>");	//on affiche l'image suiv
			$("#monImageF").append(pictureS);
			console.log(chg +"avant");
			chg = false;
			console.log(chg + "après");
		}
	}
});
	
	