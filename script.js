Vue.createApp({
  data() {
    return {
      todos: [
        {
          id: 1,
          description: "erstmal Hallo",
          done: false,
        },

        {
          id: 2,
          description: "Wünsch einen guten Morgen!🌤️",
          done: true,
        },
        {
          id: 3,
          description: "dann Tschüss!!!",
          done: true,
        },
      ],
      newTodo: "",
      filterModus: "allTodos",
      filteredTodos: [],
    };
  },
  methods: {
    addTodo() {
      const duplicate = this.todos.some(
        (todo) =>
          todo &&
          todo.description &&
          todo.description.toLowerCase() === this.newTodo.toLowerCase()
      );
      if (this.newTodo === "") {
        return;
      } else if (duplicate) {
        return;
      } else {
        this.todos.push({
          id: Math.random().toString().substr(2),
          description: this.newTodo,
          done: false,
        });
      }
    },
    changeFilterMode(event) {
      this.filterModus = event.target.id;
      if (this.filterModus === "allTodos") {
        return (this.filteredTodos = this.todos);
      }
      if (this.filterModus === "openTodos") {
        this.filteredTodos = this.todos.filter((todo) => {
          return todo.done === false;
        });
        return this.filteredTodos;
      }
      if (this.filterModus === "doneTodos") {
        this.filteredTodos = this.todos.filter((todo) => {
          return todo.done === true;
        });
        return this.filteredTodos;
      }
    },
    deleteDoneTodos() {
      for (i = this.todos.length - 1; i >= 0; i--) {
        if (this.todos[i].done === true) {
          this.todos.splice(i, 1);
        }
      }
    },
  },
  created() {
    this.filteredTodos = this.todos;
  },
}).mount("#app");
