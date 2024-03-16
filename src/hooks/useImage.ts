import { create } from "zustand";

interface ImageStore {
    image: string;
    setImage: (image: string) => void;
}

const useImage = create<ImageStore>((set) => ({
    image: "",
    setImage: (image: string) => {
        set((state) => ({
            image: image,
        }));
    },
}));

export default useImage;
