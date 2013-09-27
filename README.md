Teq-overlay-plugin
==================

Table of contents
------------------

* [Usage](#usage)
* [Optional parameters](#optional-params)
* [Advanced usage](#advanced-usage)
	* [Accessing instanciated object](#accessing-object)
	* [Multi-instanciation](#multi-instance)
* [Examples](#examples)

<a id="usage"></a>Usage 
------------------

Call the plugin with :

	$([selector]).teqOverlay();


[*To top*](#table-of-contents)

<a id="optional-params"></a>Optional Parameters
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
Specify with either a jQuery selector or an element tag which element should receive contents

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

<a id="advanced-usage"></a>Advanced usage
------------------
### <a id="accessing-object"></a>Accessing the instanciated object

When you call the plugin with `$("mySelector").teqOverlay()`, you can quickly access the teqOverlay object with :

	$("mySelector").data('teqOverlay');

This will return an object containing :
* The jQuery element `$element`
* The javascript element `element`
* A settings object containing all the parameters, including any callbacks you have passed in.

### <a id="multi-instance"></a>Multi-instanciation

You can of course call the plugin multiple times on different elements like this :

	$('a.overlay').teqOverlay();

	$('button[data-overlay="true"]').teqOverlay({
		addCloseBtn: false,
		contentContainer: $('#overlay-content'),
		afterCloseCB: function() {}
	});

	// etc.

And so on. 

[*To top*](#table-of-contents)

<a id="examples"></a>Examples
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
