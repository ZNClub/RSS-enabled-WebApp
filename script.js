
function loadDoc() {
	console.log("onclick");
  /*  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", "https://raw.githubusercontent.com/ZNClub/RSS-enabled-WebApp/master/rss.xml", true);
  xhttp.send(); 
   */
  $.get( "https://raw.githubusercontent.com/ZNClub/RSS-enabled-WebApp/master/rss.xml", function( data ) {
  $( ".result" ).html( data );
  alert( "Load was performed." );
  myFunction(data);
});
  
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
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
}
