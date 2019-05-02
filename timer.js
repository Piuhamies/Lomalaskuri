// dynamic timer engine
// Lisätäksesi laskettavia kohteita lisää object timers muuttujaan ja käynistä funktio pushElements()

var timers = [   
	{nimi: "Aikaa kesälomaan: ", start: new Date("Jun 1, 2019 12:00:00"), end: new Date("Aug 8, 2019 10:00:00")  },   
	{nimi: "Aikaa Syyslomaan:", start: new Date("Oct 14, 2019 00:00:00"), end: new Date("Oct 18, 2019 00:00:00") },
	{nimi: "Aikaa Joululomaan", start: new Date("Dec 21, 2019 00:00:00"), end: new Date("Jan 6, 2019 00:00:00") },
	{nimi: "Aikaa Hiihtolomaan:", start: new Date("Feb 17, 2020 00:00:00"), end: new Date("Feb 21, 2020 00:00:00") },
	{nimi: "Aikaa Pääsiäislomaan", start: new Date("Apr 18 2019 16:00:00"), end: new Date("Apr 23 2019 8:30:00") }
]; //Kaikki nykyiset lomat

var timeNames = [{nimi: "weeks", shortened: "wk"},
 {nimi:"days", shortened: "d"},
 {nimi: "hours", shortened: "h"},
 {nimi: "minutes", shortened: "min"}, 
 {nimi: "seconds", shortened: "s"},
 {nimi: "milliseconds", shortened: "ms"}
 ];
var currentYear = new Date().getFullYear(); //säilytetään nykyinen vuosi muuttujassa, koska sitä käytetään monessa paikkaa

 $(document).ready(function() {
	pushElements();
	updateYear();
 });
	var objectIds = [];

function updateYear() {
	timers.forEach(function(element, index) {
		element.start.setFullYear(currentYear); 
		element.end.setFullYear(currentYear); 
	});
}
function pushElements() {
	var content = document.getElementById("timerArea");
	content.innerHTML = ''; // varmistetaan että alue jolle kirjoitetaan on tyhjä
	timers.forEach(function(element, index) {
		
	var title = document.createElement("h2"); // luodaan otsikko jokaiselle timerille
	title.innerText = element.nimi; //asetetaan otsikoksi sen loman nimi jonka kohdalla ollaan
	title.setAttribute("class", "alaotsikot"); 	// asetetaan otsikon luokka(class)

	var ajat = document.createElement("Div"); // luodaan <div> johon tulee itse countdown timeri
	ajat.setAttribute("class", "ajat");	 // asetetaan sen luokaksi ajat

	var timeObjects = [];
	var oldIndex = index;
	timeNames.forEach(function(element, index) {
		timeObjects.push(document.createElement("p"));
		timeObjects[index].setAttribute("id", element.nimi + oldIndex);
		timeObjects[index].setAttribute("class", element.nimi); // asetetaan luokaksi se jota aikayksikköä kyseinen objekti edustaa, tämä helpottaa objektien piilotusta myöhemmin
		ajat.appendChild(timeObjects[index]);
});
	
var div = document.createElement("Div"); //luodaan <div> elementti jokaista timeriä kohden .
div.setAttribute("id", "timer" + index); // asetetaan näiden <div> elementien ideet.
div.appendChild(title);
div.appendChild(ajat);

content.appendChild(div);  // lisätään div objectit body osioon     
                  
});
	}	
setInterval(function() {
	
	var nyt = new Date().getTime();
	timers.forEach(function(element, index) {
		var start = element.start.getTime();
		var end = element.end.getTime();
			if ((start -nyt ) > 0 ) { //jos lomaan on vielä aikaa näytä loma timeri
				var distance = [
					Math.floor((start - nyt) / (1000* 60 * 60* 24* 7)), //maaginen seiskalla jako(viikot)
				    Math.floor((start - nyt) % (1000 * 60 *60*24 *7) / (1000* 60* 60 *24)), //päivät
					Math.floor((start- nyt) % (1000 * 60*60 * 24) / (1000* 60*60)), // tunnit
					Math.floor((start - nyt) % (1000* 60* 60) / (1000* 60)), //minuutit
					Math.floor((start - nyt) % (1000*60) / 1000 ), //sekunnit
					Math.floor((start- nyt) % 1000 ) // millisekunnit
				]
				for(len = timeNames.length, i=0; i<len; ++i) { //kunnolla optimoitu for-looppi prefix lisäyksellä ja kaikella 
					var object = document.getElementById(timeNames[i].nimi + index) // hae objekti johon asetamme arvon
					if ( i==0 ) {
						object.innerHTML = distance[i] + timeNames[i].shortened;
					}
					else if ( i > 0 && document.getElementById(timeNames[i].nimi + "Btn").checked == true) {
						object.innerHTML = distance[i] + timeNames[i].shortened;
					}
					else {
						object.innerHTML = "";
					}
				}
			}
			else if ((end- nyt) > 0 ) { //jos loma on nyt näytä koulun alku timeri
			}
			else {
				element.start.setFullYear(currentYear +1); 
				element.end.setFullYear(currentYear +1); 
			}
		
	});
}, 100);	
