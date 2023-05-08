import {create} from "zustand";

type Alert = {
    status: string,
    tableName: string,
    dishName:string,
    time: string,
    total: string,
};

type State = {
  data: Alert[];
  history: Alert[];
  activeFilter: string;
  setMainData: (data: Alert[]) => void;
  addToHistory: (alert: Alert) => void;
  setActiveFilter: (filter: string) => void;
  filteredData: Alert[];
};

export const useStore = create<State>((set) => ({
  data: [],
  history: [],
  activeFilter: "",
  setMainData: (data) => set({ data }),
  addToHistory: (alert) =>
    set((state) => ({ history: [...state.history, alert] })),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  filteredData: [],
}));
