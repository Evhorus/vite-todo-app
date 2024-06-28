import todoStore from "../store/todo.store";
import { renderTodos } from "../use-cases";
import html from "./app.html?raw";

const ElementIds = {
    TodoList: ".todo-list",
    NewTodoInput: "#new-todo-input",
};

/**
 *
 * @param {String} elementId
 */

export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
    };
    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement("div");
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUl = document.querySelector(ElementIds.TodoList);

    // Listeners
    newDescriptionInput.addEventListener("keyup", (e) => {
        if (e.keyCode !== 13) return;
        if (e.target.value.trim().length === 0) return;
        todoStore.addTodo(e.target.value);
        displayTodos();
        e.target.value = "";
    });

    todoListUl.addEventListener("click", (e) => {
        const element = e.target.closest("[data-id]");
        todoStore.toggleTodo(element.getAttribute("data-id"));
        displayTodos();
    });
    
    todoListUl.addEventListener("click", (e) => {
        const isDestroyElement = e.target.className === 'destroy'
        const element = e.target.closest("[data-id]");
        if(!element || !isDestroyElement) return 
        todoStore.deleteTodo(element.getAttribute("data-id"));
        displayTodos();
    });
};
