import {create} from 'zustand';

export interface ITable {
  tableData: {
    activeUser: number;
    businessId: string;
    capacity: number;
    deliverDish: number;
    tableId: string;
    name: string;
    staff: string[];
    status: string;
    time: string;
    totalDishQuantity: number;
    zoneId: string;
  };

  setTableData: (data: ITable['tableData']) => void;
}

export const useTable = create<ITable>((set) => ({
  tableData: {
    activeUser: 0,
    businessId: '',
    capacity: 0,
    deliverDish: 0,
    tableId: '',
    name: '',
    staff: [],
    status: '',
    time: '',
    totalDishQuantity: 0,
    zoneId: '',
  },

  setTableData: (data) => set({ tableData: data }),
}));
