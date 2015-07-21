/**
ComposantAria
GPL licence
Réalisé par access42.net
**/

// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

/*  =======================
	General configuration.
	You can customise all values by your owns, please be carrefull to distinguish "class CSS" values and "data-" values.
	=======================*/
var acsa_config = {
	/* 
		*** dialog / alertdialog *** 
		   		implementation :
				[ Open button ]
				- required : dialog.button className value
				- required : dialog.targetId data attribute Name (value = targeted dialog id )
				example : <button type="button" class="acsa-dial-button" data-acsa-target="my_id_dialog">open</button>
				[ Dialog element ]
				- optional : dialog.targetFocus attribute Name (value = first focused element within dialog element)
				  (By default the close button get by dialog.close className value)
				 example : <div role="dialog" data-acsa-focus="user" [...] > <input type="text id="user" /> </div>
				[ Close Button ]
				- required : dialog.close className value
	*/
	dialog : {
		//CSS
		button : 'acsa-dial-button',
		close : 'acsa-close',
		//data-
		targetId : 'data-acsa-target',
		targetFocus : 'data-acsa-focus'
	},
	/*
		*** slider ***
			implementation
			[cursor element]
			- required : slider.cursor className value
			- optional : slider.unit attribute name (value = textual value of unit input)
			example : <a tabindex="0" class="acsa-cursor-button" data-acsa-unit="%" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="0%" aria-labelledby="slider_name_id"></a>
	*/
	slider : {
		//CSS
		cursor : 'acsa-cursor-button',
		//data-
		unit : 'data-acsa-unit'
	},
	/*
		*** progressbar ***
		[indicator element]
		-required : progressbar.indicator className value
		example : <div role="progressbar" class="acsa-progress-indicator" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="0%"></div>
	*/
	progressBar : {
		//CSS
		indicator : 'acsa-progress-indicator'
	},
	/*
		*** button ***
		[button element]
		- required : button.button className value
		example : <span role="button" class="acsa-button" tabindex="0"></span>
	*/
	button : {
		//CSS
		button : 'acsa-button'
	},
	/*
		*** tabpanel ***
		[tabpanel element]
		-required : tabPanel.tabPanel main element className value
		example : <div class="acsa-tab-panel">
		[tablist element]
		-required : for each tab in tablist, tabPanel.head className value
		-required : for each tab in tablist, tabPanel.headActive className value for selected tab
		example : <div id="tab0" role="tab" aria-selected="true" aria-controls="pan0" class="acsa-tab-head  acsa-tab-head-active" tabindex="0">Panneau 1</div>
		[pan list element]
		-required : for each pan, tabPanel.pan className value
		-required : for each pan, tabPanem.panActive className caluer for selected tab.
		example : <div id="pan1"  role="tabpanel" class="acsa-tab-pan" aria-labelledby="tab1" aria-expanded="false" aria-hidden="true">
		
	*/
	tabPanel : {
		//Css
		tabPanel : 'acsa-tab-panel',
		head : 'acsa-tab-head',
		headActive : 'acsa-tab-head-active',
		pan : 'acsa-tab-pan',
		panActive : 'acsa-tab-pan-active'
	},
	/*
		*** Tooltip ***
		-required : toolTip.tooltip className value for the element wich called the tooltip referenced by aria-describedby
		example : <input type="text" class="acsa-tooltip" aria-describedby="IDtooltip" /><p id="IDtooltip" role="tooltip">tooltip text</p>
	*/
	tooltip : {
		//CSS
		tooltip : 'acsa-tooltip'
	},
	/*
		*** Checkbox ***
		-required : checkbox.checkbox className value for unique checkbox element with a labelledby label
		example : <span role="checkbox" aria-checked="false" aria-labelledby="id_checkbox" class="acsa-checkbox"></span><span id="id_checkbox">label</span>
		-required : checkbox.stateFalse className value for unchecked state
		-required : checkbox.stateTrue className value for checked state
	*/
	checkbox : {
		//CSS
		checkbox : 'acsa-checkbox',
		stateFalse : 'acsa-checkbox-false',
		stateTrue : 'acsa-checkbox-true'
	},
	/*
		*** Menubar ***
		-required : menubar.menuBar className value for the main menu contener
		-required : menubar.menuItem className value for the mains menu items
		-required : menubar.menuItemCheckbox className value for checkbox item
		-required : menubar.stateFalse classname value for unchecked state
		-required : menubar.stateTrue className value for checked state
		example : 
		<ul role="menubar" class="acsa-menubar">
		  <li role="menuitem" aria-haspopup="true" tabindex="-1" class="acsa-menuitem">
		   <ul role="menu">
		     <li role=" menuitemcheckbox" aria-checked="false" class="acsa-menuitem-checkbox acsa-menuitem-checkbox-false" tabindex="-1"><span>Arial</span></li>	 
	*/
	menubar : {
		//CSS
		menuBar : 'acsa-menubar',
		menuItem : 'acsa-menuitem',
		menuItemCheckbox : 'acsa-menuitem-checkbox',
		stateFalse : 'acsa-menuitem-checkbox-false',
		stateTrue : 'acsa-menuitem-checkbox-true'		
	},
	/*
		*** Accordion ***
		[accordion element]
		- required : accordion.accordion main element class value
			exemple : <div class="acsa-accordion" role="tablist">
		[tab element]
		-required : for each tab in tablist, accordion.head className value
		-required : for each tab in tablist a data-n value (index of tab in tablist)
		-required : for each tab in tablist, accordion.headActive className value for selected tab
		example : <div id="tab-accordion0" role="tab" aria-selected="true" aria-controls="pan-accordion0" class="acsa-accordion-head  acsa-accordion-head-active" tabindex="0" data-n="0">Panneau 1</div>
		[pan element]
		-required : for each pan, accordion.pan className value
		-required : for each pan, accordion.panActive className value for selected tab.
		example : <div id="pan-accordion0"  role="tabpanel" class="acsa-accordion-pan" aria-labelledby="tab-accordion0" aria-expanded="false" aria-hidden="true">
	*/
	accordion : {
		//Css
		accordion : 'acsa-accordion',
		head : 'acsa-accordion-head',
		headActive : 'acsa-accordion-head-active',
		pan : 'acsa-accordion-pan',
		panActive : 'acsa-accordion-pan-active'
	},
	/*
		*** tree ***
		[tree element]
		- required : tree.tree main element class value
			exemple : <ul class="acsa-tree-root-level" role="tree">
		[sub group element]
		-required : for each subtree, tree.subtree className value
		-required : for each subtree, tree.subtreeActive className value when subtree is open
			exemple : <ul class="acsa-tree-subgroup acsa-tree-subgroup-active" role="group">
		[item element]
		-required : for each treeitem, tree.treeitem className value 
		-required : for each visible treeitem in subtree, tree.treeitemVisible className value 
			example : <li class="acsa-tree-item acsa-tree-item-visible" tabindex="-1" role="treeitem">
		-required : for each tree item with subgroup ClassName value
			example: <li class="acsa-tree-item acsa-tree-item-subtree" aria-expanded=' false' tabindex="-1" role="treeitem">
		-required: for each tree item with subgroup when subgroup is open className Value
			example: <li class="acsa-tree-item acsa-tree-item-subtree acsa-tree-item-subtree-active" aria-expanded=' false' tabindex="-1" role="treeitem">
	*/
	tree : {
		//Css
		tree : 'acsa-tree-root-level',
		subtree : 'acsa-tree-subgroup',
		subtreeActive: 'acsa-tree-subgroup-active',
		treeitem: 'acsa-tree-item',
		treeitemSubtree: 'acsa-tree-item-subtree',
		treeitemSubtreeActive: 'acsa-tree-item-subtree-active',
		treeitemVisible: 'acsa-tree-item-visible'
	},
	/*
		*** datepicker ***
		[date picker element]
		- required : datepicker.datepicker main element class value
		- required : data-date : id of target input
			exemple : <div id="date-picker" class="acsa-date-picker" data-date="date-input">
		[date picker header and navigation element ]
		- required datepicker.head class value for header head (month/year indication)
		- required : datepicker.datepickerPrev class value for previous button
		- required : datepicker.datepickerNext class value for next button
			exemple : <button type="button" class="acsa-date-picker-prev">
		[date picker date element]
		- required : datepicker.datepickerActive class value
		- required : datepicker.today class value for today
	*/
	datepicker: {
		datepicker: 'acsa-date-picker-main',
		head: 'acsa-datepicker-header',
		datepickerPrev: 'acsa-date-picker-prev',
		datepickerNext: 'acsa-date-picker-next',
		datepickerActive: 'acsa-date-picker-active',
		today: 'acsa-date-picker-today',
		dayName: 'acsa-day-name'
	},
	/*
		*** autocomplete ***
		[autocomplete element]
		- required : autocomplete.autocomplete wrapper class main value
			exemple : <div class="acsa-autocomplete">
		-required : 
			autocomplete.openClose close statut button class value
			autocomplete.openCloseOpen open statut button class value
			autocomplete.openCloseTxtClosed close button text value
			autocomplete.openCloseTxtOpen open button text value
			autocomplete.openCloseTxtOffscreen offscreen text class value
			exemple : <button type="button" class="acsa-open-close openCloseTxtClosed"><span aria-hidden="true"></span><span class="invisible">[state text (null by default)]</span>
		[autocomplete textbox]
		- required :
			autocomplete.textboxInline class value for autocomplete inline mode
			autocomplete.textboxList class value for autocomplete list mode
			exemple : <input type="text" class="acsa-textbox-list" [...]>
		[autocomplete listbox]
		- required : autocomplete.textboxList litsOption class value
			
	*/
	autocomplete: {
		autocomplete: 'acsa-autocomplete',
		openClose: 'acsa-open-close',
		openCloseOpen : 'acsa-open-close-open',
		openCloseTxtClosed: 'afficher la liste des options',
		openCloseTxtOpen : 'fermer la liste des options',
		openCloseTxtOffscreen: 'invisible',
		textboxInline: 'acsa-textbox-inline',
		textboxList:  'acsa-textbox-list',
		listBox: 'acsa-autocomplete-listbox',
		listBoxOpen: 'acsa-autocomplete-listbox-open',
		listOptionOn: 'acsa-list-higlight'
	}
}

// @license-end