import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type HistoryType = {
  searchHistory: string[];
  addHistory: (name: string) => void;
  clearHistory: () => void,
  deleteHistory: (name:string) => void
};

const useHistory = create<HistoryType>()(
  devtools(
    persist(
      (set) => ({
        searchHistory: [],
            addHistory: (name) => {
                set((state: HistoryType) => ({
                    searchHistory: [name, ...state.searchHistory.filter((history:string) => history !== name)],
                }));
            }, 
        
        clearHistory: () => {
            set({searchHistory: []})
        },
        
        deleteHistory: (name) => {
            set((state:HistoryType) => ({searchHistory: state.searchHistory.filter((history:string) => name !== history)}))
        }
      }),
      { name: "historyStore" } 
    )
  )
);

export default useHistory;
