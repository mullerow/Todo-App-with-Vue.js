Vue.createApp({
  data() {
    return {
      todos: [],
      newTodo: "",
      filterModus: "allTodos",
      filteredTodos: [],
      apiUrl: "http://localhost:4730/todos/",
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
        this.saveTodoAPI();
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
    async getTodosFromAPI() {
      const response = await fetch(this.apiUrl);
      const todoData = await response.json();
      this.todos = todoData;
      this.filteredTodos = this.todos;
    },
    async deleteAPITodos(doneTodoId) {
      await fetch(this.apiUrl + doneTodoId, {
        method: "DELETE",
      });
    },
    async deleteDoneTodos() {
      for (i = this.todos.length - 1; i >= 0; i--) {
        if (this.todos[i].done === true) {
          console.log("id", this.todos[i].id);
          const doneTodoId = this.todos[i].id;
          await this.deleteAPITodos(doneTodoId);
        }
      }
      await this.getTodosFromAPI();
    },
    async updateTodo(todo) {
      todo.done = !todo.done;
      await fetch(this.apiUrl + todo.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
    },

    async saveTodoAPI() {
      const newTodoObject = {
        done: false,
        description: this.newTodo,
      };
      await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodoObject),
      });
      await this.getTodosFromAPI();
    },
  },

  async created() {
    await this.getTodosFromAPI();
  },
}).mount("#app");
