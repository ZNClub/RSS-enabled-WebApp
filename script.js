
// main onload
$(document).ready(function() {
	loadDoc();

});


function loadDoc() {
	console.log("onclick");
  
	$.get( "https://raw.githubusercontent.com/ZNClub/RSS-enabled-WebApp/master/rss.xml", function( data ) {
		//$( ".result" ).html( data );
		//alert( "Load was performed." );
		console.log("ajax success");
		myFunction(data);
		setTimeout(loadDoc,10000);
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
  /*
  xmlDoc = $.parseXML(data);
  //console.log(xmlDoc);
  $xml=$(xmlDoc);
  //console.log($xml);
  $channel=$xml.find("rss").find("channel");
  console.log($channel.find("title").text());
  */
	
	
	// test 
	var content = document.evaluate( '//rss', data, null, XPathResult.ANY_TYPE, null );
	console.log(content);
	//var paragraphCount = document.evaluate( 'count(//p)', document, null, XPathResult.ANY_TYPE, null );
	
	// iteration
	/*
	var iterator = document.evaluate('//channel', documentNode, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );

	try {
	  var thisNode = iterator.iterateNext();
	  
	  while (thisNode) {
		alert( thisNode.textContent );
		thisNode = iterator.iterateNext();
	  }	
	}
	catch (e) {
	  dump( 'Error: Document tree modified during iteration ' + e );
	}
	*/
	  
}
