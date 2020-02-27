/* Todo js */

'use strict';

// Let's get the elements we need to add tasks
const taskForm = document.querySelector('#makeNameForm')
const tasks = document.querySelector('#tasks')

taskForm.addEventListener('submit', addName)

function addName(e) {
	
	e.preventDefault(); // prevent default form action

	console.log('Adding a task')

	// get data from form
	const taskName = document.querySelector('#tName').value

	console.log(taskName)

	// create the DOM elements
	const tableRow = document.createElement('tr')
	const taskLabel = document.createElement('td')
	const taskText = document.createTextNode(taskName)

	taskLabel.appendChild(taskText)
	tableRow.appendChild(taskLabel)

	const buttons = document.createElement('td')

	const editButton = document.createElement('button')
	editButton.className = 'edit'
	editButton.appendChild(document.createTextNode('edit'))
	buttons.appendChild(editButton)

	const removeButton = document.createElement('button')
	removeButton.className = 'remove'
	removeButton.appendChild(document.createTextNode('done'))
	buttons.appendChild(removeButton)

	tableRow.appendChild(buttons)

	tasks.appendChild(tableRow)

}
