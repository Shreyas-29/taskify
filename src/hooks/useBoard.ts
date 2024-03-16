import { Task } from "@/types";
import { create } from "zustand";
import { type Client, Databases, ID, Models, } from "appwrite";
import { appwrite } from "@/lib/appwrite";

interface TaskStore {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => Promise<void>;
    updateTask: (taskId: string, taskUpdate: Partial<Task>) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
}

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID as string;

const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],

    setTasks: (tasks: Task[]) => {
        set((state) => ({
            tasks: tasks,
        }));
    },

    addTask: async (task) => {
        try {
            const userId = (await appwrite.account.get()).$id;

            const updatedTask = { ...task, userId };

            const databases = new Databases(appwrite.client);
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                updatedTask
            );

            // const newTask: Task = response.data as Task;

            // set((state) => ({
            //     tasks: [...state.tasks, newTask],
            // }));
            const newTask: Task | undefined = updatedTask;

            if (newTask && newTask?.date) {
                set((state) => ({
                    tasks: [...state.tasks, newTask],
                }));
            } else {
                console.log("Error: Invalid task data received");
            }
        } catch (error) {
            console.log("Error adding task: ", error);
        }
    },

    updateTask: async (taskId, taskUpdate) => {
        try {
            // FIXME: Why we are not using this response
            const databases = new Databases(appwrite.client);
            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                taskId,
                taskUpdate
            );

            // set((state) => ({
            //     tasks: state.tasks.map((task) => {
            //         if (task.id === taskId) {
            //             return updatedTask;
            //         }
            //         return task;
            //     }
            //     ),
            // }));
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.$id === taskId ? { ...task, ...taskUpdate } : task
                ),
            }));
        } catch (error) {
            console.log("Error updating task: ", error);
        }
    },

    deleteTask: async (taskId) => {
        try {
            const databases = new Databases(appwrite.client);
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                taskId
            );

            set((state) => ({
                tasks: state.tasks.filter((task) => task.$id !== taskId),
            }));
        } catch (error) {
            console.log("Error deleting task: ", error);
        }
    },
}));

export default useTaskStore;
