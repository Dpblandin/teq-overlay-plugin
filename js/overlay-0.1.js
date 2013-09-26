(function( $ ) {
 
    $.fn.teqOverlay = function( options ) {

		var defaults = {
			overlayAttrs: {
				ID: 'overlay'
			},
			overlayCSS: {
				display   : "none",
				background: "rgba(0,0,0,.8)",
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
			},
			closeBtnHtml: "x",
			closeTransition: {
				type: "hide",
				duration: 0
			}
		};

		var methods = {

			/* CB (callback) methods */
			onInitCB: function(){

			},

			onShowCB: function(){

			},

			onCompleteCB: function(){

			},

			afterContentLoadCB: function(){

			},

			/* Init method */
			init: function(element){

				/* find elements to be overlaid */
				var done = false;

				/* Check if contentContainer param is passed as a simple string or a selector */

				if(typeof settings.contentContainer == 'string' || settings.contentContainer instanceof String){
					settings.contentContainer = $(settings.contentContainer);
				}

				/* Abort if no element matches selector */
				if(settings.contentContainer.length == 0)
				{
					window.console.log && console.log("Error : jQuery couldn't find the content container specified with the selector you used ("+settings.contentContainer.selector+')');
					return false;
				}

				/* If an element is found, add background overlay and bind click events for links */
				if(element.length > 0){

					methods.addOverlayToStage();
					methods.bindClickEvents(element, settings.overlayClose);
					done = !done;
				}
				else{
					window.console.log && console.log("Error : jQuery couldn't find the element specified with the selector you used ("+element.selector+')');
					return false;
				}

				/* When all is done, call callback */
				done ? settings.onInitCB() : '';
			},

			/* Add background overlay */
			addOverlayToStage: function(){
				window.console.log && console.log('Adding overlay to stage...');
				
				/* Check wether a background has already beend added or not */
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
			/* Bind click events to matched elements to show overlay content */
			bindClickEvents: function(element, closeElement){
				window.console.log && console.log('binding click events...');

				element.bind("click", function(e) {
					e.stopPropagation();
					e.preventDefault();
					/* Show or transition overlay. Default method is show() */
					
					methods.showOverlayWithTransition($('div#'+settings.overlayAttrs.ID));

					/* Pass href element attribute to loading method */

					methods.loadOverlayContent(element.attr('href'));
								
				});
				window.console.log && console.log('------------DONE---------------');
			},
			/* Load overlay content into content container, checks wether to add a close button or not */
			loadOverlayContent: function( hrefLink ) {
				window.console.log && console.log("loading content...");
				settings.contentContainer.load(hrefLink, function(){
					if(settings.addCloseBtn){
					methods.addCloseButton();
					} 
				}).show();
				
				window.console.log && console.log('------------DONE---------------');
			},

			/* Add a close button to overlay if necessary, then bind click event on that button in order to hide overlay */
			addCloseButton: function() {
				window.console.log && console.log("adding close btn...");

				if($("#"+settings.closeBtnAttrs.ID).length == 0 ){

					var overlayContainer = $("#"+settings.overlayAttrs.ID);

					$('<div/>')
					.attr(settings.closeBtnAttrs)
					.css(settings.closeBtnCSS)
					.html(settings.closeBtnHtml)
					.prependTo(settings.contentContainer)
					.bind("click", function(e){
						e.preventDefault();
						methods.hideElementWithTransition(overlayContainer);
					});

					settings.contentContainer.bind("click", function(e){
						e.stopPropagation();
					})

					$(document).bind("click", function(e){
						e.stopPropagation();
						methods.hideElementWithTransition(overlayContainer);
					})
					
				}
				window.console.log && console.log('------------DONE---------------');
			},

			/* Hides an element with specified transition effect */
			hideElementWithTransition: function( element ){
				switch (settings.closeTransition.type) {

						case "fadeOut":
							element.fadeOut(settings.closeTransition.duration);
						break;

						default:
							element.hide();
						break;
						
					}
			},

			/* Shows overlay with specified transition effect */
			showOverlayWithTransition: function ( element ){

					switch (settings.overlayTransition.type) {

						case "fadeIn":
							element.fadeIn(settings.overlayTransition.duration);
						break;

						default:
							element.show();
						break;
						
					}
			}
		

		};

 		
       
       	return this.each(function () {

       		var $this = $(this);

       		settings = $.extend(true, {}, defaults, options );

       		
       		methods.init($this);
       		
       	});


    };
 
}( jQuery ));