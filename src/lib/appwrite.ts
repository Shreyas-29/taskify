import { Account, Client, ID } from 'appwrite';

const client = new Client();

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string;

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

export const appwrite = {
    client,
    account: new Account(client),
    ID,
};
