import create from "zustand";

// Define the interface for alert data
interface IAlertData {
  businessId: string;
  tableName: string;
  tableId: string;
  staffId: string;
  status: string;
  time: string;
  message: string;
  isAlertOn: boolean;
  id: string;
}

interface IAlertStore {
  data: IAlertData[];
  historyData: IAlertData[];
  setData: (newData: IAlertData[]) => void;
  setHistoryData: (newData: IAlertData[]) => void;
  newAlertsCount: number;
  setNewAlertsCount: (count: number) => void;
}

// Create a Zustand store for alert data and history data
export const useAlert = create<IAlertStore>((set) => ({
    data: [] as IAlertData[],
    historyData: [] as IAlertData[],
    newAlertsCount: 0,
    setData: (newData: IAlertData[]) => set({ data: newData }),
    setHistoryData: (newData: IAlertData[]) => set({ historyData: newData }),
    setNewAlertsCount: (count: number) => set({ newAlertsCount: count }),
}));

