// Mastermind by Daniel LEGER

// Déclaration et Initialisation des variables et objets
var boutonNewGame = document.getElementById('btNewGame'); //bouton de réinitialisation du jeu
var monBouton2 = document.getElementById('Annuler');
var monLevel = document.getElementById('gamelevel'); //objet gamelevel
var monBtLevel = document.getElementsByClassName('bt-level');

var nbrPosition = 4 //nombre de positions selon le niveau (4 par défaut ou 5)
var nbrDeCouleurs = 4 //nombre de couleurs utilisées selon le niveau (4 par défaut, 5, 6 ou 7)
var nbrDeTours = 12 //nombre de tour maximum pour trouver la solution (12 par défaut)

var flagWinLoose = false //drapeau indiquant que c'est gagné ou perdu

var boutonColor1 = document.getElementById('bt1');
var boutonColor2 = document.getElementById('bt2');
var boutonColor3 = document.getElementById('bt2');
var boutonColor4 = document.getElementById('bt2');
var boutonColor5 = document.getElementById('bt2');
var boutonColor6 = document.getElementById('bt2');
var boutonColor7 = document.getElementById('bt2');
var boutonColor7 = document.getElementById('bt2');

var tabCodeATrouver = []; // code générer par l'ordinateur
var tabCodeATester = []; // code entré par l'utilisateur et à tester
var tabResultat = []; // réponse de l'ordinateur suite au code entré

// Variables nécessaires a l'affichage des réponses
var pNoir = 0;
var pBlanc = 0;


// ************************************************************************
// Action commandées par les boutons de l'interface
boutonNewGame.addEventListener('click', function(e) {testDuJeu();},false);	// Action sur le bouton NewGame
// monBouton2.addEventListener('click', function(e) {addColorButton('choixCouleur');}, false); // Action sur le bouton Annuler
monBouton2.addEventListener('click', function(e) {addLigne();}, false); // Action sur le bouton Annuler
monLevel.addEventListener('click', function(e) {selectLevel(e,monLevel,monBtLevel);}, false);
// monBtLevel.addEventListener('click', function(e) {selectLevel(monLevel,monBtLevel,e);}, false);


boutonColor1.addEventListener('click', function(e) {console.log('toto');},false);
// $(document).ready(function(){ 
//     $("#choixCouleur .btn").click(function(){
//     	var repText = "";
//     	var rep = 0
//     	rep = $(this)["0"].id;
//     	console.log(rep);
//     	if (tabCodeATester.length < 5) {
// 	    	switch(rep) {
// 	    		case "bt1":
// 	    			rep = 1;
// 	    			break;
// 	    		case "bt2":
// 	    			rep = 2;
// 	    			break;
// 	    		case "bt3":
// 	    			rep = 3;
// 	    			break;
// 	    		case "bt4":
// 	    			rep = 4;
// 	    			break;
// 	    		case "bt5":
// 	    			rep = 5;
// 	    			break;
// 	    		case "bt6":
// 	    			rep = 6;
// 	    			break;
// 	    		case "bt7":
// 	    			rep = 7;
// 	    			break;
// 	    		case "bt8":
// 	    			rep = 8;
// 	    			break;
// 	    	}
//     		tabCodeATester.push(rep);
//     	}
//     	console.log("==>" + tabCodeATester);
//     });
// });   

// *******************************************************************
// Fonction ajout ou suppression de boutons de couleur
// nomDeZone = zone concernée par la fonction
function addColorButton(nomDeZone)
{
	var monElement = document.getElementsByClassName('btn-group');
	var maZone = document.getElementById(nomDeZone);
	var nbrDeElements = maZone.childElementCount;
	//var flagRemove = false;

	console.log(monElement);
	console.log(nbrDeElements);
	console.log(maZone);

	if (nbrDeElements < 9) {
		var flagRemove = false;
	} else {
		var flagRemove = true;
	}

	if (!flagRemove && nbrDeElements < 8) { // 
		nbrDeElements++;
		var monNewElement = document.createElement('button');
		monNewElement.setAttribute('id', 'bt' + nbrDeElements);
		monNewElement.setAttribute('type', 'button');
		monNewElement.setAttribute('class', 'btn btn-info btn-sm rounded border');
		monNewElement.innerHTML = nbrDeElements;
		maZone.appendChild(monNewElement);
	} else {
		// var monNewElement = document.removeChild('button');
		var elementToSupp = document.getElementById(nomDeZone);
		elementToSupp.parentNode.removeChild(elementToSupp);
	}
}


