class Todo {
    #API_URL;
    constructor() {
        this.#API_URL = ""; // Will replace with process.env.______
    }

    fetchTodos = async ({ email, token }) => {
        let res = { message: "Failed to make request", success: false, data: {} };

        // Fetch all todosData

        res = {
            message: "SuccessFully fetched todos",
            success: true,
            data: {
                tags: {
                    inbox: {
                        title: "Inbox",
                        sections: ["Not Sectioned", "Section-1"],
                        number: 1,
                    },
                    GetStarted1234: {
                        title: "Get Started",
                        sections: ["Not Sectioned", "Section-1"],
                        number: 0,
                    },
                },
                todos: {
                    t1: {
                        task: "This a sample task I am adding to check if turnicate at end and not spread more than 1 lines",
                        description:
                            "This is a sample Discription I am adding to check if it clamp to 2 lines and turnicate at end. I think this was not enough , i need to write more to check it out ",
                        priority: 0,
                        dueDate: new Date("2027-08-08").toISOString(),
                        subTasks: [],
                        tagId: "inbox", // default "inbox"
                        sectionName: "Section-1",
                        completed: false,
                    },
                    t2: {
                        task: "Second Task",
                        description: "",
                        priority: 0,
                        dueDate: new Date("2025-05-05").toISOString(),
                        subTasks: [],
                        tagId: "inbox", // default "inbox"
                        sectionName: "Not Sectioned",
                        completed: true,
                    },
                    t3: {
                        task: "Today Task",
                        description: "",
                        priority: 0,
                        dueDate: new Date().toISOString(),
                        subTasks: [],
                        tagId: "inbox", // default "inbox"
                        sectionName: "Section-1",
                        completed: false,
                    },
                    t4: {
                        task: "Tdoay 2 Task",
                        description: "There we go",
                        priority: 1,
                        dueDate: new Date("2025-10-05").toISOString(),
                        subTasks: {
                            st1: {
                                task: "Default Subtask",
                                description: "Default Subtask Description",
                                priority: 0,
                                subTasks: [],
                                completed: false,
                            },
                            st2: {
                                task: "Default Subtask",
                                description: "Default Subtask Description",
                                priority: 0,
                                subTasks: [],
                                completed: true,
                            },
                        },
                        tagId: "GetStarted1234", // default "inbox"
                        sectionName: "Section-1",
                        completed: false,
                    },
                },
            },
        };

        return res;
    };

    addTodo = async ({ email, token }) => {
        let res = { message: "Failed to make request", success: false, data: {} };

        res = {
            message: "SuccessFully added todo",
            success: true,
            data: {},
        }
        return res;
    };

    deleteTodo = async ({ email, token, todoId }) => {
        let res = { message: "Failed to make request", success: false, data: {} };
        return res;
    };

    updateTodo = async ({ email, token, todoId , newData}) => {
        let res = { message: "Failed to make request", success: false, data: {} };
        return res;
    };

    ToggleCompletedTodo = async ({ email, token, todoId }) => {
        let res = { message: "Failed to make request", success: false, data: {} };

        res = {
            message: "SuccessFully updated todo",
            success: true,
            data: {},
        }
        return res;
    };
}

const todoService = new Todo();
export default todoService;
