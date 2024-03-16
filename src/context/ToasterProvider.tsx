import { ToastProvider } from 'react-native-toast-notifications';

interface Props {
    children: React.ReactNode;
}

const ToasterProvider = ({ children }: Props) => {
    return (
        <ToastProvider
            placement="bottom"
            animationType="zoom-in"
            offsetBottom={32}
            swipeEnabled={true}
            animationDuration={200}
            textStyle={{ fontFamily: 'Medium', color: "#171717", fontSize: 12, textAlign: "center" }}
            style={{ borderWidth: 1, borderColor: "#e5e5e5", backgroundColor: "#fff", borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8, shadowColor: "#e5e5e5", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
        >
            {children}
        </ToastProvider>
    )
};

export default ToasterProvider;
