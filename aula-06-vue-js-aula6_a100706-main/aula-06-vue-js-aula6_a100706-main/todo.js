const app = Vue.createApp({
    data: function () {
        return {
            todos: [],
            enteredTodo: '',
            today: new Date()   
        }
    },
    computed: {
        formattedDate() {
            return this.today.toLocaleDateString('pt-PT', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        },
        isEnteredTodoEmpty() {
            return this.enteredTodo.length === 0;
        }
    },
    methods: {
        setEnteredTodo(value) {
            this.enteredTodo = value.trim();
        },
        submitTodo() {
            if (this.todos.includes(this.enteredTodo)) {
                alert('Esta tarefa já existe.')
            } else if (this.enteredTodo != '') {
                this.todos.push(this.enteredTodo);
            }
            this.enteredTodo = '';
        },
        deleteTodo(idx) {
            this.todos.splice(idx, 1);
        }
    }
})

app.mount("#app");
