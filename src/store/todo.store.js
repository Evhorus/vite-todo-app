import { Todo } from "../todos/models/todo.model";
// Store

export const Filters = {
    All: "all",
    Completed: "completed",
    Peding: "pending",
};

const state = {
    todos: [],
    filter: Filters.All,
};

const iniStore = () => {
    loadStore();
    console.log(state);
    console.log("InitStore 🥑");
};

const loadStore = () => {
    if (!localStorage.getItem("state")) return;
    const { todos = [], filter = filter.All } = JSON.parse(
        localStorage.getItem("state")
    );
    state.todos = todos;
    state.filter = filter;
};

const saveStateToLocalStorage = () => {
    localStorage.setItem("state", JSON.stringify(state));
};

/**
 *
 * @param {Object} newFilter
 */

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter((todo) => todo.done);

        case Filters.Peding:
            return state.todos.filter((todo) => !todo.done);

        default:
            throw new Error(`Option ${filter} is not valid.`);
    }
};

/**
 *
 * @param {String} description
 */
const addTodo = (description) => {
    console.log(description);
    if (!description) throw new Error("Description is required");
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
};

/**
 *
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map((todo) => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
};

/**
 *
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter((todo) => todo.id !== todoId);
    saveStateToLocalStorage();
};
const deleteCompleted = () => {
    state.todos = state.todos.filter((todo) => !todo.done);
    saveStateToLocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */

const setFilter = (newFilter = Filters.All) => {
    // Object.keys(Filters).includes(newFilter)
    state.filter = newFilter;
    saveStateToLocalStorage();
};

const getCurrentFilter = () => {
    return state.filter;
};

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    iniStore,
    loadStore,
    setFilter,
    toggleTodo,
};
