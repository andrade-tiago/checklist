const
	edit      = document.getElementById('edit'),
	checklist = document.getElementById('checklist'),
	sketch    = document.getElementById('sketch'),
	darkMode  = document.getElementById('dark-mode'),
	itens     = JSON.parse(localStorage.getItem('itens')) || [];

let dark = JSON.parse(localStorage.getItem('dark-mode')) || false;

const generateItem = item => {
	const checklistItem = document.createElement('li');
	checklistItem.classList.add('checklist-item', 'bg');
	checklistItem.dataset.id = item.id;

	const label = document.createElement('label');
	label.classList.add('checklist-item-check');
	label.htmlFor = `check-${item.id}`;
	label.title   = 'Marcar/Desmarcar item';

	const content = document.createElement('span');
	content.classList.add('checklist-item-text');
	content.innerHTML = item.content;

	checklistItem.appendChild(createCheckBox(item));
	checklistItem.appendChild(label);
	checklistItem.appendChild(content);
	checklistItem.appendChild(createEditButton(item.id));
	checklistItem.appendChild(createExcludeButton(item.id));
	checklist.appendChild(checklistItem);
}

const createCheckBox = item => {
	const check = document.createElement('input');
	check.type    = 'checkbox';
	check.id      = `check-${item.id}`;
	check.checked = item.checked;

	check.addEventListener('change', () => {
		itens[itens.findIndex(element => element.id === item.id)].checked = check.checked;

		localStorage.setItem('itens', JSON.stringify(itens));
	});

	return check;
}

const createEditButton = id => {
	const button = document.createElement('button');

	button.classList.add('btn', 'bi', 'bi-pencil');
	button.title = 'Editar conteúdo';

	button.addEventListener('click', () => {
		const textEdit = edit.elements['text'];

		if (textEdit.value.trim() && !confirm('O conteúdo da caixa de edição será descartado!'))
			return textEdit.focus();

		textEdit.value =
			checklist.querySelector(`[data-id="${id}"] .checklist-item-text`).innerText;

		excludeItem(id);
		textEdit.focus();
	})

	return button;
}

const createExcludeButton = id => {
	const button = document.createElement('button');

	button.classList.add('btn', 'bi', 'bi-trash');
	button.title = 'Excluir item';

	button.addEventListener('click', () => {
		if (confirm('Deletar item?')) {
			excludeItem(id);
		}
	});

	return button;
}

const excludeItem = id => {
	itens.splice(itens.findIndex(item => item.id === id), 1);
	localStorage.setItem('itens', JSON.stringify(itens));

	checklist.querySelector(`[data-id="${id}"]`).remove();
}

const toggleDarkMode = () => document.body.classList.toggle('dark');



itens.forEach(item => generateItem(item));
sketch.value = localStorage.getItem('sketch') || '';

edit.addEventListener('submit', event => {
	event.preventDefault();

	const textItem = edit.elements['text'];
	const input = textItem.value.trim();

	if (!input)
		return alert('Insira um texto.'); 

	input.split(/\n/g).forEach(linha => {
		linha = linha.trim();
		if (!linha) return;

		const item = {
			id: itens[itens.length - 1]? (itens[itens.length - 1].id + 1): 0,
			content: linha,
			checked: false
		};

		itens.push(item);
		generateItem(item);
	});

	localStorage.setItem('itens', JSON.stringify(itens));
	edit.reset();
});

sketch.addEventListener('blur', () => {
	localStorage.setItem('sketch', sketch.value);
});

if (dark) toggleDarkMode();
darkMode.addEventListener('click', () => {
	toggleDarkMode();

	dark = !dark;
	localStorage.setItem('dark-mode', JSON.stringify(dark));
});