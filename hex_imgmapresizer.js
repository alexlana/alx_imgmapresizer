function hex_imgmapresizer() {
  const mapas = document.getElementsByTagName('map');
  window.addEventListener( 'load', ()=>{
    for ( var i=0; i<mapas.length; i++ ) {
      var imagem = document.querySelector('img[usemap="#'+mapas[i].getAttribute('name')+'"]');
      var r = imagem.width/imagem.naturalWidth;
      var areas = mapas[i].getElementsByTagName('area');
      var dcoords = new Array();
      for ( var j=0; j<areas.length; j++ ) {
        var coords = areas[j].getAttribute('coords').split(',');
        dcoords[j] = coords;
        coords = coords.map( (c)=>{return Math.round(c*1*r);} );
        coords = coords.join(',');
        areas[j].setAttribute('coords',coords);
      }
      mapas[i].setAttribute('data-coords', JSON.stringify(dcoords) );
    }
  } );
  window.addEventListener( 'resize', ()=>{
    for ( var i=0; i<mapas.length; i++ ) {
      var imagem = document.querySelector('img[usemap="#'+mapas[i].getAttribute('name')+'"]');
      var r = imagem.width/imagem.naturalWidth;
      var areas = mapas[i].getElementsByTagName('area');
      var dcoords = JSON.parse( mapas[i].getAttribute('data-coords') );
      for ( var j=0; j<areas.length; j++ ) {
        var coords = dcoords[j];
        coords = coords.map( (c)=>{return Math.round(c*1*r);} );
        coords = coords.join(',');
        areas[j].setAttribute('coords',coords);
      }
    }
  } );
}
