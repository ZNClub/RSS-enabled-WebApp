
// main onload
$(document).ready(function() {
	loadDoc();

});


// flattens an object (recursively!), similarly to Array#flatten
// e.g. flatten({ a: { b: { c: "hello!" } } }); // => "hello!"
function flatten(object) {
  var check = _.isPlainObject(object) && _.size(object) === 1;
  return check ? flatten(_.values(object)[0]) : object;
}

function parse(xml) {
  var data = {};

  var isText = xml.nodeType === 3,
      isElement = xml.nodeType === 1,
      body = xml.textContent && xml.textContent.trim(),
      hasChildren = xml.children && xml.children.length,
      hasAttributes = xml.attributes && xml.attributes.length;

  // if it's text just return it
  if (isText) { return xml.nodeValue.trim(); }

  // if it doesn't have any children or attributes, just return the contents
  if (!hasChildren && !hasAttributes) { return body; }

  // if it doesn't have children but _does_ have body content, we'll use that
  if (!hasChildren && body.length) { data.text = body; }

  // if it's an element with attributes, add them to data.attributes
  if (isElement && hasAttributes) {
    data.attributes = _.reduce(xml.attributes, function(obj, name, id) {
      var attr = xml.attributes.item(id);
      obj[attr.name] = attr.value;
      return obj;
    }, {});
  }

  // recursively call #parse over children, adding results to data
  _.each(xml.children, function(child) {
    var name = child.nodeName;

    // if we've not come across a child with this nodeType, add it as an object
    // and return here
    if (!_.has(data, name)) {
      data[name] = parse(child);
      return;
    }

    // if we've encountered a second instance of the same nodeType, make our
    // representation of it an array
    if (!_.isArray(data[name])) { data[name] = [data[name]]; }

    // and finally, append the new child
    data[name].push(parse(child));
  });

  // if we can, let's fold some attributes into the body
  _.each(data.attributes, function(value, key) {
    if (data[key] != null) { return; }
    data[key] = value;
    delete data.attributes[key];
  });

  // if data.attributes is now empty, get rid of it
  if (_.isEmpty(data.attributes)) { delete data.attributes; }

  // simplify to reduce number of final leaf nodes and return
  return flatten(data);
}


function loadDoc() {
	console.log("onclick");
	//https://raw.githubusercontent.com/ZNClub/RSS-enabled-WebApp/master/rss.xml
	//https://nevildsouza.wordpress.com/feed/
	// rss.xml fails
	$.get( "https://raw.githubusercontent.com/ZNClub/RSS-enabled-WebApp/master/rss.xml", function( data ) {
		//$( ".result" ).html( data );
		//alert( "Load was performed." );
		console.log("ajax success");
		myFunction(data);
		setTimeout(loadDoc,120000);
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
	var data = new DOMParser().parseFromString(data, "text/xml");
	var item = document.evaluate( '//rss//channel', data, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
	
	var it=item.iterateNext();
	while(it){
		
		
		var data = new DOMParser().parseFromString(it.innerHTML, "text/xml");
		//var title=document.evaluate('link',data,null,XPathResult.ANY_TYPE,null);
		//xmlDoc =$.parseXML(data);
		//$item = $(xmlDoc);
		//var title=$item.find("title");
		//var title = data.getElementsByTagName("title");
		
		
		
		//console.log(data);
		
		it=item.iterateNext();
	}
	
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
