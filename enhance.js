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
		var FOCUS_CLASS = ' focus',
			selectContainer = document.createElement('div'),
			select = document.createElement('div'),
			options = new Options(element.getElementsByTagName('option'), selectContainer, changed);
		function init(){
			select.className = 'select';
			select.innerHTML = element.value;
			selectContainer.className = 'selectContainer'
			selectContainer.appendChild(select);
			element.parentNode.insertBefore(selectContainer, element);
			element.onchange = changed;
			element.onfocus = focus;
			element.onblur = blur;
			select.onclick = click;
		}

		function click(){
			options.show();
		}

		function changed(value){
			select.innerHTML = value;
			element.value = value;
		}

		function focus(){
			select.className = select.className + FOCUS_CLASS;
		}
		function blur(){
			var className = select.className;
			className = className.replace(FOCUS_CLASS, '');
			select.className = className;
		}
		init();
		return this;
			
	};

	var Options = function(elements, selectContainer, onChange){
		var options = document.createElement('div');

		function init(){
			var count = 0,
				optionsCount = elements.length;
			hide();
			options.className = 'options';
			for (count; count < optionsCount; count++){
				var option = document.createElement('div');
				option.innerHTML = elements[count].value;
				option.onclick = itemSelected;
				options.appendChild(option);
			}
			selectContainer.appendChild(options);
			return options;
		}

		function itemSelected(){
			onChange(this.innerHTML);
			hide();
		}

		function show(){
			options.style.display = 'block';
		}

		function hide(){
			options.style.display = 'none';
		}
		init();

		return {
			show : show
		};
	}


	enhanceSelects();
})(document);
