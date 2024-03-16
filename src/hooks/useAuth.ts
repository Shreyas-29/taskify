import { appwrite } from "@/lib/appwrite";
import { Models } from "appwrite";

type User = Models.User<Models.Preferences>;

export const useSignIn = async (email: string, password: string): Promise<User | null> => {
    try {
        // await appwrite.account.createSession("[USER_ID]", "[SECRET]");
        const session = await appwrite.account.createEmailPasswordSession(email, password);
        const user = await appwrite.account.get();
        return user;
    } catch (error) {
        console.log("Signin Error: ", error);
        return null;
    };
};

export const useSignUp = async (email: string, password: string, name: string): Promise<User | null> => {
    try {
        await appwrite.account.create(appwrite.ID.unique(), email, password, name);
        // await appwrite.account.createSession("[USER_ID]", "[SECRET]");
        // await appwrite.account.createEmailToken("[USER_ID]", email);
        const user = await appwrite.account.get();
        return user;
    } catch (error) {
        console.log("Signup Error: ", error);
        return null;
    };
};

// export const useSignOut = async (): Promise<void> => {
//     try {
//         await appwrite.account.deleteSession("current");
//     } catch (error) {
//         console.log("Signout Error: ", error);
//     };
// };
export const useSignOut = async (): Promise<boolean> => {
    try {
        await appwrite.account.deleteSession("current");
        return true; // Indicate successful signout
    } catch (error) {
        console.error("Signout Error:", error);
        return false; // Indicate error
    }
};


export const useForgotPassword = async (email: string): Promise<void> => {
    try {
        await appwrite.account.createRecovery(email, "https://example.com/recovery");
    } catch (error) {
        console.log("ForgotPassword Error: ", error);
    }
};

export const useIsLoggedIn = async (): Promise<boolean> => {
    try {
        const user = await appwrite.account.getSession("current");
        return !!user;
    } catch (error) {
        console.log("IsLoggedIn Error: ", error);
        return false;
    };
};
