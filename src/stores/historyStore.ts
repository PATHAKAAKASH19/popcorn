import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


interface HistoryType  {
    searchHistory: string[];
    addHistory: (name:string) => void
}


const historyStore =

const useHistory = create<HistoryType>()(
    devtools(
        persist(
            (set) => ({
    searchHistory: [],
    addHistory: (name) => set((state:HistoryType) => ({searchHistory : [...state.searchHistory, name] }))
}),
            { name: "historyStore" },
        )
    )
);


export default useHistory
