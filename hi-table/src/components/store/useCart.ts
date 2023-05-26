import { create } from "zustand";
import { IDish, IExtraItem, IPortion } from "../types/hiTableData";
import { persist } from "zustand/middleware";

export interface ICartExtra {
  [key: string]: IExtraItem & {
    quantity: number;
  };
}

export interface ICartVariant {
    id:string
  extra?: ICartExtra | {};
  portion?: IPortion;
  quantity?: number;
}

export interface ICartDish {
  dishData?: IDish;
  dishId?: string;
  variants: ICartVariant[];
}

export interface ICart {
  [key: string]: ICartDish;
}

export interface IUseCart {
  cartBusinessId: string;
  cart: ICart;

  setCartBusinessId: (id: string) => void;
  emptyCart: () => void;
  setCart: (data: ICart) => void;

  cartItem: object;
  setCartItem: (data: object) => void;
  epmtyCartItem: () => void;
}

export const useCart = create(
  persist<IUseCart>((set) => ({
    cartBusinessId: "",
    cart: {},
    setCartBusinessId: (id: string) => set({ cartBusinessId: id }),
    emptyCart: () => set({ cart: {} }),
    setCart: (data: ICart) => set({ cart: data }),

    cartItem: {},
    setCartItem: (data: object) => set({ cartItem: data }),
    epmtyCartItem: () => set({ cartItem: {} }),
  }),{
    name:'useCart'
  })
);
