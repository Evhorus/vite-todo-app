import { Todo } from "../todos/models/todo.model";
// Store

const Filters = {
    All: "all",
    Completed: "completed",
    Peding: "pending",
};

const state = {
    todos: [
        new Todo("Piedra del alma"),
        new Todo("Piedra del infinito"),
        new Todo("Piedra del Tiempo"),
    ],
    filter: Filters.All,
};

const iniStore = () => {
    console.log(state);
    console.log("InitStore 🥑");
};

const loadStore = () => {
    throw new Error("Not implemented");
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
    if (!description) throw new Error("Description is required");
    state.todos.push(new Todo(description));
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
        return todo
    });
};

/**
 *
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter((todo) => todo.id !== todoId);
};
const deleteCompleted = () => {
    state.todos = state.todos.filter((todo) => todo.done);
};

/**
 *
 * @param {Filters} newFilter
 */

const setFilter = (newFilter = Filters.All) => {
    // Object.keys(Filters).includes(newFilter)
    state.filter = newFilter;
};

const getCurrentFilter = () => {
    throw new Error("Not implemented");
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
