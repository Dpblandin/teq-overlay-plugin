Teq-overlay-plugin
==================

Table of contents
------------------

* [Usage](#usage)
* [Optional parameters](#optional-params)
* [Advanced usage](#advanced-usage)
	* [Accessing instanciated object](#accessing-the-instanciated-object)
	* [Multi-instanciation](#multi-instanciation)
	* [Custom load method](#custom-load-method)
* [Examples](#examples)

Usage 
------------------

Call the plugin with :

	$([selector]).teqOverlay();


[*To top*](#table-of-contents)

Optional Parameters
-------------------

	overlayAttrs       : {object}
Add any html attribute for the overlay container 

	overlayCSS         : {object}
Add css rules for the overlay container

	overlayTransition :
	{
	type: string, 
	duration: number in ms
	}
Add a jQuery transition effect for the overlay (fadeIn only currently supported)

	contentContainer   : string || jQuery selector
Specify with either a jQuery selector or an element tag which element should receive contents.
If not specified, the plugin will look for any element that has `teq-overlay-content` as its id attribute.

	addCloseBtn        : boolean
If set to true, will add a close button to top right corner of the overlay content container

	closeBtnAttrs      : {object}
Add any html attribute for the close button element

	closeBtnCSS        : {object}
Add css rules for the close button element

	closeBtnHtml       : string
Html content of the close button element

	closeTransition    : 
	{	
	type: string, 
	duration: number in ms
	}
Add a jQuery transition effect for the close event (fadeOut only currently supported)

	closeFromOutside : boolean
If set to false, will disable the closing of the overlay by clicking anywhere outside of it

[*To top*](#table-of-contents)

Advanced usage
------------------
### Accessing the instanciated object

When you call the plugin with `$("mySelector").teqOverlay()`, you can quickly access the teqOverlay object with :

	$("mySelector").data('teqOverlay');

This will return an object containing :

* `$element` : the jQuery element
* `element`  : the javascript element 
* `settings` : an object containing all the parameters, including any callbacks you have passed in.

### Multi-instanciation

You can of course call the plugin multiple times on different elements like this :

	$('a.overlay').teqOverlay();

	$('button[data-overlay="true"]').teqOverlay({
		addCloseBtn: false,
		contentContainer: $('#overlay-content'),
		afterCloseCB: function() {}
	});

	// etc.

### Custom load method

If you wish to use your own method for loading content, you can pass the `loadContent` method as a parameter, like so:

	$("myselector").teqOverlay({
		//optional params ...
		loadContent : function(){
			// Your method logic here
		}
	       
	});

Please note that as of yet, `jQuery.load()` is not fully supported and may produce unwanted behaviours.

[*To top*](#table-of-contents)

Examples
-------------------

    $('a[data-overlay]').teqOverlay({
      onInitCB: function(){
        alert("onInit callback called");
      },
      overlayCSS:{backgroundColor: "#F300", zIndex: 99999},
      overlayTransition : {type: "fadeIn", duration:500},
      contentContainer: $('#overlay-content'),
      addCloseBtn : true,
      closeBtnHtml: '<span class="close btn">close me</span>',
      closeFromOutside : false
    });

[*To top*](#table-of-contents)
