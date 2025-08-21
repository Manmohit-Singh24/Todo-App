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
                    },
                    "Get-Started1234": {
                        title: "Get Started",
                        tagColor: "default",
                        order: 1,
                    },
                },
                sections: {
                    "NotSectioned-inbox": {
                        sectionName: "Not Sectioned",
                        tagId: "inbox",
                        order: -Infinity,
                    },
                    "NotSectioned-Get-Started1234": {
                        sectionName: "Not Sectioned",
                        tagId: "Get-Started1234",
                        order: -Infinity,
                    },
                    "Section1-1234": {
                        sectionName: "Section 1",
                        tagId: "Get-Started1234",
                        order: 3,
                    },
                },
                todos: {
                    t1: {
                        task: "This a sample task I am adding to check if turnicate at end and not spread more than 1 lines",
                        description:
                            "This is a sample Discription I am adding to check if it clamp to 2 lines and turnicate at end. I think this was not enough , i need to write more to check it out ",
                        priority: 4,
                        dueDate: new Date("2027-08-08").toISOString(),
                        sectionId: "NotSectioned-inbox",
                        completed: true,
                        order: 1,
                    },
                    t2: {
                        task: "Task for '5/5/2025' ",
                        description: "",
                        priority: 4,
                        dueDate: new Date("2025-05-05").toISOString(),
                        sectionId: "NotSectioned-inbox",
                        completed: false,
                        order: 2,
                    },
                    t3: {
                        task: "Today's Task",
                        description: "This is the Today's Task",
                        priority: 4,
                        dueDate: new Date().toISOString(),
                        sectionId: "Section1-1234",
                        completed: false,
                        order: 3,
                    },
                    t4: {
                        task: "The parent tag 't4' ",
                        description: "",
                        priority: 1,
                        dueDate: new Date("2025-10-05").toISOString(),
                        sectionId: "Section1-1234",
                        completed: false,
                        isSubTask: false,
                        order: 4,
                    },
                    st1: {
                        task: "Subtask",
                        description: "",
                        priority: 4,
                        completed: false,
                        isSubTask: true,
                        parentTodoId: "t4",
                        subTaskDepth: 1,
                        order: 5,
                    },
                    sst1: {
                        task: "Sub-SubTask",
                        description: "",
                        priority: 4,
                        completed: false,
                        isSubTask: true,
                        parentTodoId: "st1",
                        subTaskDepth: 2,
                        order: 6,
                    },
                    ssst1: {
                        task: "Sub-Sub-SubTask",
                        description: "",
                        priority: 4,
                        completed: false,
                        isSubTask: true,
                        parentTodoId: "sst1",
                        subTaskDepth: 3,
                        order: 7,
                    },
                    sssst1: {
                        task: "Sub-Sub-Sub-SubTask",
                        description:
                            "This is at depth four , it is the last level for having Subtasks",
                        priority: 4,
                        completed: false,
                        isSubTask: true,
                        parentTodoId: "ssst1",
                        subTaskDepth: 4,
                        order: 8,
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
        };
        return res;
    };

    deleteTodo = async ({ email, token, todoId }) => {
        let res = { message: "Failed to make request", success: false, data: {} };
        return res;
    };

    updateTodo = async ({ email, token, todoId, newData }) => {
        let res = { message: "Failed to make request", success: false, data: {} };
        return res;
    };

    ToggleCompletedTodo = async ({ email, token, todoId }) => {
        let res = { message: "Failed to make request", success: false, data: {} };

        res = {
            message: "SuccessFully updated todo",
            success: true,
            data: {},
        };
        return res;
    };
}

const todoService = new Todo();
export default todoService;
