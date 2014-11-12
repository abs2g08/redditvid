import SVGLoader from 'vendor/svgloader';
import { stop, animate } from "vendor/liquid-fire";

export default function(oldView, insertNewView) {

  var loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 250 } );
  loader.show();
  stop(oldView);

  return animate(oldView, {opacity: 0})
    .then(insertNewView)
    .then(function(newView){
      loader.hide();
      return animate(newView, {opacity: [1, 0]}, {duration:10});
  });
}
