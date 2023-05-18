export interface IDish {
    name: string;
    id: string;
  }
  
  export interface IDishData {
    businessId: string;
    name: string;
    visibility: boolean;
    timerOn: boolean;
    timerStart: null | string;
    timerEnd: null | string;
    availableDays: string[];
    hierarchy: string;
    parentCategory: string;
    parentCategoryId: string;
    coverImage: string;
    links: string[];
    dishes: IDish[];
    availability: boolean;
    version: number;
    id: string;
  }
  export interface IStatus {
    businessId: string;
    kitchenId: string;
    zoneId: string;
    tableId: string;
    staffId: string;
    startedAt: number;
    cookedAt: number;
    status: string;
    dish: {
      dishId: string;
      name: string;
      price: number;
      qty: number;
      comments: string;
      extras: {
        name: string;
        price: string;
        qty: number;
      }[];
      portions: {
        name: string;
        price: string;
        discount: string;
        default: string;
      }
    };
    customerName: string;
    customerPhone: string;
    dishStatus: string;
    kotTime: string;
    tableName: string;
    date: string;
    id: string;
  }
  
  