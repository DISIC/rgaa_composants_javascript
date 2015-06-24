/**
ComposantAria
GPL licence
Réalisé par access42.net
**/

// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

var ComposantAria = ( function setComposantAria(){

	'use strict';
	
	/* *** 
		Generic global Object
		openObj : obj ref for trapping focus
	*** */
	var global = {
		openObj : null
	}
	/* =======================
		 Onload 
	   =======================*/
	window.onload = function setOnload() {
		/* 1 *** slider *** */
		var listSlider = document.getElementsByClassName( acsa_config.slider.cursor );
		for ( var i = 0, len = listSlider.length; i < len; i++ ){
			listSlider[i].addEventListener( 'focus', function setListSlider(){
				var slider = new Slider ( this );
				slider.set( this, slider.keys, slider.posOrigin, slider.posMax, slider.unit, slider.step );
			}, false );
		}
		/* 2 *** progressbar *** */
		//simulate a progress bar
		document.getElementById('Cprogressbar').addEventListener ( 'click', function setprogressbar(){
			var contenerMaj = document.getElementById( 'Zmaj' );
			var obj = document.getElementById( 'Pgbr' );
			var returnTo = document.getElementById( 'actuTitre' );
			var progressBar = new Progressbar( obj, returnTo, contenerMaj );
		}, false );
		/* 3 *** dialog / alertdialog *** */
		var listDial = document.getElementsByClassName( acsa_config.dialog.button );
		for ( var i = 0, len = listDial.length; i < len; i++ ){
			listDial[i].addEventListener( 'click', function setListDial(){
				var obj = document.getElementById( this.getAttribute(acsa_config.dialog.targetId) );
				var returnTo = this;
				var dialog = new Dialog ( obj, returnTo );
			}, false );
		}
		/* 4 *** tabPanel *** */
		var listTabPanel = document.getElementsByClassName( acsa_config.tabPanel.tabPanel );
		var tabPanel = new Array();
		for ( var i = 0, len = listTabPanel.length; i < len; i++ ){
			tabPanel[i] = new TabPanel( listTabPanel[i] );
		}
		/* 5 *** tooltip *** */
		var listTooltip = document.getElementsByClassName( acsa_config.tooltip.tooltip );
		var tooltip = new Array();
		for ( var i = 0, len = listTooltip.length; i < len; i++ ){
			tooltip[i] = new Tooltip( listTooltip[i] );
		}		
		/* 6 *** Button *** */
		var listButton = document.getElementsByClassName( acsa_config.button.button );
		for ( var i = 0, len = listButton.length; i < len; i++ ){
			listButton[i].addEventListener( 'keydown', function setListButton( event ){
				var key = event.keyCode;
				button = new Button ( this, key );
			}, false );
		}
	//end onload
	}
	/* =======================
		 Components
	   =======================*/
	/* 
		*** Component slider ***
		-required obj : slider component
		example : var slider = new slider ( document.getElementById( 'my-slider' ) )
		Method set
		- required obj : slider component (this)
		- required keys : key event
		- required posOrigin : initial x offsetleft
		- required posMax : final right x position
		- required unit : value for aria-valuetext
		- required step : relative step unit
		example : slider.set( this, slider.keys, slider.posOrigin, slider.posMax, slider.unit, slider.step )
	*/
	var Slider = function ( obj ){
		this.obj = obj;
		//set
		this.objWidth = parseInt( window.getComputedStyle(obj.previousSibling.previousSibling).width );
		this.posOrigin = parseInt ( obj.offsetLeft );
		this.posMax = parseInt( window.getComputedStyle(obj.previousSibling.previousSibling).width ) + parseInt ( obj.offsetLeft );
		obj.getAttribute(acsa_config.slider.unit) ? 
		this.unit = obj.getAttribute(acsa_config.slider.unit) : 
		this.unit = '';
		this.step = this.objWidth / Number( obj.getAttribute( 'aria-valuemax' ) );
		//Init aria-valuenow
		if (obj.getAttribute('aria-valuenow') == null || isNaN(parseInt(obj.getAttribute('aria-valuenow'))))
			obj.setAttribute( 'aria-valuenow',"0");
		if (parseInt(obj.getAttribute('aria-valuenow'))<parseInt(obj.getAttribute( 'aria-valuemin' )))
			obj.setAttribute( 'aria-valuenow', obj.getAttribute( 'aria-valuemin' ) ); 
		if (parseInt(obj.getAttribute('aria-valuenow'))>parseInt(obj.getAttribute( 'aria-valuemax' )))
			obj.setAttribute( 'aria-valuenow', obj.getAttribute( 'aria-valuemax' ) ); 
		//define object keycodes
		this.keys = new keyCodes();
	}
	Slider.prototype.set = function ( obj, keys, posOrigin, posMax, unit, step ){
		obj.addEventListener( 'keydown' , function ( event ) {
			var posCurrent;
			obj.style.left ? posCurrent	= parseFloat( obj.style.left ) : posCurrent = posOrigin;
			var valCurrent = parseInt( obj.getAttribute( 'aria-valuenow' ) );
			var handled = false;
			if( ( event.keyCode === keys.up || event.keyCode === keys.right ) && valCurrent < Number( obj.getAttribute( 'aria-valuemax' ) ) ){
				posCurrent += step;
				valCurrent += 1;
				handled = true;
			}
			if( ( event.keyCode === keys.down || event.keyCode === keys.left ) && valCurrent > Number( obj.getAttribute( 'aria-valuemin' ) ) ){
				posCurrent -= step;
				valCurrent -= 1;
				handled = true;
			}
			if( event.keyCode === keys.home ) {
				posCurrent = posOrigin;
				valCurrent = Number( obj.getAttribute( 'aria-valuemin' ) );
				handled = true;
			}
			if( event.keyCode === keys.end ) {
				posCurrent = posMax;
				valCurrent = Number( obj.getAttribute( 'aria-valuemax' ) );
				handled = true;
			}
			maj (this , posCurrent , valCurrent, unit);
			if (handled) event.preventDefault();
		}, false );
		function maj ( obj, posCurrent, valCurrent, unit ) {
			var txt = document.getElementById('sliderCurrent').firstChild;
			obj.style.left = posCurrent + 'px';
			obj.setAttribute( 'aria-valuenow' , valCurrent );
			obj.setAttribute( 'aria-valuetext', valCurrent + ' ' + unit );
			var newTxt = document.createTextNode( valCurrent + ' ' + unit );
			txt.replaceChild( newTxt, txt.firstChild );
		}
	}
	/* 
		*** Component progressbar *** 
		- required obj : the progressbar component
		- optionnal returnTo : element focus result
		- optionnal contenerMaj : target element for aria-busy value
	*/
	function Progressbar ( obj, returnTo, contenerMaj ){
		this.obj = obj;
		this.returnTo = returnTo;
		this.contenerMaj = contenerMaj;
		obj.style.display = 'block';
		obj.setAttribute( 'aria-valuenow' , '0' );
		obj.focus();
		var indicator = obj.querySelector( '.' + acsa_config.progressBar.indicator );
		indicator.style.width = 0;
		if( contenerMaj ) contenerMaj.setAttribute('aria-busy','true');
		var cpt = 0;
		var progress = setInterval( function(){
			if( cpt === 110 ){
				contenerMaj.setAttribute('aria-busy','true');
				contenerMaj.style.display = 'block';
				obj.style.display = 'none';
				//focus on returnTo zone
				returnTo.focus();
				//interruption timer
				clearInterval(progress);
			}
			indicator.style.width = cpt + 'px';
			obj.setAttribute( 'aria-valuenow' , cpt );
			obj.setAttribute( 'aria-valuetext' , cpt + '%');
			cpt += 10;
		},1000);
	}
	/* 
	*** Component dialog / alertdialog *** 
		- required obj : dialog component
		- required returnTo : element focus result
	*/
	function Dialog( obj, returnTo ) {
		this.obj = obj;
		this.returnTo = returnTo;
		//set
		var focusFirst;
		obj.getAttribute( acsa_config.dialog.targetFocus ) ? 
			focusFirst = document.getElementById( obj.getAttribute( acsa_config.dialog.targetFocus ) ) : 
			focusFirst = obj.querySelector( '.' + acsa_config.dialog.close );
		var closeButton = obj.querySelector( '.' + acsa_config.dialog.close );
		//open
		document.getElementById( 'overlay' ).style.display = 'block';
		obj.style.display = 'block';
		focusFirst.focus();
		//Init events
		//escape close
		document.addEventListener( 'keydown', escClose, false );
		//button close
		closeButton.addEventListener( 'click', buttonClose, false );
		//trappingFocus
		global.openObj = obj;
		document.addEventListener( 'focus', trappingFocus, true );
		//close functions
		function escClose( event ){
			var keys = new keyCodes();
			if( event.keyCode === keys.esc ){
				if( document.getElementById('overlay') ) document.getElementById( 'overlay' ).style.display = 'none';
				obj.style.display='none';
				if( returnTo ) returnTo.focus();
				//reset listener and object trapping focus
				document.removeEventListener( 'keydown', escClose , false );
				global.openObj = null;
			}
		}
		function buttonClose(){
			if ( document.getElementById('overlay') ) document.getElementById( 'overlay' ).style.display = 'none';
			obj.style.display='none';
			if( returnTo ) returnTo.focus();
			//reset object trapping focus
			global.openObj = null
		}
	}
	/*
	*** Component tooltip ***
		-required obj : element wich call a tooltip referenced by the aria-describedby attribute
	*/
	function Tooltip( obj ){
		this.obj = obj;
		var target = document.getElementById( obj.getAttribute('aria-describedby') );
		if( target ){
			obj.addEventListener('focus', function(){
				target.style.display = 'block';
				document.addEventListener( 'keydown', escClose, false );
			}, false);
			obj.addEventListener('blur', function(){
				target.style.display = 'none';
			}, false);
		}
		function escClose( event ){
			var keys = new keyCodes();
			if( event.keyCode === keys.esc ){
				target.style.display = 'none';
				document.removeEventListener( 'keydown', escClose , false );
			}
		}
	}
	/*
	*** Component Button ***
		- required obj : button element
		- required key : event.keyCode
	*/
	function Button( obj, key ){
		this.obj = obj;
		this.key = key;
		// set keyboard enter and spacebar with aria-disabled restriction
		if ( !obj.getAttribute( 'aria-disabled' ) || obj.getAttribute( 'aria-disabled' ) != 'true' ) {
			var keys = new keyCodes();
			if ( key === keys.space || key === keys.enter ) {
				var event = document.createEvent( 'MouseEvent' );
				event.initEvent( 'click', true, true );
				obj.dispatchEvent( event );
			}
		}
	}
	/*
	*** Component Tabpanel ***
		- required obj : a tabpanel
	*/
	function TabPanel( obj ) {
		this.obj = obj;
		var listHead = obj.getElementsByClassName( acsa_config.tabPanel.head );
		var listPan = obj.getElementsByClassName( acsa_config.tabPanel.pan );
		//set event keyboard
		for ( var i = 0, len = listHead.length; i < len ; i++){
			listHead[i].addEventListener( 'keydown', function(event) {
				openTab(this,event);
			}, false);
			listHead[i].addEventListener( 'click', function(){
				openTabC(this);
			}, false);
		}
		function openTab(obj, event){
			var current;
			var next = 0;
			var maxTab=listHead.length;
			var keys = new keyCodes();
			if( event.keyCode >= keys.left && event.keyCode <= keys.down ) {
				//get active header/pan, set headers/pans inactives
				for ( var j = 0; j < maxTab; j++ ){
					if( listHead[j].getAttribute('aria-selected') === 'true' ) current = j;
					listHead[j].className = acsa_config.tabPanel.head;
					listHead[j].setAttribute ( 'tabindex', '-1');
					listHead[j].setAttribute ( 'aria-selected', 'false');
					var tabTarget = document.getElementById( listHead[j].getAttribute( 'aria-controls' ) );
					tabTarget.className = acsa_config.tabPanel.pan;
					tabTarget.setAttribute ( 'aria-expanded', 'false');
					tabTarget.setAttribute ( 'aria-hidden', 'true');
				}
				// next event
				if ( event.keyCode === keys.right || event.keyCode === keys.down ) {
					current + 1 >= maxTab ? next = 0 : next = current + 1;
				}
				// prev event
				else if ( event.keyCode === keys.left || event.keyCode === keys.up ) {
					current - 1 < 0 ? next = maxTab - 1 : next = current - 1;
				}
				//Maj
				listPan[next].className = acsa_config.tabPanel.pan+' '+acsa_config.tabPanel.panActive;
				listPan[next].setAttribute( 'aria-expanded', 'true' );
				listPan[next].setAttribute( 'aria-hidden', 'false' );
				listHead[next].className = acsa_config.tabPanel.head + ' '+ acsa_config.tabPanel.headActive;
				listHead[next].setAttribute( 'tabindex', '0');
				listHead[next].setAttribute( 'aria-selected', 'true');
				listHead[next].focus();
				event.preventDefault();
			}
		}
		function openTabC(obj) {
			var panObj = obj.getAttribute('aria-controls') ;
			// Set headers/pans inactives
			for( var i= 0, leni = listHead.length; i < leni; i++ ){
				//if(ListHead[i] === obj) tab = i;
				listHead[i].className = acsa_config.tabPanel.head;
				listHead[i].setAttribute ( 'tabindex', '-1' );
				listHead[i].setAttribute ( 'aria-selected', 'false' );
				listPan[i].className = acsa_config.tabPanel.pan;
				listPan[i].setAttribute ( 'aria-expanded', 'false' );
				listPan[i].setAttribute ( 'aria-hidden', 'true' );
			}
			//MAJ
			obj.className = acsa_config.tabPanel.head + ' ' +acsa_config.tabPanel.headActive;
			obj.setAttribute( 'tabindex', '0' );
			obj.setAttribute( 'aria-selected', 'true');
			document.getElementById( obj.getAttribute('aria-controls') ).className = acsa_config.tabPanel.pan + ' ' + acsa_config.tabPanel.panActive;
			document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-expanded', 'true' );
			document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-hidden', 'false' );
			return false;
		}
	}

	/* =======================
		 Utilities
	   =======================*/
	/* Generic trapping focus function (based on global.openObj setting) */
	function trappingFocus( event ){
		if ( global.openObj && !global.openObj.contains( event.target ) ) {
			event.stopPropagation();
			global.openObj.focus();
		}
	}
	/* Generic keyCodes properties names */
	function keyCodes() {
		this.backspace  = 8;
		this.tab        = 9;
		this.enter      = 13;
		this.esc        = 27;

		this.space      = 32;
		this.pageup     = 33;
		this.pagedown   = 34;
		this.end        = 35;
		this.home       = 36;

		this.left       = 37;
		this.up         = 38;
		this.right      = 39;
		this.down       = 40;

	}
})();

// @license-endd