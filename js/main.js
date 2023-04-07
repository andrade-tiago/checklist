const
	edit      = document.getElementById('edit'),
	checklist = document.getElementById('checklist'),
	itens     = JSON.parse(localStorage.getItem('itens')) || [];

console.log(edit);

const generateItem = item => {
	const checklistItem = document.createElement('li');
	checklistItem.classList.add('checklist-item');
	checklistItem.dataset.id = item.id;

	const check = document.createElement('input');
	check.classList.add('checklist-item-check');
	check.type    = 'checkbox';
	check.checked = item.checked;

	const content = document.createElement('span');
	content.classList.add('checklist-item-text');
	content.innerHTML = item.content;

	checklistItem.appendChild(check);
	checklistItem.appendChild(content);
	checklistItem.appendChild(createEditButton(item.id));
	checklistItem.appendChild(createExcludeButton(item.id));
	checklist.appendChild(checklistItem);
}

const createEditButton = id => {
	const button = document.createElement('button');

	button.classList.add('btn', 'bi', 'bi-pencil');

	button.addEventListener('click', () => {
		const textEdit = edit.elements['text']

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

itens.forEach(item => generateItem(item));

edit.addEventListener('submit', event => {
	event.preventDefault();

	const textItem = edit.elements['text'];

	if (!textItem.value.trim())
		return alert('Insira um texto.'); 

	const item = {
		id: itens[itens.length - 1]? (itens[itens.length - 1].id + 1): 0,
		content: textItem.value,
		checked: false
	};

	itens.push(item);
	localStorage.setItem('itens', JSON.stringify(itens));

	generateItem(item);
	edit.reset();
});