(function( $ ) {
 
    $.fn.teqOverlay = function( options ) {

		var defaults = {
			overlayAttrs: {
				ID: 'overlay'
			},
			overlayCSS: {
				display   : "none",
				background: "rgba(0,0,0,.5)",
				opacity   : "1",
				position  : "fixed",
				top       : 0,
				left      : 0,
				width     : $(window).width(),
				height    : $(window).height(),
				zIndex    : 9999999
			},
			overlayFrom        : $('a[data-overlay]'),
			overlayTransition  : {
				type: "show", 
				duration: 0
			},
			contentContainer : $('div.overlay-content'),

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

				if(typeof this.contentContainer == 'string' || this.contentContainer instanceof String){
					this.contentContainer = $(this.contentContainer);
				}

				if(this.contentContainer.length == 0)
				{
					console.log("Error : jQuery couldn't find the content container specified with the selector you used ("+this.contentContainer.selector+')');
					return false;
				}

				if(this.overlayFrom.length > 0){

					this.addOverlayToStage();
					this.bindClickEvents(this.overlayFrom, this.overlayClose);
				}
				else{
					console.log("Error : jQuery couldn't find the element specified with the selector you used ("+this.overlayFrom.selector+')');
					return false;
				}
			},

			addOverlayToStage: function(){
				console.log('Adding overlay to stage...');
				
				this.contentContainer.wrap(
					$('<div/>')
					.attr(this.overlayAttrs)
					.css(this.overlayCSS)
				);

				console.log('------------DONE---------------');
			},

			bindClickEvents: function(links, closeElement){
				console.log('binding click events...');
				var that = this;
				links.each(function() {
					var link = $(this);

					link.bind("click", function(e) {
						e.preventDefault();
						
						/* Show or transition overlay */
						switch (that.overlayTransition.type) {

							case "fadeIn":
								$('div#'+that.overlayAttrs.ID).fadeIn(that.overlayTransition.duration);
							break;

							default:
								$('div#'+that.overlayAttrs.ID).show();
							break;
							
						}

						/* load content for overlay */

						that.loadOverlayContent(link.attr('href'));
									
					});
				});
				console.log('------------DONE---------------');
			},

			loadOverlayContent: function( hrefLink ) {
				console.log("loading content...");
				this.contentContainer.load(hrefLink);
				console.log('------------DONE---------------');
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
		overlayCSS:{},
		overlayTransition : {},
		contentContainer: $('.overlay-content')
	});
 
}( jQuery ));