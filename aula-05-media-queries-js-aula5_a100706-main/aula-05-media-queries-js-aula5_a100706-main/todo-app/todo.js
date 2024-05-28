class TaskAlreadyAdded extends Error {
    constructor(message) {
        super(message);
        this.name = 'TaskAlreadyAdded';
    }
}


class TodoList {
    constructor() {
        this.todos = new Map();
        this.id = 0;
    }

    getSize() {
        return this.todos.size;
    }

    getNextId() {
        this.id += 1;
        return `task-${this.id}`
    }

    hasTaskValue(value) {
        const values = Array.from(this.todos.values());
        return values.includes(value);
    }

    addTask(value) {
        if (this.hasTaskValue(value)) {
            throw new TaskAlreadyAdded('Esta tarefa já foi adicionada anteriormente.');
        } else if (value !== '') {
            const id = this.getNextId();
            this.todos.set(id, value);
            return id;
        }
        return null;
    }

    removeTask(taskID) {
        this.todos.delete(taskID);
    }
}


const todoList = new TodoList();


const domHandler = (() => {

    const createElement = (type, clas, id, append, text) => {
		const element = document.createElement(`${type}`);

        if (clas != null)
            element.classList.add(`${clas}`);
		if (id != null)
			element.setAttribute('id', `${id}`);
		if (text != null)
			element.textContent = text;
		append.appendChild(element);

		return element;
	};

    const clearDiv = (div) => {
		while (div.firstChild) {
			div.removeChild(div.lastChild);
		}
	};

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('pt-PT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('list-date').textContent = formattedDate;

    const addTask = (value, id) => {
        const todoList = document.getElementById('todo-list');
        taskContainer = createElement('li', 'todo-list-item', id, todoList);
        taskP = createElement('p', null, null, taskContainer, value);
        button = createElement('button', null, null, taskContainer, 'Delete');
        eventHandler.addDeleteButtonListener(button, id);
    }

    const removeTask = (id) => {
        const taskContainer = document.getElementById(id);
        if (taskContainer) {
            clearDiv(taskContainer);
            taskContainer.remove();
            todoList.removeTask(id)
        }
    }

    return { addTask, removeTask }
})();


const eventHandler = (() => {

    const initializeTodoFormListener = () => {
        const todoForm = document.getElementById('todo-form');
    
        todoForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const taskInput = document.getElementById('task-input')
            const taskValue = taskInput.value.trim();
            
            try {
                const id = todoList.addTask(taskValue);
                if (id != null) {
                    domHandler.addTask(taskValue, id);
                    taskInput.value = ''
                }
            } catch (error) {
                if (error instanceof TaskAlreadyAdded) {
                    alert(error);
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', initializeTodoFormListener);

    const addDeleteButtonListener = (button, id) => {
        button.addEventListener('click', () => {
            domHandler.removeTask(id);
        })
    }

    return { addDeleteButtonListener }
})();
