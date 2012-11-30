var rnd = function(limit){
	return Math.floor((Math.random()*limit)+1);
}

function zeroFill( number, width ){
  width -= number.toString().length;
  if ( width > 0 ) return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  return number + "";
}