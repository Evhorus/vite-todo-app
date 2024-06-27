import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: "all",
    Completed: "completed",
    Peding: "pending",
};

const state = {
    todos: [
        new Todo("Piedra del alama"),
        new Todo("Piedra del infinito"),
        new Todo("Piedra del Tiempo"),
    ],
    filter: Filters.All,
};

const iniStore = () => {
    console.log(state);
    console.log("InitStore 🥑");
};

export default {
    iniStore,
};
