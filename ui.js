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
		document.getElementById("SameSchool").addEventListener("click", school);
		function school() {
			Cookies.set('site', 'Noka');
			$(".modal").remove();
			console.log("bug");
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
