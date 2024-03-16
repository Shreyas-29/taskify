# Taskify

Taskify is task management application built with [React Native](https://reactnative.dev/) and [Appwrite](https://appwrite.io/). It allows you to create, manage, and organize their tasks efficiently.

## Features

- Create tasks with titles, descriptions, dates, and priorities.
- Set reminders for tasks.
- Mark tasks as completed.
- View tasks based on various filters (e.g., today, upcoming, completed).
- Edit and delete tasks.
- User authentication and authorization using Appwrite.
- Secure storage of tasks and user data.

## Screenshots

| ![signin](https://github.com/Shreyas-29/taskify/assets/111555846/d03f74a5-1bef-4025-b536-3fe80c143a82) | ![signup](https://github.com/Shreyas-29/taskify/assets/111555846/005d8b76-02e2-4825-95c5-02f1d5d5919f) |
|-------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| ![home](https://github.com/Shreyas-29/taskify/assets/111555846/25716474-4b2c-4a10-8eb9-b90eae4d4a8b)   | ![completed](https://github.com/Shreyas-29/taskify/assets/111555846/7bbdcf9f-22b0-4ddb-b503-82f816b1c79d) |
| ![add-task](https://github.com/Shreyas-29/taskify/assets/111555846/272a8285-ee16-4055-b6b8-6165a593dc06) | ![profile](https://github.com/Shreyas-29/taskify/assets/111555846/cc45357a-1779-4fee-ab2f-865568cf3d0a)   |
| ![search](https://github.com/Shreyas-29/taskify/assets/111555846/ac728561-e4da-430c-a91a-fe029e37728b)   | ![notification](https://github.com/Shreyas-29/taskify/assets/111555846/16eba37c-4bb5-4c8c-9c7b-07310597c0de) |
| ![details](https://github.com/Shreyas-29/taskify/assets/111555846/d31af051-2adf-483e-a958-e58a6ee1890a) |


## Installation

To run the Taskify app locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/taskify.git
   Install dependencies:
   ```

2. Navigate to the project directory:

   ```
    cd taskify
    npm install
   ```

3. Configure Tailwind CSS [Nativewind](https://www.nativewind.dev/quick-starts/expo)
   - Use ```tailwindcss@3.3.2``` this version of tailwindcss with nativewind guide
   - Create ```my-app.d.ts``` file and add this code:

      ```
     /// <reference types="nativewind/types" />
     ```
     This step is mandatory to use the ```className``` prop in native components.
   
4. Configure Appwrite

   - Create an account on [Appwrite](https://appwrite.io/).
   - Create a new project and add a database to it.
   - Create a new collection in the database with the following fields:
     - title (string)
     - description (string)
     - priority (enum: important, high, medium, low)
     - dueDate (datetime)
     - status (boolean - default: pending, completed)
   - Create a new API key with the following permissions:
     - Read and Write on the collection you created
     - Read and Write on the user collection
   - Copy the API endpoint and the API key and replace the placeholders in the `src/lib/appwrite.ts` file with your own values.

5. Start the app:

   ```
    npm start
   ```

   Open the app on your device using Expo Go or an emulator.

## Usage

Once the app is running, you can:

- Create a new account or log in using an existing account.
- View the list of tasks.
- Create a new task by clicking the "Add" button.
- Edit or delete a task by clicking on the task card.
- Mark a task as completed by clicking the Mark as Complete button.
- View tasks based on various filters (e.g., today, upcoming, completed) using the tabs at the top of the screen.

## Tech Stack

- [React Native](https://reactnative.dev/)
- [Appwrite](https://appwrite.io/)
- [Expo](https://expo.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Moment](https://momentjs.com/)
- [React Native Toast Notifications](https://www.npmjs.com/package/react-native-toast-notifications)
- [Zustand](https://zustand.surge.sh/)

## Contributing

Contributions are welcome! Here are some ways you can contribute:

- Report bugs and make suggestions for new features by opening an issue.
- Contribute to the project by opening a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
