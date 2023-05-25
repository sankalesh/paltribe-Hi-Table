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
    };
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
  links: any[]; 
  dishes: any[]; 
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
  links: any[]; 
  dishes: any[]; 
  availability: boolean;
  version: number;
  id: string;
}

export interface IBusinessData {
  settings?: ISettings;
  businessesData?: {
    businessName: string;
    registeredName: string;
    businessType: string;
    gstRegistered: boolean;
    multipleOutlets: boolean;
    customLink: string;
    logo: string;
    address: string;
    staff: string[];
    id: string;
  };
  dishesData?: IDish[];
  dishData?: IDish;
  categoryData?: ICategory[];
  categories?: ICategories[];
  allCategoriesTypes?: {
    main: ICategoryTypes;
    sub: ICategorySubTypes;
  };
}

export interface ICategories extends ICategory {
  dishes: IDish[];
}

export interface ISettings {
  businessId: string;
  themes: {
    [#2C62F0]Color: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    fontURL: string;
    buttonStyle: string;
    miniBanner: string;
    specialBanner: string;
    endBanner: string;
    instagramLink: string;
    facebookLink: string;
    youtubeLink: string;
    linkedinLink: string;
    footerText: string;
  };
  categoryOrder: string[];
  explore: {
    wallpaper: string;
    phone: string;
    countryCode: string;
    location: string;
    openFrom: string;
    openTill: string;
    specialOffers: {
      wallpaper: string;
      offerName: string;
      redirectType?: undefined;
      redirectId?: undefined;
      redirectName?: undefined;
    }[];
    popular: {
      id: string;
      name: string;
    }[];
    highlights: {
      name: string;
      stories: string[];
    }[];
  };
  navigation: {
    from: string;
    to: string;
    categoryCard: string;
    dishCard: string;
  };
  id: string;
}
export interface IDish {
  businessId: string;
  name: string;
  price: number;
  tax: null;
  visibility: boolean;
  discount: null;
  avgTime: null;
  dishType: string;
  categories: {
    id: string;
    name: string;
  }[];
  portions: IPortion[];
  extras: {
    name?: string;
    numOptions: number;
    numSelections: number;
    compulsory: number;
    items: IExtraItem[];
  }[];
  filters: {
    timeToConsume: string;
    portionBestSuited: string;
    levelOfSpice: string;
    bestOccasion: string;
    texture: string;
    time: string;
    bestWeather: string;
    dishes: never[];
  };
  images: string[];
  description: string;
  tags: never[];
  links: never[];
  version: number;
  id: string;
}

export interface ISpreadOption {}

export interface ICategory {
  businessId: string;
  name: string;
  visibility: boolean;
  timerOn: boolean;
  timerStart: null;
  timerEnd: null;
  availableDays: never[];
  hierarchy: string | "PARENT";
  parentCategory: string;
  parentCategoryId?: string;
  coverImage: string;
  links: never[];
  dishes: {
    id: string;
    name: string;
  }[];
  version: number;
  id: string;
}

export interface ICategoryTypes {
  [key: string]: ICategory;
}

export interface ICategorySubTypes {
  [key: string]: ICategory[];
}

export interface IExtraItem {
  name: string;
  price: string;
}

export interface IPortion {
  name: string;
  price: string;
  discount: string;
  default: boolean | string;
}


export interface IKot {
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
    };
  };
  customerName: string;
  customerPhone: string;
  dishStatus: string;
  kotTime: string;
  tableName: string;
  date: string;
  id: string;
}
