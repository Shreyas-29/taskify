import { appwrite } from '@/lib/appwrite';
import { ID, Models } from 'appwrite';
import React, { useContext, useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

interface AuthContextProps {
    user: Models.User<Models.Preferences>;
    isLoggedIn: boolean | undefined;
    isLoading: boolean;
    signUp: (email: string, password: string, name: string) => Promise<any>;
    signIn: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<any>;
}

export const AuthContext: React.Context<AuthContextProps | undefined> = React.createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {

    const [user, setUser] = useState({} as Models.User<Models.Preferences>);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await appwrite.account.get();
                setUser(res);
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const signUp = async (email: string, password: string, name: string) => {
        try {
            const res = await appwrite.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            setUser(res);
            setIsLoggedIn(true);

            return { success: true, data: res };
        } catch (error) {
            console.log("Error signup", error);
            return { success: false, data: error };
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            await appwrite.account.createEmailPasswordSession(email, password);
            const res = await appwrite.account.get();

            setUser(res);
            setIsLoggedIn(true);

            return { success: true, data: res };
        } catch (error) {
            console.log("Error signin", error);
            return { success: false, data: error };
        }
    };

    const signOut = async () => {
        try {
            await appwrite.account.deleteSession("current");
            setUser({} as Models.User<Models.Preferences>);
            setIsLoggedIn(false);
            return { success: true };
        } catch (error) {
            console.log("Error signout", error);
            return { success: false, data: error };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                isLoading,
                signUp,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