//***************************************************************************
// fonction d'ajout des lignes du jeux
function addLigne()
{
	var monElement = document.getElementsByClassName('container');
	var maZone = document.getElementById('lignes');
	var nbrDeElements = maZone.childElementCount;
	
	// Ajout d'éléments selon test
	if (nbrDeElements < 15) {
		nbrDeElements++;

		var index = nbrDeElements - 3;
		var idxsection = "sec" + index;
		var idxdiv = "div" + index;
		var idxbut = "but" + index;
		
		// 1-Ajout de la SECTION
		var monNewElement = document.createElement('section');
		monNewElement.setAttribute('id', idxsection);
		monNewElement.setAttribute('class', idxsection + ' row mx-auto my-1 bg-secondary rounded');
		maZone.appendChild(monNewElement);

		// 2-Ajout des DIV
		for (i = 1; i < 5; i++) {
			var monElement = document.getElementsByClassName(idxsection);
			var maZone = document.getElementById(idxsection);
			var idxdivbis = idxdiv + i;
			var monNewElement = document.createElement('div');
			monNewElement.setAttribute('id', idxdivbis);

			// 21-Construction des DIVs
			switch(i) {
				case 1:
					monNewElement.setAttribute('class', idxdivbis + ' col col-lg-1 d-md-flex bg-dark text-white justify-content-center');
					break;
				case 2:
					monNewElement.setAttribute('class', idxdivbis + ' col col-lg-4 d-md-flex my-1 flex-row justify-content-center');
					break;
				case 3:
					monNewElement.setAttribute('class', idxdivbis + ' col col-lg-4 d-md-flex my-1 flex-row justify-content-center');
					break;
				case 4:
					monNewElement.setAttribute('class', idxdivbis + ' col col-lg-3 d-md-flex bg-dark justify-content-center');
					break;
			} // fin de switch (21)
			maZone.appendChild(monNewElement);

			// 22-Construction des contenus de DIVs
			switch(i) {
				case 1:
					// ajout du H1 en en-tête de ligne
					var monElement = document.getElementsByClassName(idxdivbis);
					var maZone = document.getElementById(idxdivbis);
					var monNewElement = document.createElement('h1');
					monNewElement.innerHTML = index;
					maZone.appendChild(monNewElement);
					break;
				case 2:
					// ajout des zones d'essai
					var monElement = document.getElementsByClassName(idxdivbis);
					var maZone = document.getElementById(idxdivbis);
					for (var j = 1; j < 5; j++) {
						var monNewElement = document.createElement('div');
						monNewElement.setAttribute('class','p-2 bg-white border border-dark rounded');
						monNewElement.innerHTML = "-"+j+"-";
						maZone.appendChild(monNewElement);
					}
					break;
				case 3:
					// ajout des zones de réponse
					var monElement = document.getElementsByClassName(idxdivbis);
					var maZone = document.getElementById(idxdivbis);
					for (var j = 1; j < 5; j++) {
						var monNewElement = document.createElement('div');
						monNewElement.setAttribute('class','my-2 bg-white border border-dark rounded');
						monNewElement.innerHTML = "-"+j+"-";
						maZone.appendChild(monNewElement);
					}
					break;
				case 4:
					// ajout des boutons corriger et valider
					var monElement = document.getElementsByClassName(idxdivbis);
					var maZone = document.getElementById(idxdivbis);
					for (var j = 1; j < 3; j++) {
						var monNewElement = document.createElement('button');
						monNewElement.setAttribute('type', 'button');
						switch(j) {
							case 1:
								monNewElement.setAttribute('class','btn btn-danger rounded my-1');
								monNewElement.innerHTML = "Corriger";
								break;
							case 2:
								monNewElement.setAttribute('class','invisible btn btn-success rounded my-1');
								monNewElement.innerHTML = "Essayer";
								break;
						}
						maZone.appendChild(monNewElement);
					}
					break;
			} // fin de switch (22)
		} // fin de for
	} // fin de if
} // fin de fonction


// ***********************************************************************
// Fonction de sélection du niveau de difficulté
// n = variable évènement
// zoneLevel = 
// btLevel = bouton level sélectionné
function selectLevel(n,zoneLevel,btLevel)
{
    var level = n.target.id;
    console.log(level);

	var monElement = document.getElementsByClassName('btn-group');
	var maZone = document.getElementById('choixCouleur');
	var nbrDeElements = maZone.childElementCount;

	console.log(nbrDeElements);

    switch(level) {
        case "lv1":
        	for (i = 4; i < nbrDeElements; i++) {
        		console.log();
        	}
            break;
        case "lv2":
        	console.log("bonjour")
            break;
        case "lv3":
            break;
        case "lv4":
            break;
        default:
            $(".alert").text("Level 1 (default) : 4 colors / 4 positions / No double");
    }
}


