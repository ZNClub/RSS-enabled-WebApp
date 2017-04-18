
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
		
		
		console.log("ajax success");
		myFunction(data);
		setTimeout(loadDoc,5000);
	});
}

function myFunction(data) {
  
	console.log(parse(data));
	
	
	var data = new DOMParser().parseFromString(data, "text/xml");
	var item = document.evaluate( '//rss//channel//item', data, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );	
	var it=item.iterateNext();
	count = 0;
	var child=[];
	while(it){
		count+=1;
		var start='<?xml version="1.0" encoding="UTF-8"?><item>';
		var end='</item>';
		var data = new DOMParser().parseFromString(start+it.innerHTML+end, "text/xml");
	
		var ititle=document.evaluate('item//title',data,null,XPathResult.STRING_TYPE,null);
		var ilink=document.evaluate('item//link',data,null,XPathResult.STRING_TYPE,null);
		var ipub=document.evaluate('item//pubDate',data,null,XPathResult.STRING_TYPE,null);
		console.log(ititle.stringValue);
		console.log(ilink.stringValue);
		console.log(ipub.stringValue);
		
			// check no of elements in timeline $('.result')
		
		var begin='<div class="line text-muted"></div>';
		var date='<div class="separator text-muted"><time>'+ipub.stringValue+'</time></div>';
		var start='<article class="panel panel-primary">';
		var icon='<div class="panel-heading icon"><i class="glyphicon glyphicon-plus"></i></div>';
		var head='<div class="panel-heading"><h2 class="panel-title">'+ititle.stringValue+'</h2></div>';
		var body='<div class="panel-body"><a href="'+ilink.stringValue+'" target="_blank">Read Now</a></div>';
		var end='</article>';
		var html=begin+date+start+icon+head+body+end;
		
		//$('.timeline').append(html);
		child.push(html);
		it=item.iterateNext();
		
	}
	$('.timeline').empty();
	for(var i=0;i<child.length;i++){
		$('.timeline').append(child[i]);
	}
	
	



	  
}
