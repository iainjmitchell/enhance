(function(document){

  function enhanceSelects(){
		var count = 0,
			selects = document.getElementsByTagName('select'),
			selectCount = selects.length;
		for (count; count < selectCount; count++){
			new Select(selects[count]);
		}
	}	

	var Select = function(element){
		var FOCUS_CLASS = 'focus',
			select = document.createElement('div'),
			selectText = document.createElement('span'),
			options = new Options(element.getElementsByTagName('option'), element);
		function init(){
			selectText.innerHTML = element.value;
			select.className = 'select';
			select.appendChild(selectText);
			element.parentNode.insertBefore(select, element);
			element.onchange = changed;
			element.onfocus = focus;
			element.onblur = blur;
			select.onclick = click;
		}

		function click(){
			options.show();
		}

		function changed(){
			selectText.innerHTML = element.value;
		}

		function focus(){
			select.className = select.className + ' ' + FOCUS_CLASS;
		}
		function blur(){
			var className = select.className;
			className = className.replace(FOCUS_CLASS, '');
			select.className = className;
		}
		init();
		return this;
			
	};

	var Options = function(elements, selectElement){
		var options = document.createElement('div');

		function init(){
			var count = 0
				optionsCount = elements.length;
			options.style.display = 'none';
			options.className = 'options';
			for (count; count < optionsCount; count++){
				var option = document.createElement('div');
				option.innerHTML = elements[count].value;
				options.appendChild(option);
			}
			selectElement.parentNode.insertBefore(options, selectElement);
		}

		function show(){
			options.style.display = 'block';
		}
		init();


		return {
			show : show
		};
	}


	enhanceSelects();
})(document);
