const hex_mapas = document.getElementsByTagName('map');
function hex_imgmapresizer() {
	window.addEventListener( 'load', ()=>{
		for ( var i=0; i<hex_mapas.length; i++ ) {
			var areas = hex_mapas[i].getElementsByTagName('area');
			var dcoords = new Array();
			for ( var j=0; j<areas.length; j++ ) {
				var coords = areas[j].getAttribute('coords').split(',');
				dcoords[j] = coords;
			}
			hex_mapas[i].setAttribute('data-coords', JSON.stringify(dcoords) );
		}
		hex_resizemap();
	} );
	window.addEventListener( 'resize', hex_resizemap );
}
function hex_resizemap () {
	for ( var i=0; i<hex_mapas.length; i++ ) {
	  var imagem = document.querySelector('img[usemap="#'+hex_mapas[i].getAttribute('name')+'"]');
	  var r = imagem.width/imagem.naturalWidth;
	  var areas = hex_mapas[i].getElementsByTagName('area');
	  var dcoords = JSON.parse( hex_mapas[i].getAttribute('data-coords') );
	  for ( var j=0; j<areas.length; j++ ) {
	    var coords = dcoords[j];
	    coords = coords.map( (c)=>{return Math.round(c*1*r);} );
	    coords = coords.join(',');
	    areas[j].setAttribute('coords',coords);
	  }
	}
}
