const
	checklist = document.getElementById('checklist'),
	addItem   = document.getElementById('add');

const addItemToList = () => {
	const li = document.createElement('li');
	li.classList.add('checklist-item');

	li.innerHTML = `
		<div class="checklist-item-check">
			<input type="checkbox" />
		</div>
		<textarea class="checklist-item-text"></textarea>
	`;

	checklist.insertBefore(li, addItem);
}

addItem.children[0].addEventListener('click', addItemToList);
