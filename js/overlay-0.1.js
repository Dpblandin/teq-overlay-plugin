var teqOverlay = {
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
			init: function(options, element){
				this.settings = $.extend(true, {}, this.settings, options );
				this.element = element;
				this.$element = $(element);
				this.instance = this;
				var done = false;

				/* Check if contentContainer param is passed as a simple string or a selector */

				if(typeof this.settings.contentContainer == 'string' || this.settings.contentContainer instanceof String){
					this.settings.contentContainer = $(this.settings.contentContainer);
				}

				/* Abort if no element matches selector */
				if(this.settings.contentContainer.length == 0)
				{
					window.console.log && console.log("Error : jQuery couldn't find the content container specified with the selector you used ("+this.settings.contentContainer.selector+')');
					return false;
				}

				/* If an element is found, add background overlay and bind click events for links */
				if(this.$element.length > 0){

					this.addOverlayToStage();
					this.bindClickEvents();
					done = !done;
				}
				else{
					window.console.log && console.log("Error : jQuery couldn't find the element specified with the selector you used ("+element.selector+')');
					return false;
				}

				/* When all is done, call callback */
				//done ? this.settings.onInitCB() : '';

				return this;
			},

			/* Settings */

		settings : {
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
			},
			closeFromOutside : true
		},

			/* Add background overlay */
			addOverlayToStage: function(){
				window.console.log && console.log('Adding overlay to stage...');
				console.log(this);
				/* Check wether a background has already beend added or not */
				if($("#"+this.settings.overlayAttrs.ID).length == 0)
				{
					this.settings.contentContainer.wrap(
						$('<div/>')
						.attr(this.settings.overlayAttrs)
						.css(this.settings.overlayCSS)
					);
	
				}else {
					$("#"+this.settings.overlayAttrs.ID).css(this.settings.overlayCSS);
				}
			
				window.console.log && console.log('------------DONE---------------');
			},
			/* Bind click events to matched elements to show overlay content */
			bindClickEvents: function(){
				window.console.log && console.log('binding click events...');
				var this_instance = this;
				this.$element.bind("click", function(e) {
					e.stopPropagation();
					e.preventDefault();
					/* Show or transition overlay. Default method is show() */
					this_instance.addOverlayToStage();
					this_instance.showOverlayWithTransition($('div#'+this_instance.settings.overlayAttrs.ID));

					/* Pass href element attribute to loading method */

					this_instance.loadOverlayContent($(this).attr('href'));
								
				});
				window.console.log && console.log('------------DONE---------------');
			},
			/* Load overlay content into content container, checks wether to add a close button or not */
			loadOverlayContent: function( hrefLink ) {
				var this_instance = this;
				window.console.log && console.log("loading content...");
				if(typeof this_instance.settings.loadContent === 'function') {
					this_instance.settings.loadContent();
				}
				else {
					this_instance.settings.contentContainer.load(hrefLink, function(){
						if(this_instance.settings.addCloseBtn){
							this_instance.addCloseButton();	
						}
						this_instance.addDocumentEventHandler(); 
					});
				}
				
				window.console.log && console.log('------------DONE---------------');
			},

			/* Add a close button to overlay if necessary, then bind click event on that button in order to hide overlay */
			addCloseButton: function() {
				var this_instance = this;
				window.console.log && console.log("adding close btn...");
				if($("#"+this.settings.closeBtnAttrs.ID).length == 0 ){

					var overlayContainer = $("#"+this.settings.overlayAttrs.ID);

					$('<div/>')
					.attr(this.settings.closeBtnAttrs)
					.css(this.settings.closeBtnCSS)
					.html(this.settings.closeBtnHtml)
					.prependTo(this.settings.contentContainer)
					.bind( "click", this.closeButtonHandler(overlayContainer) )

					this.settings.contentContainer.bind("click", function(e){
						e.stopPropagation();
					})
				}
				window.console.log && console.log('------------DONE---------------');
			},

			addDocumentEventHandler: function() {
				var overlayContainer = $("#"+this.settings.overlayAttrs.ID);

				if(this.settings.closeFromOutside){
						$(document).bind("click.outsideClickEvent", this.outsideCloseHandler(overlayContainer));
						
					}
					else{
						$(document).unbind("click.outsideClickEvent");
					}
				},

			outsideCloseHandler: function(overlayContainer){
				var this_instance = this;
				return function(e) {
					e.stopPropagation();
					e.preventDefault();
					this_instance.hideElementWithTransition(overlayContainer);
				}
			},
			closeButtonHandler: function (overlayContainer){
				var this_instance = this;
				return function(e) {
					e.stopPropagation();
					e.preventDefault();
					this_instance.hideElementWithTransition(overlayContainer);
				}
			},

			/* Hides an element with specified transition effect */
			hideElementWithTransition: function( element ){
				switch (this.settings.closeTransition.type) {

						case "fadeOut":
							element.fadeOut(this.settings.closeTransition.duration);
						break;

						default:
							element.hide();
						break;
						
					}
			},

			/* Shows overlay with specified transition effect */
			showOverlayWithTransition: function ( element ){

					switch (this.settings.overlayTransition.type) {

						case "fadeIn":
							element.fadeIn(this.settings.overlayTransition.duration);
						break;

						default:
							element.show();
						break;
						
					}
			}
		
};


(function( $ ) {
 
    $.fn.teqOverlay = function( options ) {	
       
       	return this.each(function () {

       		var aTeqOverlay = Object.create(teqOverlay);

       		aTeqOverlay.init(options, this)
       		
       		$.data(this, 'teqOverlay', aTeqOverlay);
       	});


    };
 
})( jQuery );