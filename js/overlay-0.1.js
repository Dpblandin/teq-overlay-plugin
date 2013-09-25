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
			overlayTransition  : {
				type: "show", 
				duration: 0
			},
			contentContainer : $('div.overlay-content'),
			addCloseBtn: false,
			closeBtnAttrs:{
				ID: 'overlay-close'
			},
			closeBtnCSS: {
				position: "absolute",
				top      : 0,
				right    : 0,
				cursor   : "pointer"
			}
		};

		var methods = {


			onInitCB: function(){

			},

			onShowCB: function(){

			},

			onCompleteCB: function(){

			},

			afterContentLoadCB: function(){

			},

			init: function(element){
				/* find elements to be overlaid */
				var done = false;
				//find if overlayFrom param is a simple string or a selector

				if(typeof settings.contentContainer == 'string' || settings.contentContainer instanceof String){
					settings.contentContainer = $(settings.contentContainer);
				}

				if(settings.contentContainer.length == 0)
				{
					window.console.log && console.log("Error : jQuery couldn't find the content container specified with the selector you used ("+settings.contentContainer.selector+')');
					return false;
				}

				if(element.length > 0){

					methods.addOverlayToStage();
					methods.bindClickEvents(element, settings.overlayClose);
					done = !done;
				}
				else{
					window.console.log && console.log("Error : jQuery couldn't find the element specified with the selector you used ("+element.selector+')');
					return false;
				}

				done ? settings.onInitCB() : '';
			},

			addOverlayToStage: function(){
				window.console.log && console.log('Adding overlay to stage...');
				
				if($("#"+settings.overlayAttrs.ID).length == 0)
				{
					settings.contentContainer.wrap(
						$('<div/>')
						.attr(settings.overlayAttrs)
						.css(settings.overlayCSS)
					);
	
				}
			
				window.console.log && console.log('------------DONE---------------');
			},

			bindClickEvents: function(element, closeElement){
				window.console.log && console.log('binding click events...');

				element.bind("click", function(e) {
					e.preventDefault();
					
					/* Show or transition overlay */
					switch (settings.overlayTransition.type) {

						case "fadeIn":
							$('div#'+settings.overlayAttrs.ID).fadeIn(settings.overlayTransition.duration);
						break;

						default:
							$('div#'+settings.overlayAttrs.ID).show();
						break;
						
					}

					/* load content for overlay */

					methods.loadOverlayContent(element.attr('href'));
								
				});
				window.console.log && console.log('------------DONE---------------');
			},

			loadOverlayContent: function( hrefLink ) {
				window.console.log && console.log("loading content...");
				settings.contentContainer.load(hrefLink, function(){
					if(settings.addCloseBtn){
					methods.addCloseButton();
					} 
				}).show();
				
				window.console.log && console.log('------------DONE---------------');
			},

			addCloseButton: function() {
				window.console.log && console.log("adding close btn...");
				if($("#"+settings.closeBtnAttrs.ID).length == 0 ){

					$('<div/>')
					.attr(settings.closeBtnAttrs)
					.css(settings.closeBtnCSS)
					.html('x')
					.prependTo(settings.contentContainer)
					.bind("click", function(e){
						e.preventDefault();
						$(this).parent().hide();
						$("#"+settings.overlayAttrs.ID).hide();
					});	
					
				}
				window.console.log && console.log('------------DONE---------------');
			}
		

		};

 		
       
       	return this.each(function () {

       		var $this = $(this);

       		settings = $.extend(true, {}, defaults, options );

       		
       		methods.init($this);
       		
       	});


    };
 
}( jQuery ));