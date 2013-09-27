var teqOverlay = {
		/* CB (callback) methods */
			onInitCB: function(){},

			beforeOpenCB: function(){},

			onOpenCB: function(){},

			afteropenCB: function(){},

			beforeCloseCB: function(){},

			afterCloseCB: function(){},

			loadContent: function(){},

			/* Init method */
			init: function(options, element){
				this.settings = $.extend(true, {}, this.settings, options );
				this.element = element;
				this.$element = $(element);
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
					this._bindClickEvents();
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
				duration: null
			},
			closeFromOutside : true
		},

			/* Bind click events to matched elements to show overlay content */
			_bindClickEvents: function(){
				window.console.log && console.log('binding click events...');
				var this_instance = this;
				this.$element.bind("click", function(e) {
					e.stopPropagation();
					e.preventDefault();
					/* Add overlay to DOM */
					if(this_instance.addOverlayToStage()) {
						/* Pass href element attribute to loading method */
						this_instance.loadOverlayContent($(this).attr('href'));

						/* Show overlay with specified transitions */
						this_instance.showOverlayWithTransition($('#'+this_instance.settings.overlayAttrs.ID));
					}							
				});
				window.console.log && console.log('------------DONE---------------');
			},

			/* Add background overlay */
			addOverlayToStage: function(){
				window.console.log && console.log('Adding overlay to stage...');
				window.console.log && console.log(this);
				
				var isDone = false;
				this.cleanContents();
				/* Check wether a background has already beend added or not */
				if(this.settings.contentContainer.parents("#"+this.settings.overlayAttrs.ID).length == 0)
				{
					$.when(this.settings.contentContainer.wrap(
						$('<div/>')
						.attr(this.settings.overlayAttrs)
						.css(this.settings.overlayCSS)
					)).done(function(){
						isDone = true;
					});
	
				}else {

					this.settings.contentContainer.parents("#"+this.settings.overlayAttrs.ID).css(this.settings.overlayCSS)
					.done(function(){isDone = true});
				}

				return isDone;
			
				window.console.log && console.log('------------DONE---------------');
			},

			/* Load overlay content into content container, checks wether to add a close button or not */
			loadOverlayContent: function( hrefLink ) {
				var this_instance = this;
				if(typeof this_instance.settings.beforeOpenCB == 'function') {

					this_instance.settings.beforeOpenCB.call(this_instance);
				}
				window.console.log && console.log("loading content...");
				

				if(typeof this_instance.settings.loadContent === 'function') {
					
					this_instance.settings.loadContent();
						if(this_instance.settings.addCloseBtn) {
							this_instance.addCloseButton();	
						}
						if(this_instance.settings.closeFromOutside) {

							this_instance.addDocumentEventHandler(); 
						}

				}
				else {
					this_instance.settings.contentContainer.load(hrefLink, function() {

						if(this_instance.settings.addCloseBtn){
							this_instance.addCloseButton();	
						}
						if(this_instance.settings.closeFromOutside){

							this_instance.addDocumentEventHandler(); 
						}
					});
				}

				if(typeof this_instance.settings.afterOpenCB == 'function') {

					this_instance.settings.afterOpenCB.call(this_instance);
				}

				
				window.console.log && console.log('------------DONE---------------');
			},

			cleanContents: function() {
				var elements = $("*").filter(function() {
				    return $(this).data("teqOverlay") !== undefined;
				});

				if(elements.length > 0){

					for(var i = 0; i < elements.get().length; i++){

						$(elements.get(i)).data("teqOverlay").settings.contentContainer.unwrap().empty();
					}
						
				}
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
				$(document).bind("click.outsideClickEvent", this.outsideCloseHandler(overlayContainer));
						
			},

			removeDocumentEventHandler: function() {
				$(document).unbind("click.outsideClickEvent");
			},

			outsideCloseHandler: function(overlayContainer){

				var this_instance = this;
				return function(e) {
					e.stopPropagation();
					e.preventDefault();
					this_instance.hideElementWithTransition(overlayContainer, this_instance.settings.closeTransition);
				}
			},
			closeButtonHandler: function (overlayContainer){
				var this_instance = this;
				return function(e) {
					e.stopPropagation();
					e.preventDefault();
					this_instance.hideElementWithTransition(overlayContainer, this_instance.settings.closeTransition);
				}
			},

			/* Hides an element with specified transition effect */
			hideElementWithTransition: function( element, transition ){
				switch (transition.type) {

						case "fadeOut":
							element.fadeOut(transition.duration);
						break;

						default:
							element.hide();
						break;
						
				}

				this.removeDocumentEventHandler();
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