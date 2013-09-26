Teq-overlay-plugin
==================

Usage 
------------------

Call the plugin with :

`$([selector]).teqOverlay();`

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
Specify with either a jQuery selector or an element tag which element should receive contents

	addCloseBtn        : boolean
If set to true, will add a close button to top right corner of the overlay

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


Examples
-------------------

    $('a[data-overlay]').teqOverlay({
      onInitCB: function(){
        alert("onInit callback called");
      },
      overlayCSS:{backgroundColor: "#F300", opacity: 1},
      overlayTransition : {type: "fadeIn", duration:500},
      contentContainer: $('.overlay-content'),
      addCloseBtn : true
    });
