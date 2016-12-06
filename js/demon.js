var div;
$(document).ready(function(){
		function tailleLicorne(){		
		taille = (Math.min(screenWidth,screenHeight));
		$("#magique").css("width", taille); 
	div = false;		
	};
	
	$("#licorne #boutonDemoniaque").click(function (){
		//var nyancat = $("<embed src='musique/nyancat.mp3' autostart="true" loop="false" hidden="true"></embed>");
		var txt = $("<div> Vous avez tenté de vous échapper, mais ce bouton ne marche pas. Vous êtes prisonnier de notre licorne magique et condamné a entendre cette musique sans fin ! Hahahahahhahaha!</div> ");
		if (!div){
			$("#licorne").append(txt);
			div = true;
		}
	});
});