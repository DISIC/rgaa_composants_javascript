/* Content Management */
function AccessContent(){
		var sections = document.getElementsByClassName('a42-component');
		var menu = document.querySelectorAll('#menu li a');
		var menuRef = new Array;
		var inboard = document.getElementsByClassName('a42-inboard');
		setSection(sections, menu);
		document.getElementById('presentation').style.display = 'block';
		menu[0].setAttribute('title',menu[0].lastChild.nodeValue+' section active');
		menu[0].className = 'active';
		for ( var i=0; i < menu.length; i++ ) {
			menuRef[menu[i].getAttribute('href').substring(1)] = menu[i];
			menu[i].addEventListener('click', function () {
				setSection(sections, menu);
				var target = this.getAttribute('href').substring(1);
				this.className = 'active';
				this.setAttribute('title',this.lastChild.nodeValue + ' section active');
				document.getElementById(target).style.display = 'block';
				document.getElementById(target).focus();
			},
			false);
		}
		for ( var i=0; i < inboard.length; i++ ) {
			inboard[i].addEventListener('click', function () {
				setSection(sections, menu);
				var target = this.getAttribute('href').substring(1);
				menuRef[target].className='active';
				menuRef[target].setAttribute('title',menuRef[target].lastChild.nodeValue + ' section active');
				document.getElementById(target).style.display = 'block';
				document.getElementById(target).focus();
			},
			false);
		}
}
	/* utilities */
	function setSection(sections, menu){
		for ( var i=0; i < menu.length; i++ ) {
			menu[i].removeAttribute('class');
			menu[i].removeAttribute('title');
		}
		for ( var i=0; i < sections.length; i++ ) {
			sections[i].style.display = 'none';
		 }
	}