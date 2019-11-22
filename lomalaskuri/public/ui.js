$(window).resize(function(){
	if ($(window).width() > 960) {
				 $('#places').removeAttr('style'); //
	}
	})
	function openMenu(x) {
	x.classList.toggle("change");
		 $( "#places" ).animate({
opacity: 1,
width: "toggle"
}, 100, function() {
});
}
console.log(Cookies.get('site'));
	if(Cookies.get('site') == 'none') {	
		window.location.replace("None/index.html");
	}
	else if (Cookies.get('site') == 'Lauri') {
		window.location.replace("Laurinlahden_koulu/index.html");
	}
	else if (Cookies.get('site') == 'Hauki') {	
		window.location.replace("Haukilahden_koulu/index.html");
	}
	else if (Cookies.get('site') == 'Noka') {
	}
	function SchoolChanger() {
		window.location.replace("https://www.lomalaskuri.tk");
		Cookies.set('site', '');
	}
	function button() {
		$(".cookie").fadeOut()
		if(document.getElementById("NotEverAgain").checked == true) {
			Cookies.set('NotEverAgain', 'true');
			console.log(Cookies.get('NotEverAgain'));
		}
		else {
			Cookies.set('NotEverAgain', 'false');
		}
			
	}
	$( ".cookie" ).ready(function() {
			if(Cookies.get('NotEverAgain') == 'true') {
		$(".cookie").remove()
		console.log('supposedly did ths');
	}
	});
	if(Cookies.get('dark') == 'true') {
				$("<link/>", {
		rel: "stylesheet",
		type: "text/css",
		href: "dark.css"
		}).appendTo("head");
	$( "#dynaaminenNappi" ).ready(function() {
		$("#dynaaminenNappi").html("Vaihda päivätilaan");
	});
		
	}
	else {
	$( "#dynaaminenNappi" ).ready(function() {
		$("#dynaaminenNappi").html("Vaihda yötilaan");
	});
	}
	function darkFunction() {
	if(document.getElementById("dynaaminenNappi").textContent == "Vaihda yötilaan") {
		$("<link/>", {
		rel: "stylesheet",
		type: "text/css",
		href: "dark.css"
		}).appendTo("head");
		$("#dynaaminenNappi").html("Vaihda päivätilaan");
		Cookies.set('dark', 'true');
	}
	else {
		$('link[href="dark.css"]').remove();
		$("#dynaaminenNappi").html("Vaihda yötilaan");
		Cookies.set('dark', 'false');
	}
}