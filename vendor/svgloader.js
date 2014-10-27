import Snap from 'vendor/snapsvg';

function extend( a, b ) {
	for( var key in b ) { 
		if( b.hasOwnProperty( key ) ) {
			a[key] = b[key];
		}
	}
	return a;
}

function SVGLoader( el, options ) {
	this.el = el;
	this.options = extend( {}, this.options );
	extend( this.options, options );
	this._init();
}

SVGLoader.prototype.options = {
	speedIn : 1000,
	easingIn : mina.linear,
	speedOut: 1000,
	easingOut : mina.linear,
}

SVGLoader.prototype._init = function() {
	var s = Snap( this.el.querySelector( 'svg' ) );
	this.path = s.select( 'path' );
	this.initialPath = this.path.attr('d');
	
	var openingStepsStr = this.el.getAttribute( 'data-opening' );
	this.openingSteps = openingStepsStr ? openingStepsStr.split(';') : '';
	this.openingStepsTotal = openingStepsStr ? this.openingSteps.length : 0;
	if( this.openingStepsTotal === 0 ) return;

	// if data-closing is not defined then the path will animate to its original shape
	var closingStepsStr = this.el.getAttribute( 'data-closing' ) ? this.el.getAttribute( 'data-closing' ) : this.initialPath;
	this.closingSteps = closingStepsStr ? closingStepsStr.split(';') : '';
	this.closingStepsTotal = closingStepsStr ? this.closingSteps.length : 0;
	
	this.isAnimating = false;

	if( !this.options.speedOut ) {
		this.options.speedOut = this.options.speedIn;
	}
	if( !this.options.easingOut ) {
		this.options.easingOut = this.options.easingIn;
	}
}

SVGLoader.prototype.show = function() {
	if( this.isAnimating ) return false;
	this.isAnimating = true;
	// animate svg
	var self = this,
		onEndAnimation = function() {
			classie.addClass( self.el, 'pageload-loading' );
		};
	this._animateSVG( 'in', onEndAnimation );
	classie.add( this.el, 'show' );
}

SVGLoader.prototype.hide = function(options) {

	var delay = 0;

	if ('delay' in options) {
		delay = options.delay;
	}

	var _this = this;
	setTimeout( function() {
		classie.removeClass( _this.el, 'pageload-loading' );
		_this._animateSVG( 'out', function() { 
			_this.path.attr( 'd', _this.initialPath );
			classie.removeClass( _this.el, 'show' );
			self.isAnimating = false; 
		} );
	}, delay);
}

SVGLoader.prototype._animateSVG = function( dir, callback ) {
	var self = this,
		pos = 0,
		steps = dir === 'out' ? this.closingSteps : this.openingSteps,
		stepsTotal = dir === 'out' ? this.closingStepsTotal : this.openingStepsTotal,
		speed = dir === 'out' ? self.options.speedOut : self.options.speedIn,
		easing = dir === 'out' ? self.options.easingOut : self.options.easingIn,
		nextStep = function( pos ) {
			if( pos > stepsTotal - 1 ) {
				if( callback && typeof callback == 'function' ) {
					callback();
				}
				return;
			}
			self.path.animate( { 'path' : steps[pos] }, speed, easing, function() { nextStep(pos); } );
			pos++;
		};

	nextStep(pos);
}

export default SVGLoader;
