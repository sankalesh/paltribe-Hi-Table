export interface IDish {
    name: string;
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
  
  export interface IOrder {
    businessId: string;
    tableName: string;
    staffId: string;
    items: {
      businessId: string;
      kitchenId: string;
      zoneId: string;
      tableId: string;
      staffId: string;
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
        };
      };
      customerName: string;
      customerPhone: string;
    }[];
    time: string;
    date: string;
    isAccept: boolean;
    customerName: string;
    customerPhone: string;
    id: string;
  }
  
  export interface ICategory {
    businessId: string;
    name: string;
    visibility: boolean;
    timerOn: boolean;
    timerStart: Date | null;
    timerEnd: Date | null;
    availableDays: string[];
    hierarchy: string;
    coverImage: string;
    links: any[]; // You can replace 'any' with a more specific type if you have the structure of 'links' defined
    dishes: any[]; // You can replace 'any' with a more specific type if you have the structure of 'dishes' defined
    availability: boolean;
    version: number;
    id: string;
    childCate: IChildCategory[];
  }
  
  export interface IChildCategory {
    businessId: string;
    name: string;
    visibility: boolean;
    timerOn: boolean;
    timerStart: Date | null;
    timerEnd: Date | null;
    availableDays: string[];
    parentCategory: string;
    parentCategoryId: string;
    hierarchy: string;
    coverImage: string;
    links: any[]; // You can replace 'any' with a more specific type if you have the structure of 'links' defined
    dishes: any[]; // You can replace 'any' with a more specific type if you have the structure of 'dishes' defined
    availability: boolean;
    version: number;
    id: string;
  }
  

  