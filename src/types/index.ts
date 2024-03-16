import { Models } from "appwrite";

export type Priority = 'important' | 'high' | 'medium' | 'low';

export type Status = 'completed' | 'pending';

export type Task = {
    $id?: string;
    title: string;
    description: string;
    date: Date;
    time?: Date;
    priority: Priority;
    reminder?: boolean;
    status?: Status;
    userId?: string;
};

// NOTE: T represents an additional type that can be merged with the Models.Document type. ExtendedDocument is added to the type definition of the Task.
export type ExtendedDocument<T> = Models.Document & T;
