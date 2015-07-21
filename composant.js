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
		opnObj : obj ref for trapping focus
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
		/* 7 *** checkbox *** */
		var listCheckbox = document.getElementsByClassName( acsa_config.checkbox.checkbox );
		var checkbox = new Array();
		for ( var i = 0, len = listCheckbox.length; i < len; i++ ){
			listCheckbox[i].addEventListener( 'keydown', function setListChekbox( event ){
				var key = event.keyCode;
				checkbox[i] = new Checkbox ( this, key, event );
			}, false );
			listCheckbox[i].addEventListener( 'click', function setListChekbox(){
				var key = 32;
				checkbox[i] = new Checkbox ( this, key );
			}, false );
		}		
		/* 8 *** menubar *** */
		var listMenuBar = document.getElementsByClassName( acsa_config.menubar.menuBar );
		var menuBar = new Array();
		for ( var i = 0, len = listMenuBar.length; i < len; i++ ){
			menuBar[i] = new Menubar( listMenuBar[i] );
		}
		/* 9 *** Accordion *** */
		var listAccordion = document.getElementsByClassName( acsa_config.accordion.accordion );
		var accordion = new Array();
		for ( var i = 0, len = listAccordion.length; i < len; i++ ){
			accordion[i] = new Accordion( listAccordion[i] );
		}
		/* 10 *** Tree *** */
		var listTree = document.getElementsByClassName( acsa_config.tree.tree );
		var tree = new Array();
		for ( var i = 0, len = listTree.length; i < len; i++ ){
			tree[i] = new Tree( listTree[i], i );
		}
		/* 11 *** Date picker *** */
		var listDatepicker = document.getElementsByClassName( acsa_config.datepicker.datepicker );
		var datepicker = new Array();
		for ( var i = 0, len = listDatepicker.length; i < len; i++ ){
			datepicker[i] = new DatePicker( listDatepicker[i] );
		}
		/* 12 *** Autocomplete *** */
		var listAutocomplete = document.getElementsByClassName( acsa_config.autocomplete.autocomplete );
		var autocomplete = new Array();
		for ( var i = 0, len = listAutocomplete.length; i < len; i++ ){
			autocomplete[i] = new Autocomplete( listAutocomplete[i], acsa_config.autocomplete.autocomplete );
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
		if (obj.getAttribute('aria-valuenow') == null || isNaN(parseInt(obj.getAttribute('aria-valuenow'))))obj.setAttribute( 'aria-valuenow',"0");
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
	/*
	*** Component checkbox ***
		-required obj : a checkbox
		-required key : keyCode
	*/
	function Checkbox( obj, key ){
		this.obj = obj;
		this.key = key;
		var keys = new keyCodes();
		if ( key === keys.space ) {	
			if ( obj.getAttribute( 'aria-checked' ) === 'true' ) {
				obj.classList.remove( acsa_config.checkbox.stateTrue );
				obj.classList.add( acsa_config.checkbox.stateFalse )
				obj.setAttribute( 'aria-checked', 'false' );
			}
			else if ( obj.getAttribute( 'aria-checked' ) === 'false' ) {
				obj.classList.remove( acsa_config.checkbox.stateFalse );
				obj.classList.add( acsa_config.checkbox.stateTrue )
				obj.setAttribute( 'aria-checked', 'true' );
			}
			event.preventDefault();
		}
	}
/*
	*** Component menubar ***
		-required obj : a menu
	*/
	function Menubar( obj ){
		this.obj = obj;
		var listMenuItem = obj.getElementsByClassName( acsa_config.menubar.menuItem );
		var menuItemActive = 0;
		var menuListCheckbox = new Array();
		var menuCheckbox;
		setEventCheckbox();
		for ( var i = 0, len = listMenuItem.length; i < len; i++ ){
			listMenuItem[i].addEventListener('focus', function setMenu( event ){
				menuCheckbox = this.querySelector( 'ul[role=menu]' );
				menuListCheckbox = menuCheckbox.getElementsByClassName( acsa_config.menubar.menuItemCheckbox );
				menuCheckbox.style.display='block';
				setListCheck( menuCheckbox );
			},false);
			listMenuItem[i].addEventListener('mouseover', function menuOn( event ){
				menuCheckbox = this.querySelector( 'ul[role=menu]' );
				menuCheckbox.style.display='block';
			},false);
			listMenuItem[i].addEventListener('mouseout', function menuOff(){
				menuCheckbox.style.display='none';
			},false);
			listMenuItem[i].addEventListener('keydown', function menuNav( event ){
				var key = event.keyCode 
				var keys = new keyCodes();
				switch( key ){
					case keys.right :
						menuCheckbox.style.display='none';	
						menuItemActive += 1;					
						if( menuItemActive === len) menuItemActive = 0;
						listMenuItem[menuItemActive].focus();
						event.stopPropagation();
						event.preventDefault();
					break;
					case keys.left :
						menuCheckbox.style.display='none';	
						menuItemActive -= 1;					
						if( menuItemActive < 0 ) menuItemActive = len-1;
						listMenuItem[menuItemActive].focus();
						event.stopPropagation();
						event.preventDefault();
					break;
					case keys.down :
					setListCheck( menuCheckbox );
						menuCheckbox.style.display='block';
						menuListCheckbox[0].focus();
						event.stopPropagation();
						event.preventDefault();
					break;
					case keys.up :
						menuCheckbox.style.display='block';
						menuListCheckbox[0].focus();	
						event.stopPropagation();
						event.preventDefault();
					break;
					case keys.enter :
						menuCheckbox.style.display='block';
						menuListCheckbox[0].focus();
						event.stopPropagation();
						event.preventDefault();
					break;
					case keys.space :
						menuCheckbox.style.display='block';
						menuListCheckbox[0].focus();
						event.stopPropagation();
						event.preventDefault();
					break;
					case keys.esc :
						menuCheckbox.style.display='none';
						this.focus();
						event.stopPropagation();
						event.preventDefault();
					break;
					case keys.tab :
						menuCheckbox.style.display='none';
						event.stopPropagation();
					break;
				}
			}, false);
		}
		function setListCheck( listTarget ){
			var arrayCheck = new Array();
			arrayCheck = listTarget.getElementsByClassName( acsa_config.menubar.menuItemCheckbox );
			var menuItemCheckboxActive = 0;
			for( var i = 0, len = arrayCheck.length; i < len; i++ ){
				arrayCheck[i].addEventListener( 'keydown', function navCheckBoxSet( event ){
					var key = event.keyCode 
					var keys = new keyCodes();
					if( key === keys.up ){
						menuItemCheckboxActive -= 1;
						if( menuItemCheckboxActive < 0 ) menuItemCheckboxActive = len - 1;
						arrayCheck[menuItemCheckboxActive].focus();	
						event.stopPropagation();
						event.preventDefault();
					}
					else if( key === keys.down ){
						menuItemCheckboxActive += 1;
						if( menuItemCheckboxActive === len ) menuItemCheckboxActive = 0
						arrayCheck[menuItemCheckboxActive].focus();	
						event.stopPropagation();
						event.preventDefault();
					}
					else if( key === keys.tab ){
						this.parentNode.style.display = 'none';
					}
					event.stopPropagation();
				}, false);
			}
		}
		function setCheckbox( obj ){
			console.log( obj );
			if( obj.getAttribute( 'aria-checked' ) === 'false' ){
				console.log( 'true' );
				obj.setAttribute( 'aria-checked', 'true' );
				obj.classList.remove( acsa_config.menubar.stateFalse );
				obj.classList.add( acsa_config.menubar.stateTrue );
			}
			else if( obj.getAttribute( 'aria-checked' ) === 'true' ){
				console.log( 'false' );
				obj.setAttribute( 'aria-checked', 'false' );
				obj.classList.remove( acsa_config.menubar.stateTrue );
				obj.classList.add( acsa_config.menubar.stateFalse );
			}
		}
		function setEventCheckbox(){
			var target = obj.getElementsByClassName( acsa_config.menubar.menuItemCheckbox );
			for( var i = 0, len = target.length; i < len; i++ ){
				target[i].addEventListener('click', function mouseCheckBoxSet( event ){	
					setCheckbox( this );
				}, false);
				target[i].addEventListener( 'keydown', function navCheckBoxSet( event ){
					var key = event.keyCode 
					var keys = new keyCodes();
					if ( key === keys.space || key === keys.enter ) {
						console.log("key " + key +" enter " + this.getAttribute( 'aria-checked' ));
						setCheckbox( this );
						event.stopPropagation();
						event.preventDefault();			
					}
					else if( key === keys.right ){
						menuItemActive += 1;
						this.parentNode.style.display = 'none';					
						if( menuItemActive === listMenuItem.length) menuItemActive = 0;
						listMenuItem[menuItemActive].focus();
						event.stopPropagation();
						event.preventDefault();
					}
					else if( key === keys.left ){
						menuItemActive -= 1;
						this.parentNode.style.display = 'none';					
						if( menuItemActive < 0 ) menuItemActive = listMenuItem.length - 1;
						listMenuItem[menuItemActive].focus();
						event.stopPropagation();
						event.preventDefault();
					}
				}, false);
			}	
		}
	}
	/*
	*** Component Accordion ***
		- required obj : an accordion
	*/
	function Accordion( obj ) {
		this.obj = obj;
		var listHead = obj.getElementsByClassName( acsa_config.accordion.head );
		var listPan = obj.getElementsByClassName( acsa_config.accordion.pan );
		//set event keyboard
		for ( var i = 0, len = listHead.length; i < len ; i++){
			listHead[i].addEventListener( 'keydown', function(event) {
				openAccordion(this,event);
			}, false);
			listHead[i].addEventListener( 'click', function(){
				openAccordionC(this);
			}, false);
		}
		function openAccordion(obj, event){
			var current = parseInt( obj.getAttribute('data-n') );
			var maxTab=listHead.length;
			var keys = new keyCodes();
			if( event.keyCode >= keys.left && event.keyCode <= keys.down ) {
				// next event
				if ( event.keyCode === keys.right || event.keyCode === keys.down ) {
					current + 1 >= maxTab ? current = 0 : current += 1;
				}
				// prev event
				else if ( event.keyCode === keys.left || event.keyCode === keys.up ) {
					current - 1 < 0 ? current = maxTab - 1 : current -= 1;
				}
				listHead[current].focus();
				event.preventDefault();
			}
			else if( event.keyCode === keys.enter || event.keyCode === keys.space) {
				if( obj.getAttribute('aria-selected') === 'true'){
					obj.className = acsa_config.accordion.head;
					if( current > 0 )obj.setAttribute( 'tabindex', '-1' );
					obj.setAttribute( 'aria-selected', 'false');
					document.getElementById( obj.getAttribute('aria-controls') ).className = acsa_config.accordion.pan;
					document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-expanded', 'false' );
					document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-hidden', 'true' );	
				}
				else if( obj.getAttribute('aria-selected') === 'false' ){
					obj.className = acsa_config.accordion.head + ' ' +acsa_config.accordion.headActive;
					obj.setAttribute( 'tabindex', '0' );
					obj.setAttribute( 'aria-selected', 'true');
					document.getElementById( obj.getAttribute('aria-controls') ).className = acsa_config.accordion.pan + ' ' + acsa_config.accordion.panActive;
					document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-expanded', 'true' );
					document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-hidden', 'false' );				
				}
				event.preventDefault();
			}
		}
		function openAccordionC(obj) {
			if( obj.getAttribute('aria-selected') === 'true'){
				obj.className = acsa_config.accordion.head;
				if( parseInt( obj.getAttribute( 'data-n' ) ) > 0 ) obj.setAttribute( 'tabindex', '-1' );
				obj.setAttribute( 'aria-selected', 'false');
				document.getElementById( obj.getAttribute('aria-controls') ).className = acsa_config.accordion.pan;
				document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-expanded', 'false' );
				document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-hidden', 'true' );	
			}
			else if( obj.getAttribute('aria-selected') === 'false' ){
				obj.className = acsa_config.accordion.head + ' ' +acsa_config.accordion.headActive;
				obj.setAttribute( 'tabindex', '0' );
				obj.setAttribute( 'aria-selected', 'true');
				document.getElementById( obj.getAttribute('aria-controls') ).className = acsa_config.accordion.pan + ' ' + acsa_config.accordion.panActive;
				document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-expanded', 'true' );
				document.getElementById( obj.getAttribute('aria-controls') ).setAttribute( 'aria-hidden', 'false' );				
			}
		}
	}
	/*
	*** Component tree ***
		- required obj : a tree
		- required ndxTree : index of tree list array
	*/
	function Tree( obj, ndxTree ) {
		this.obj = obj;
		var currentItem;
		var initKeyboardNavigation;
		var refTree = 'tree-' + ndxTree;
		var listItem = obj.getElementsByClassName( acsa_config.tree.treeitem );
		for(var i = 0, len = listItem.length; i < len; i++ ){
			listItem[i].setAttribute( 'data-n', i );
			listItem[i].setAttribute( 'id', refTree + '-node-' + i );
			listItem[i].setAttribute( 'aria-selected', 'false' );
		}
		//Init aria-activedescendant
		obj.setAttribute( 'id', refTree );
		obj.setAttribute( 'tabindex', '0' );
		obj.setAttribute( 'aria-activedescendant', refTree + '-node-0');
		var listItemArray = turnObjToArray( listItem);
		var listItemReverse = listItemArray.reverse();
		//for(var i = 0, len = listItem.length; i < len; i++ ){
			//listItem[i].addEventListener( 'keydown', function(event) {
		//Set keyboard navigation
		obj.addEventListener( 'keydown', function(event) {
			var keys = new keyCodes();
			var currentTarget = document.getElementById( obj.getAttribute( 'aria-activedescendant') );
			if( event.keyCode === keys.down ){
				var ndx = parseInt( currentTarget.getAttribute( 'data-n' ) );
				currentItem = ndx;
				walkDown( ndx );
				event.preventDefault();
				event.stopPropagation();
			}
			if( event.keyCode === keys.up ){
				var ndx = listItemReverse.length - parseInt( currentTarget.getAttribute( 'data-n' ) );
				ndx-=1;
				currentItem = ndx;
				walkUp( ndx );
				event.preventDefault();
				event.stopPropagation();
			}
			if( event.keyCode === keys.right ){
				var target = currentTarget.querySelector( 'ul' );
				if( target ){
					target.classList.add( acsa_config.tree.subtreeActive );
					currentTarget.setAttribute( 'aria-expanded', 'true' );
					currentTarget.classList.add( acsa_config.tree.treeitemSubtreeActive );
					var targetLi = target.querySelectorAll('li');
					for(var i = 0, len = targetLi.length; i < len; i++ ){
						targetLi[i].classList.add( acsa_config.tree.treeitemVisible );
					}
				}
				event.preventDefault();
				event.stopPropagation();
			}
			if( event.keyCode === keys.left ){
				if( currentTarget.getAttribute('aria-expanded', 'true' ) ){
					currentTarget.setAttribute( 'aria-expanded', 'false');
					currentTarget.classList.remove( acsa_config.tree.treeitemSubtreeActive );
					var target = currentTarget.querySelector( 'ul' );
					target.classList.remove( acsa_config.tree.subtreeActive );
					var targetLi = target.querySelectorAll('li');
					for(var i = 0, len = targetLi.length; i < len; i++ ){
						targetLi[i].classList.remove( acsa_config.tree.treeitemVisible );
					}
				}
				else if( currentTarget.parentNode.parentNode.getAttribute('aria-expanded', 'true' ) ){
					//this.parentNode.parentNode.setAttribute('tabindex','0');
					currentTarget.parentNode.parentNode.focus();
				}
				event.preventDefault();
				event.stopPropagation();
			}
		}, false);
		// set aria-selected and mouse event
		for(var i = 0, len = listItem.length; i < len; i++ ){
			listItem[i].addEventListener( 'blur', function() {
				if( parseInt( this.getAttribute( 'data-n' ) ) > 0 ) {
					//this.setAttribute( 'tabindex', '-1');
					this.setAttribute( 'aria-selected', 'false' );
				}
			}, false );
			listItem[i].addEventListener( 'click', function() {
				if( this.getAttribute('aria-expanded') === 'false'){
					var target = this.querySelector( 'ul' );
					if( target ){
						target.classList.add( acsa_config.tree.subtreeActive );
						this.setAttribute( 'aria-expanded', 'true' );
						this.classList.add( acsa_config.tree.treeitemSubtreeActive );
						var targetLi = target.querySelectorAll('li');
						for(var i = 0, len = targetLi.length; i < len; i++ ){
							targetLi[i].classList.add( acsa_config.tree.treeitemVisible );
						}
					}
				}
				else if( this.getAttribute('aria-expanded') === 'true'){
					this.setAttribute( 'aria-expanded', 'false');
					this.classList.remove( acsa_config.tree.treeitemSubtreeActive );
					var target = this.querySelector( 'ul' );
					target.classList.remove( acsa_config.tree.subtreeActive );
					var targetLi = target.querySelectorAll('li');
					for(var i = 0, len = targetLi.length; i < len; i++ ){
						targetLi[i].classList.remove( acsa_config.tree.treeitemVisible );
					}
				}
			}, false );			
		}
		function walkDown( ndx ){
			listItem[currentItem].setAttribute( 'aria-selected', 'false' );
			for(var i = ndx, len = listItem.length; i < len; i++ ){
				currentItem += 1;
				if( listItem[i].getAttribute( 'aria-expanded' ) === 'false'){
					var subGroup = listItem[i].getElementsByClassName( acsa_config.tree.treeitem );
					currentItem += subGroup.length;
					i = len;
				}
				i = len;
			}
			if( initKeyboardNavigation ){
				if( listItem[currentItem] ) {
					//listItem[currentItem].setAttribute( 'tabindex', '0' );
					listItem[currentItem].focus();
					obj.setAttribute( 'aria-activedescendant', listItem[currentItem].getAttribute( 'id' ) );
					listItem[currentItem].setAttribute( 'aria-selected', 'true' );
				}
			}
			else{
				listItem[0].focus();
				obj.setAttribute( 'aria-activedescendant', listItem[0].getAttribute( 'id' ) );
				listItem[0].setAttribute( 'aria-selected', 'true' );
				initKeyboardNavigation = true;
			}
		}
		function walkUp( ndx ){
			listItem[currentItem].setAttribute( 'aria-selected', 'false' );
			for(var i = ndx, len = listItemReverse.length; i < len; i++ ){
				currentItem += 1;
				if( listItemReverse[currentItem] && listItemReverse[currentItem].classList.contains( acsa_config.tree.treeitemVisible ) ) i = len;
			}
			if( listItemReverse[currentItem] ) {
				//listItemReverse[currentItem].setAttribute( 'tabindex', '0' );
				listItemReverse[currentItem].focus();
				obj.setAttribute( 'aria-activedescendant', listItemReverse[currentItem].getAttribute( 'id' ) );
				listItemReverse[currentItem].setAttribute( 'aria-selected', 'true' );				
			}
		}
		function turnObjToArray(obj) {
			return [].map.call(obj, function(element) {
			return element;
			})
		};
	}
	/*
	*** Component date picker ***
		- required obj : a date picker
	*/
	function DatePicker( obj ) {
		this.obj = obj;
		var txtDayRef, txtMonthRef, firstDayInMonth;
		// array gridcell
		var listDay = obj.querySelectorAll( 'td' );
		// init
		setCalendar();
		// events prev/next month/year
		var target = obj.querySelector( '.'+acsa_config.datepicker.datepickerPrev );
		target.addEventListener( 'click', function(){
			resetCalendar( 'prev' );
			// set tabindex '0' on first day of month ( default focus mode for keyboard )
			if( listDay[firstDayInMonth] ) listDay[firstDayInMonth].firstChild.setAttribute( 'tabindex', '0' );
		}, false);
		var target = obj.querySelector( '.'+acsa_config.datepicker.datepickerNext );
		target.addEventListener( 'click', function(){
			resetCalendar( 'next' );
			// set tabindex '0' on first day of month ( default focus mode for keyboard )
			if( listDay[firstDayInMonth] ) listDay[firstDayInMonth].firstChild.setAttribute( 'tabindex', '0' );
		}, false);
		function setCalendar( month, year ){
			//init
			var nbDays;
			var monthRef = [31,28,31,30,31,30,31,31,30,31,30,31];
			var monthTxt = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
			var dayNameTxt = ['Dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
			//default
			if( !month && !year ){
				month = new Date().getMonth();
				year = new Date().getFullYear();
			    var now = new Date().getDate();
			}
			firstDayInMonth = new Date( year, month, 1 ).getDay();
			nbDays = monthRef[ month ];
			if( month === 1 && year % 4 === 0 ) nbDays = monthRef[1] + 1;
			// set header
			var newHeader = document.createTextNode( monthTxt[ month ] + " " + year );
			var header = obj.querySelector( '.' + acsa_config.datepicker.head );
			header.appendChild( newHeader );
			header.setAttribute('data-month', month);
			header.setAttribute('data-year', year);
			header.setAttribute('data-begin', firstDayInMonth);
			header.setAttribute('data-end', nbDays);	
			// init day index
			var txtDay = 0;
			//populate gridcell
			for( var i = 0, len = listDay.length + firstDayInMonth; i < len; i++){
				if( i >= firstDayInMonth && txtDay < nbDays ){
					txtDay += 1;
					var dayNameRef = new Date( year, month, txtDay).getDay();
					//console.log( dayNameRef );
					var dayName = dayNameTxt[ dayNameRef ];
					var newSpanDayName = document.createElement( 'span' );
					var newNDayName = document.createTextNode( dayName );
					newSpanDayName.appendChild( newNDayName )
					newSpanDayName.classList.add( acsa_config.datepicker.dayName );
					var newSpan = document.createElement( 'span' );
					var newNDay = document.createTextNode( txtDay );
					newSpan.appendChild( newSpanDayName );
					newSpan.appendChild( newNDay );
					// set input data format
					( txtDay < 10 ) ? txtDayRef = '0' + txtDay : txtDayRef = txtDay;
					var monthReal = month + 1;
					( monthReal < 10 ) ? txtMonthRef = '0' + monthReal : txtMonthRef = monthReal;
					var newDateTxt = txtDayRef + '/' + txtMonthRef + '/' + year;
					// set span date and aria-selected
					newSpan.setAttribute('data-date', newDateTxt );
					newSpan.setAttribute('aria-selected', 'false' );
					// set gridcell index
					newSpan.setAttribute('data-n', i );					
					// set today focus in init mode
					if( txtDay === now ) {
						newSpan.classList.add( acsa_config.datepicker.today);
						newSpan.setAttribute( 'tabindex', '0' );
						// reset prev/next tabindex to allow today focus in init mode
						var prev = obj.querySelector( '.' + acsa_config.datepicker.datepickerPrev );
						prev.setAttribute( 'tabindex', '-1' );
						var next = obj.querySelector( '.' + acsa_config.datepicker.datepickerNext );
						next.setAttribute( 'tabindex', '-1' );
						// add special event to set prev/next button tabindex to allow to catch it
						newSpan.addEventListener( 'focus', function(){
							prev.setAttribute( 'tabindex', '0' );
							next.setAttribute( 'tabindex', '0');
						}, false);
					}
					// span date listener to update input (mouse mode )
					newSpan.addEventListener( 'click', function(){
						var input = obj.querySelector( 'table' ).getAttribute('data-input');
						document.getElementById( input ).value = this.getAttribute( 'data-date' );
						resetGridCell();
						this.setAttribute( 'tabindex', '0');
						this.setAttribute( 'aria-selected','true' );
					}, false);
					// span date listener( keyboard mode )
					newSpan.addEventListener( 'keydown', function( event ){
						var keys = new keyCodes();
						if( event.keyCode === keys.enter || event.keyCode === keys.space ){
							var input = obj.querySelector( 'table' ).getAttribute('data-input');
							document.getElementById( input ).value = this.getAttribute( 'data-date' );	
							document.getElementById( input ).focus();
							event.preventDefault();
							event.stopPropagation();
						}
						if( event.keyCode === keys.right || event.keyCode === keys.down ){
							this.setAttribute('tabindex','-1' );
							this.setAttribute('aria-selected','false');
							var gotoGridCell = 1;
							if( event.keyCode === keys.down ) gotoGridCell = 7;
							var newGridcell = parseInt( this.getAttribute('data-n') ) + gotoGridCell;
							var begin = parseInt(obj.querySelector( '.' + acsa_config.datepicker.head ).getAttribute( 'data-begin' ) );
							var end = parseInt(obj.querySelector( '.' + acsa_config.datepicker.head ).getAttribute( 'data-end' ) );
							if( newGridcell - begin >= end ){
								resetCalendar( 'next' );
								listDay[firstDayInMonth].firstChild.setAttribute( 'tabindex', '0' );
								listDay[firstDayInMonth].firstChild.focus();
								listDay[firstDayInMonth].firstChild.setAttribute('aria-selected','true');
								
							}
							else{
								listDay[newGridcell].firstChild.setAttribute('tabindex','0');
								listDay[newGridcell].firstChild.focus();
								listDay[newGridcell].firstChild.setAttribute('aria-selected','true');
							}
							event.preventDefault();
							event.stopPropagation();
						}
						if( event.keyCode === keys.left || event.keyCode === keys.up ){
							this.setAttribute('tabindex','-1' );
							this.setAttribute('aria-selected','false');
							var gotoGridCell = 1;
							if( event.keyCode === keys.up ) gotoGridCell = 7;
							var newGridcell = parseInt( this.getAttribute('data-n') ) - gotoGridCell;
							var begin = parseInt(obj.querySelector( '.' + acsa_config.datepicker.head ).getAttribute( 'data-begin' ) );
							var end = parseInt(obj.querySelector( '.' + acsa_config.datepicker.head ).getAttribute( 'data-end' ) );
							if( newGridcell - begin < 0 ){
								resetCalendar( 'prev', true );	
							}
							else{
								listDay[newGridcell].firstChild.setAttribute('tabindex','0');
								listDay[newGridcell].firstChild.focus();
								listDay[newGridcell].firstChild.setAttribute('aria-selected','true');
							}
							event.preventDefault();
							event.stopPropagation();
						}
					}, false);
					// append date
					listDay[i].appendChild( newSpan );
					//listDay[i].appendChild( newSpanDayName );
				}
			}
		}
		function resetCalendar( mode, lastDay ){
			var header = obj.querySelector( '.' + acsa_config.datepicker.head );
			var newMonth = parseInt( header.getAttribute( 'data-month' ) );
			var newYear = parseInt( header.getAttribute( 'data-year' ) );
			if( mode === 'prev') newMonth -= 1;
			if( mode === 'next') newMonth +=1;
			if( newMonth < 0 ){
				newMonth = 11;
				newYear -= 1;
			}
			if( newMonth > 11) {
				newMonth = 0;
				newYear += 1;
			}
			//reset values
			header.removeChild( header.firstChild );
			// reset gridcell
			for( var i = 0, len = listDay.length; i < len; i++){
				if( listDay[i].firstChild )	listDay[i].removeChild( listDay[i].firstChild );
			}
			// populate
			setCalendar( newMonth, newYear );
			// last day focus  for prev keyboard mode
			if( lastDay ){
				var begin = parseInt(obj.querySelector( '.' + acsa_config.datepicker.head ).getAttribute( 'data-begin' ) );
				var end = parseInt(obj.querySelector( '.' + acsa_config.datepicker.head ).getAttribute( 'data-end' ) );
				var lastDayRef = begin + end -1;
				listDay[lastDayRef].firstChild.setAttribute( 'tabindex', '0' );
				listDay[lastDayRef].firstChild.focus();
				listDay[lastDayRef].firstChild.setAttribute('aria-selected','true');
			}
			// reset today highlight if necessary
				var monthRef = new Date().getMonth();
				var yearRef = new Date().getFullYear();
				var monthCtrl = parseInt(obj.querySelector( '.' + acsa_config.datepicker.head ).getAttribute( 'data-month' ) );
				var yearCtrl = parseInt(obj.querySelector( '.' + acsa_config.datepicker.head ).getAttribute( 'data-year' ) );
				var begin = parseInt(obj.querySelector( '.' + acsa_config.datepicker.head ).getAttribute( 'data-begin' ) );
				if( monthRef === monthCtrl && yearRef === yearCtrl){
					var now = new Date().getDate();
					var target = now + begin - 1;
					listDay[target].firstChild.classList.add( acsa_config.datepicker.today);
				}
		}
		//reset gridcell in mouse mode
		function resetGridCell(){
			for( var i = 0, len = listDay.length; i < len; i++){
				if( listDay[i].firstChild ){
					listDay[i].firstChild.setAttribute('tabindex','-1');
					listDay[i].firstChild.setAttribute('aria-selected','false');
				}
			}
		}
	}
	/*
	*** Component autocomplete ***
		- required obj : an autocomplete
		- required type : list or inline
	*/
	function Autocomplete(obj){
		this.obj = obj;
		//setup
		var type = obj.getAttribute('aria-autocomplete');
		var type = obj.querySelector( 'input' ).getAttribute('aria-autocomplete');
		var listOption = obj.querySelectorAll('li');
		var listBox = obj.querySelector( '.'+acsa_config.autocomplete.listBox );
		// generic index
		var ndx = 0;
		// patch role application to controle unespected key direction bug
		obj.setAttribute('role','application');
		obj.setAttribute('tabdindex','-1');
		switch( type ){
			case 'list':
				var targetTextBox = obj.querySelector( '.' + acsa_config.autocomplete.textboxList );
				var idRef = targetTextBox.getAttribute( 'id' );
				// flags for typed letter search in open list
				var firstSearchOption;
				var findOption;
				// set readonly and autocomplete
				targetTextBox.setAttribute('readonly','true');
				targetTextBox.setAttribute('autocomplete','off');
				// setup default value
				targetTextBox.setAttribute('data-start', idRef + '-0');
				targetTextBox.setAttribute('value',listOption[0].getAttribute( 'data-value' ) );
				// event on button open/close
				var target = obj.querySelector( '.'+ acsa_config.autocomplete.openClose );
				// setup default button values
				var txt = document.createTextNode( acsa_config.autocomplete.openCloseTxtClosed );
				target.querySelector('.' + acsa_config.autocomplete.openCloseTxtOffscreen ).appendChild( txt,target.firstChild );
				target.addEventListener( 'click', function(){
					openCloseListBox( this );
				}, false );
				// event textbox keyboard mode
				targetTextBox.addEventListener('keydown', function( event ){
					var keys = new keyCodes();
					if( event.keyCode === keys.esc ){
						closeListBox();
					}
					else if( event.keyCode === keys.down || event.keyCode === keys.right ){
						ndx += 1;
						if( listBox.classList.contains( acsa_config.autocomplete.listBoxOpen ) ) {
							lastOption();
							listOption[ndx].setAttribute( 'tabindex','0' );
							listOption[ndx].focus();
						}	
						if( ndx < listOption.length ){
							this.setAttribute('value', listOption[ndx].getAttribute( 'data-value' ) );
							this.setAttribute('data-start', listOption[ndx].getAttribute( 'id' ) );
						}
						else{
							ndx = listOption.length;
						}
						event.preventDefault();
						event.stopPropagation();
					}
					else if( event.keyCode === keys.up || event.keyCode === keys.left ){
						ndx -= 1;
						if( listBox.classList.contains( acsa_config.autocomplete.listBoxOpen ) ) {
							lastOption();
							listOption[ndx].setAttribute( 'tabindex','0' );
							listOption[ndx].focus();
						}
						if( ndx >= 0){
							this.setAttribute('value', listOption[ndx].getAttribute( 'data-value' ) );
							this.setAttribute('data-start', listOption[ndx].getAttribute( 'id' ) );
						}
						else{
							ndx = 0;
						}
						event.preventDefault();
						event.stopPropagation();
					}
				}, false );
			break;
			case 'inline':
				var targetTextBox = obj.querySelector( '.'+acsa_config.autocomplete.textboxInline );
				var idRef = targetTextBox.getAttribute( 'id' );	
				// set default values
				targetTextBox.setAttribute('data-start', idRef + '-0');
				targetTextBox.setAttribute('value',listOption[0].getAttribute( 'data-value' ) );
				// flags for typed string search in open list
				var firstSearchOption;
				var lastSearchOption;
				var findOption;
				var startSelect;
				//flag for first focus on textbox and init keydown
				var searchActive = false;
				var initKeyDown = false;
				// event onchange on textbox
				targetTextBox.addEventListener('keyup', function( event ){
					var keys = new keyCodes();
					if( event.keyCode === keys.esc ){
						closeListBox();
					}
					else if( event.keyCode === keys.down ){
						listOption[ndx].classList.remove( acsa_config.autocomplete.listOptionOn );
						ndx += 1;
						var ndxExtract = this.getAttribute('data-end').lastIndexOf('-');
						var ndxEnd = parseInt( this.getAttribute( 'data-end' ).substring( ndxExtract + 1 ) );
						var ndxExtract = this.getAttribute('data-start').lastIndexOf('-');
						var ndxBegin = parseInt( this.getAttribute( 'data-start' ).substring( ndxExtract + 1 ) );
						if( ndx < ndxBegin || ndx > ndxEnd){
							ndx = ndxBegin;
						}
						if( !initKeyDown ){;
							initKeyDown = true;
							startSelect = this.value.length
						}
						//var ndxExtract = this.getAttribute('data-end').lastIndexOf('-');
						//var ndxEnd = parseInt( this.getAttribute( 'data-end' ).substring( ndxExtract + 1 ) );
						if( ndx <= ndxEnd ){
							this.setAttribute('value', listOption[ndx].getAttribute( 'data-value' ) );
							listOption[ndx].classList.add( acsa_config.autocomplete.listOptionOn );
							this.select();
							if( listBox.classList.contains( acsa_config.autocomplete.listBoxOpen ) ){
								var endSelect = listOption[ndx].getAttribute( 'data-value' ).length;
								this.value = listOption[ndx].getAttribute( 'data-value' );
								this.setSelectionRange( startSelect, endSelect );
							}
						}
						else{
							ndx = listOption.length;
						}
						event.preventDefault();
						event.stopPropagation();
					}
					else if( event.keyCode === keys.up ){
						listOption[ndx].classList.remove( acsa_config.autocomplete.listOptionOn );
						ndx -= 1;
						var ndxExtract = this.getAttribute('data-end').lastIndexOf('-');
						var ndxEnd = parseInt( this.getAttribute( 'data-end' ).substring( ndxExtract + 1 ) );
						var ndxExtract = this.getAttribute('data-start').lastIndexOf('-');
						var ndxBegin = parseInt( this.getAttribute( 'data-start' ).substring( ndxExtract + 1 ) );
						if( ndx < ndxBegin || ndx > ndxEnd){
							ndx = ndxEnd;
						}
						if( !initKeyDown ){
							initKeyDown = true;
							startSelect = this.value.length
						}
						if( ndx >= ndxBegin && ndx<= ndxEnd ){
							this.setAttribute('value', listOption[ndx].getAttribute( 'data-value' ) );
							listOption[ndx].classList.add( acsa_config.autocomplete.listOptionOn );
							this.select();
							if( listBox.classList.contains( acsa_config.autocomplete.listBoxOpen ) ){
								var endSelect = listOption[ndx].getAttribute( 'data-value' ).length;
								this.value = listOption[ndx].getAttribute( 'data-value' );
								this.setSelectionRange( startSelect, endSelect );
							}
						}
						event.preventDefault();
						event.stopPropagation();
					}
					else if( event.keyCode === keys.enter ){
						listBox.classList.remove( acsa_config.autocomplete.listBoxOpen );
						this.select();
					}
					else{
							if( targetTextBox.value.length > 0  ){ 
								checkEntry( this, type, targetTextBox.value );
								initKeyDown = false;

							}
							else if( targetTextBox.value.length === 0){
								resetNdxList();
								initKeyDown = false;
							}
					}
					// init searchActive
					if( !searchActive ) searchActive = true;
				}, false );
				//blur closed the option list
				targetTextBox.addEventListener('blur', function(){
					if( listBox.classList.contains( acsa_config.autocomplete.listBoxOpen ) )
						listBox.classList.remove( acsa_config.autocomplete.listBoxOpen );
						targetTextBox.setAttribute('aria-expanded', 'false' );
				}, false);
			break;
		}
		//set List and option events
		setList();
		function setList(){
			for( var i = 0, len = listOption.length; i < len; i++){
				var idRefTxt = idRef + '-' + i;
				var txt = listOption[i].firstChild.innerText || listOption[i].firstChild.textContent;
				listOption[i].setAttribute('tabindex','-1');
				listOption[i].setAttribute('id', idRefTxt );
				listOption[i].setAttribute('data-value', txt );
				listOption[i].setAttribute('data-n', i );
				// events mouse mode
				listOption[i].addEventListener('click', function(){
					targetTextBox.setAttribute('data-start', this.getAttribute('id') );
					targetTextBox.setAttribute('value', this.getAttribute('data-value') );
					closeListBox();
				}, false );
				// events listOption keyboard mode
				listOption[i].addEventListener( 'keydown', function( event ){
					var keys = new keyCodes();
					// set start and end flag for inline mode
					if( type === 'inline' ) {
						var target = targetTextBox.getAttribute('data-start');
						var lastOptionArray = target.split('-')
						var start = parseInt( lastOptionArray[1] );
						var target = targetTextBox.getAttribute('data-end');
						var lastOptionArray = target.split('-')
						var end = parseInt( lastOptionArray[1] );
					}
					if( this.getAttribute( 'data-n' ) ){
						ndx = parseInt( this.getAttribute( 'data-n' ) );	
					}
					this.setAttribute( 'tabindex', '-1' );
					if( event.keyCode === keys.esc ){
						closeListBox();
					}
					else if( event.keyCode === keys.up || event.keyCode === keys.left ){
						if( type === 'inline' ){
							targetTextBox.setAttribute('value', this.getAttribute('data-value') );
						}
						ndx -= 1;
						if( type === 'inline' ) {
							ndx += start;
						}
						if( ndx === 0 ) ndx = listOption.length -1;
						if ( type === 'inline' ){
							if( ndx < start) ndx = end;						
						}
						listOption[ndx].setAttribute( 'tabindex', '0' );
						listOption[ndx].focus();
						if( type === 'inline' ){
							targetTextBox.setAttribute('value', this.getAttribute('data-value') );
						}
						event.preventDefault();
						event.stopPropagation();
					}
					else if( event.keyCode === keys.down || event.keyCode === keys.right ){
						if( type === 'inline' ){
							targetTextBox.setAttribute('value', this.getAttribute('data-value') );
						}
						ndx += 1;
						if( type === 'inline' ) {
							ndx += start;
						}
						if( ndx === listOption.length ) ndx = 0;
						if ( type === 'inline' ){
							if( ndx > end) ndx = start;						
						}
						listOption[ndx].setAttribute( 'tabindex', '0' );
						listOption[ndx].focus();
						event.preventDefault();
						event.stopPropagation();
					}
					if( event.keyCode === keys.enter ){
						targetTextBox.setAttribute('data-start', this.getAttribute('id') );
						targetTextBox.setAttribute('value', this.getAttribute('data-value') );
						closeListBox();
						event.preventDefault();
						event.stopPropagation();
					}						
					else if( event.keyCode > 47 && event.keyCode < 122 && listBox.classList.contains( acsa_config.autocomplete.listBoxOpen ) ){
						checkEntry( this, type, event.keyCode );
					};
				}, false );
			}
		}
		function openCloseListBox( button ){			
			if( button.classList.contains( acsa_config.autocomplete.openCloseOpen ) ){
				obj.querySelector('.' + acsa_config.autocomplete.textboxList ).setAttribute('aria-expanded', 'false' );
				listBox.classList.remove( acsa_config.autocomplete.listBoxOpen );
				button.classList.remove( acsa_config.autocomplete.openCloseOpen );
				var txt = document.createTextNode( acsa_config.autocomplete.openCloseTxtClosed );
				var invisible = button.querySelector('.' + acsa_config.autocomplete.openCloseTxtOffscreen );
				invisible.replaceChild( txt, invisible.firstChild );
				obj.querySelector( '.' + acsa_config.autocomplete.textboxList ).focus();
				// reset ndx
				lastOption();
			}
			else if( button.classList.contains( acsa_config.autocomplete.openClose ) ){
				obj.querySelector('.' + acsa_config.autocomplete.textboxList ).setAttribute('aria-expanded', 'true' );
				listBox.classList.add( acsa_config.autocomplete.listBoxOpen );
				button.classList.add( acsa_config.autocomplete.openCloseOpen );
				var txt = document.createTextNode( acsa_config.autocomplete.openCloseTxtOpen );
				var invisible = button.querySelector('.' + acsa_config.autocomplete.openCloseTxtOffscreen );
				invisible.replaceChild( txt, invisible.firstChild );
				obj.querySelector( '.' + acsa_config.autocomplete.textboxList ).focus();
				// reset ndx
				lastOption();
			}
			// reset firstSearchOption used for search entry
			firstSearchOption = false;
		}
		function closeListBox(){
			targetTextBox.setAttribute('aria-expanded', 'false' );
			listBox.classList.remove( acsa_config.autocomplete.listBoxOpen );
			if( type === 'list' ){
				obj.querySelector('.' + acsa_config.autocomplete.openClose ).classList.remove( acsa_config.autocomplete.openCloseOpen );
				var txt = document.createTextNode( acsa_config.autocomplete.openCloseTxtClosed );
				var invisible = obj.querySelector('.' + acsa_config.autocomplete.openCloseTxtOffscreen );
				invisible.replaceChild( txt, invisible.firstChild );
				obj.querySelector( '.' + acsa_config.autocomplete.textboxList ).focus();
			}
			else if( type === 'inline' ){
				obj.querySelector( '.' + acsa_config.autocomplete.textboxInline).focus();
			}			
		}
		function lastOption(){
			var target = targetTextBox.getAttribute('data-start');
			var lastOptionArray = target.split('-');
			ndx = parseInt( lastOptionArray[1] );
		}
		function checkEntry( obj, mode, key ){
			if( mode === 'list' ){				
				for( var i = 0, len = listOption.length; i < len; i++ ){
					var txtTest = listOption[i].getAttribute( 'data-value' );
					var charTest = String.fromCharCode( key );
					if( txtTest.search( charTest ) != -1 && txtTest.indexOf( charTest) === 0 ){
						if( !firstSearchOption ) firstSearchOption = listOption[i].getAttribute( 'data-n' );
						if( i > ndx ){
							var findOption = i;
							i = listOption.length;	
						}
					}
				}
				if( findOption ){
					obj.setAttribute( 'tabindex', '-1' );
					listOption[ findOption ].setAttribute( 'tabindex','0' );
					listOption[ findOption ].focus();				
				}
				else if( firstSearchOption ) {
					var findOption = parseInt( firstSearchOption);
					obj.setAttribute( 'tabindex', '-1' );
					listOption[ findOption ].setAttribute( 'tabindex','0' );
					listOption[ findOption ].focus();				
				}
				// reset firstSearchOption
				firstSearchOption = false;	
			}
			else if( mode === 'inline' ){
					resetNdxList();
					firstSearchOption = false;
					findOption = false;
					searchActive = true;
					var ndxSearchRef = 0;
				for( var i = 0, len = listOption.length; i < len; i++ ){
					var txtTest = listOption[i].getAttribute( 'data-value' ).toLowerCase();
					var exprTest = targetTextBox.value.toLowerCase();
					if( txtTest.search( exprTest ) === 0 ){
						if( !firstSearchOption ) {
							firstSearchOption = listOption[i].getAttribute( 'id' );
						}
						listOption[i].setAttribute('style','block');
						listOption[i].setAttribute('data-n', ndxSearchRef);
						ndxSearchRef += 1;
						lastSearchOption = listOption[i].getAttribute( 'id' );
					}
					else{
						listOption[i].setAttribute('style','display:none');
						listOption[i].setAttribute('data-n','-1');
					}
				}
				// resynchronize ndx
				if( firstSearchOption ) {				
					targetTextBox.setAttribute('data-start', firstSearchOption );
					targetTextBox.setAttribute('data-end', lastSearchOption );
					findOption = true;
					targetTextBox.setAttribute('aria-expanded', 'true' );
				}
					firstSearchOption = false;
					findOption = false
				// open listBox
				if( !listBox.classList.contains( acsa_config.autocomplete.listBoxOpen ) ){
					listBox.classList.add( acsa_config.autocomplete.listBoxOpen );
					targetTextBox.setAttribute('aria-expanded', 'true' );
				}
			}
		}
		function resetNdxList(){
			for( var i = 0, len = listOption.length; i < len; i++ ){
				listOption[i].setAttribute('data-n', i );
				listOption[i].setAttribute('style', 'block' );
			}
			targetTextBox.setAttribute( 'data-start', idRef + '-0' );
			targetTextBox.setAttribute( 'data-end', idRef + '-'+listOption.length );
			if( !listBox.classList.contains( acsa_config.autocomplete.listBoxOpen ) ){
				listBox.classList.add( acsa_config.autocomplete.listBoxOpen );
			}
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