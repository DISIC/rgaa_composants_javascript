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
	}
}

// @license-endd
