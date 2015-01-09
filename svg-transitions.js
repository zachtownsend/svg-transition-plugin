// SVG transitions by Zach Townsend
;(function( $, window, document, undefined ) {
				
		$.fn.svgTransition = function( options ) {
			var id = getID( this );
			var s = Snap(id);
			
			var settings = $.extend({
				//Default settings
				shape: this.children().filter(':first'),
				initial_state: null,
				steps_in: null,
				steps_out: null,
				speed: 200,
				easing: null
			}, options );
			
			var shape_type = settings.shape[0].nodeName;
			var active_shape = s.select(getID( settings.shape ));
			
			if(settings.initial_state === null) settings.initial_state = get_initial_state(settings.shape[0]);
			if(settings.steps_out === null) settings.steps_out = settings.initial_state;
			
			function get_initial_state(shape) {
				function set_attr(attr) {
					return settings.shape.attr(attr);
				}
				switch(shape_type) {
					case 'rect' :
						return {
							x: set_attr('x'),
							y: set_attr('y'),
							width: set_attr('width'),
							height: set_attr('height'),
							rx: set_attr('rx'),
							ry: set_attr('ry')
						}
						break;
						
					case 'circle' :
						return {
							cx: set_attr('cx'),
							cy: set_attr('cy'),
							r: set_attr('r')
						}
						break;
						
					case 'elipse' :
						return {
							cx: set_attr('cx'),
							cy: set_attr('cy'),
							rx: set_attr('rx'),
							ry: set_attr('ry')
						}
						break;
						
					case 'line' :
						return {
							x1: set_attr('x1'),
							y1: set_attr('y1'),
							x2: set_attr('x2'),
							y2: set_attr('y2')
						}
						break;
						
					case 'polyline' :
						return {
							points: set_attr('points')
						}
						break;
						
					case 'polygon' :
						return {
							points: set_attr('points')
						}
						break;
				}
			}
			
			function getID( selector ) {
				var id = selector.attr('id') != 'undefined' ? '#' + selector.attr('id') 
				: selector.attr('class') != 'undefined' ? '.' + selector.attr('class')
				: selector.prop('tagName');
				return id;
			}
						
			var methods = {
				animate_shape: function(dir, callback) {
					var isIn = dir === 'in';
					var steps = isIn ? settings.steps_in : settings.steps_out;
					var pos = 0;
					var nextStep = function(pos) {
						if(pos > steps.length - 1) {
							if( callback && typeof callback == 'function' ) {
								callback();
							}
							return true;
						}
						if(isIn) active_shape.attr(settings.initial_state);
						active_shape.animate(steps[pos], settings.speed, settings.easing, function(){ nextStep(++pos); });
					}
					nextStep(pos);
				}
			}
			
			return {
				play: methods.animate_shape
			}
			
		};
	})( jQuery );