// ************************************************************************
// Fonction de soumission d'une ligne d'essai
// codeATrouver = 
// essai = 
function examEssai(codeATrouver,essai)
{
	var tabCodeNavette = []; // copie du code à trouver pour l'évaluation
	tabCodeNavette = codeATrouver.slice();

	var posIndex = 0; // index utilisé dans la détection des blancs
	
	console.log("code à trouver:" + codeATrouver + " - code à essayer:" + essai + " - TabCodeNavette:" + tabCodeNavette);

	// Cherche les pions Biens Placés (nombre de noirs)
	for (var i = 0; i < tabCodeNavette.length; i++) {
		if (essai[i] == tabCodeNavette[i]) {
			pNoir++;
			tabCodeNavette[i]=null;
		}
	}

	console.log("status navette:" + tabCodeNavette + " - nombreposition:"+nbrPosition);
	
	if (pNoir == nbrPosition) {
		flagWinLoose = true;
		console.log(flagWinLoose);
	} else {
		// Cherche les Mals Placés
		for (var i = 0; i < tabCodeNavette.length; i++) {
			posIndex = essai.indexOf(tabCodeNavette[i]);
			if (posIndex != -1) {
				tabCodeNavette[i]=null;
				pBlanc++;
			}
		}
		console.log("sortie de blanc:" + flagWinLoose);
	}
}


// ************************************************************************
// Fonction d'effacement d'une ligne d'essai


// ************************************************************************
// Fonction générateur de nombres aléatoires bornés
// borneMin = borne inférieur du générateur
// borneMax = borne suppérieur du générateur
// retourne "nombre"
function genNbAleatoire(borneMin,borneMax)
{
	var min = Math.ceil(borneMin);
	var max = Math.floor(borneMax);
	var nombre =  Math.floor(Math.random() * (max - min +1)) + min;
	//console.log("nombre aléatoire : " + nombre);
	return nombre;
}


// ************************************************************************
// Fonction générateur d'un code à trouver
// nombre = nombre de digits
// flagdoublon = autorise ou pas les doublons
// retourne un tableau "monTableau"
function genCodeATrouver(nombre,flagdoublon)
{
	var monTableau = [];
	var i = 0;
	var tirage = 0;

	while (i < nombre) {
		
		tirage = genNbAleatoire(1,nombre);

		if (flagdoublon) {
			// Autorise les doublons
			monTableau[i] = tirage;
		} else {
			// N'autorise pas les doublons
			//console.log("Index :" + monTableau.indexOf(tirage));
			while (monTableau.indexOf(tirage) != -1) {
				tirage = genNbAleatoire(1,nombre);
			}
			monTableau[i] = tirage;
		}
		i++;
		//console.log(monTableau + "<-" + tirage);
	}
	//console.log("Sortie de fonction : " + monTableau);
	return monTableau;
}


// Fonction de sélection des 5 couleurs aléatoires


// Fonction d'affichage du score


// Fonction de comparaison essai et code à trouver


// ************************************************************************
// Fonction test du moteur de jeux
function testDuJeu()
{
	console.log('début du jeux');

	tabCodeATrouver = genCodeATrouver(nbrPosition,false);

	console.log(tabCodeATrouver);

	flagWinLoose = false;
	var Tour = 1; //initialise le premier tour de jeu

	while (Tour <= 12 && !flagWinLoose) {
		var chaine = prompt("Veuillez entrer votre essai");
		tabCodeATester = chaine.split(",");
		
		for (var i = 0; i < tabCodeATester.length; i++) {
			tabCodeATester[i] = parseInt(tabCodeATester[i]);
		}

		console.log("Tour n°" + Tour);
		examEssai(tabCodeATrouver,tabCodeATester);
		console.log("Noir:" + pNoir + " - Blanc:" + pBlanc + " - flagWinLoose:" + flagWinLoose);

		if(flagWinLoose) {
			console.log("Bravo, vous avez gagné !");
		} else {
			if (Tour == 12) {
				console.log("Désolé, vous avez perdu ! Recommancez");
			} else {
				Tour++;
				pBlanc=0;
				pNoir=0;				
			}
		}
	}
	console.log("Fin de partie");
}


// Déroulement du jeu

// 1 - Initialisation du jeu
// 2 - Reglage du niveau
// 3 - Tirage aléatoire du code
// 4 - Evaluation des essais du joueur :
	// tant que nombre d'essais <12 OU que flag "Gagné" est faux
		// incrémentation du nombre d'essai
		// entrée de l'essai de l'utilisateur (avec possibilité de correction)
		// validation et évaluation de l'essai
		// si combinaison trouvé => flag "Gagné" = true
// 5 - Gestion de l'affichage de fin
	// si flag "Gagné" = true alors afficher "Gagné en nombre d'essais"
	// sinon flag "Gagné" toujours = false et afficher "Perdu" et combinaison à trouver

	//document.addEventListener("DOMContentLoader", function(event) {newGame();}); // pour lancer une fonction lorsque tout le DOM est lancé
		