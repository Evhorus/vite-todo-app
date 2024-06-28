import todoStore, { Filters } from "../store/todo.store";
import { renderTodos, renderPendingTodos } from "../use-cases";
import html from "./app.html?raw";

const ElementIds = {
    ClearCompletedButton: ".clear-completed",
    TodoList: ".todo-list",
    NewTodoInput: "#new-todo-input",
    TodoFilters: ".filtro",
    PendingCountLabel: "#pending-count",
};

/**
 *
 * @param {String} elementId
 */

export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPendingTodos(ElementIds.PendingCountLabel);
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
    const clearCompletedButton = document.querySelector(
        ElementIds.ClearCompletedButton
    );
    const filtersLis = document.querySelectorAll(ElementIds.TodoFilters);

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
        const isDestroyElement = e.target.className === "destroy";
        const element = e.target.closest("[data-id]");
        if (!element || !isDestroyElement) return;
        todoStore.deleteTodo(element.getAttribute("data-id"));
        displayTodos();
    });

    clearCompletedButton.addEventListener("click", () => {
        todoStore.deleteCompleted();
        displayTodos();
    });
    filtersLis.forEach((element) => {
        element.addEventListener("click", (element) => {
            filtersLis.forEach((el) => el.classList.remove("selected"));
            element.target.classList.add("selected");

            switch (element.target.text) {
                case "Todos":
                    todoStore.setFilter(Filters.All);
                    break;
                case "Pendientes":
                    todoStore.setFilter(Filters.Peding);
                    break;
                case "Completados":
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos();
        });
    });
};
