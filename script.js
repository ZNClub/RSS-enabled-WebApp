
function loadDoc() {
	console.log("onclick");
  
	$.get( "https://raw.githubusercontent.com/ZNClub/RSS-enabled-WebApp/master/rss.xml", function( data ) {
		//$( ".result" ).html( data );
		//alert( "Load was performed." );
		console.log("ajax success");
		myFunction(data);		
	});
}
function myFunction(data) {
  /*var i;
  var xmlDoc = xml.responseXML;
  console.log("data log:");
  console.log(xml);
  var table="<tr><th>Artist</th><th>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("CD");
  for (i = 0; i <x.length; i++) { 
    table += "<tr><td>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
  */
  xmlDoc = $.parseXML(data);
  console.log(xmlDoc);
  $xml=$(xmlDoc);
  console.log($xml);
  
}
