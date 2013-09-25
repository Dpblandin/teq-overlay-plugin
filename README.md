Teq-overlay-plugin
==================

Usage 
------------------

Call the plugin with :

`$([selector]).teqOverlay();`

Optional Parameters
-------------------

`overlayAttrs       = {object}` : add any html attribute for the overlay container

`overlayCSS         = {object}` : add css rules for the overlay container

`overlayTransition  = {object}` : add a jQuery transition effect for the overlay (fadeIn only currently supported)

`contentContainer   = string || jQuery selector` : Specify with either a jQuery selector or an element tag which element should receive contents

`addCloseBtn        = boolean` : If set to true, will add a close button to top right corner of the overlay

`closeBtnAttrs      = {object}` : add any html attribute for the close button element

`closeBtnCSS        = {object}` : add css rules for the close button element

`closeBtnHtml       = string` : Html content of the close button element
