(function( $ ) {
 
    $.fn.teqOverlay = function( options ) {

		var defaults = {
			overlayAttrs: {
				id: 'overlay'
			},
			overlayCSS: {
				display   : "block",
				background: "#000",
				opacity   : "0.5",
				position  : "fixed",
				top       : 0,
				left      : 0,
				width     : $(window).width(),
				height    : $(window).height(),
				zIndex    : 9999999
			},
			overlayFrom: $('a[data-overlay]'),
			overlayID  : "overlay",

			onInit: function(){
				console.log("Default CB - onInit called");
			},

			onShow: function(){

			},

			onComplete: function(){

			},

			init: function(){
				/* find elements to be overlaid */
				
				//find if overlayFrom param is a simple string or a selector
				
				if(typeof this.overlayFrom == 'string' || this.overlayFrom instanceof String){

					this.overlayFrom = $(this.overlayFrom);
					
				}

				console.log(this.overlayFrom);

				if(this.overlayFrom.length > 0){

					this.addOverlayToStage();
					this.bindClickEvents();
				}
				else{
					console.log("Error : jQuery couldn't find the element specified with the selector you used ("+this.overlayFrom.selector+')');
					return false;
				}
			},

			addOverlayToStage: function(){
				$('<div/>')
					.attr(this.overlayAttrs)
					.css(this.overlayCSS)
				.appendTo($('body'));
			},

			bindClickEvents: function(){
				console.log('binding click events...');
			},

			initOverlays: function( overlay ){
				console.log('plugin init done');
				settings.onInit.call( this );

				console.log( overlay );
			}
		};
 
       	var settings = $.extend( true, {}, defaults, options );

       	settings.init();

       	return this.each(function () {

       		var $this = $(this);

       		
       	});


    };

 

	$(document).teqOverlay({
		onInit: function(){
			console.log("Overloaded CB - onInit called");
		},
		overlayFrom: $('a'),
		overlayCSS:{}
	});
 
}( jQuery ));