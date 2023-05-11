import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface IUseLogin {
    phoneNumber: string
    name: string
    businessName: string
    password: string
    time : string
    userDetails: {
        name?: string;
        phoneNumber?: string;
        id?: string;
        email?: string;
        role?: string;
        customRole?: {
          businessId: string;
          customRoleId: string;
        }[];
      };

    setPhoneNumber: (d: string) => void
    setName: (d: string) => void
    setBusinessName: (d: string) => void
    setPassword: (d: string) => void
    setTime:(d: string) => void
    setUserDetails:(d:any) => void
}

export const useLogin = create(
    persist<IUseLogin>(
        (set, get) => ({
            phoneNumber: '',
            name: '',
            businessName: '',
            password: '',
            time:'',
            userDetails:{},

            setPhoneNumber: (d: string) => set({ phoneNumber: d }),
            setName: (d: string) => set({ name: d }),
            setBusinessName: (d: string) => set({ businessName: d }),
            setPassword: (d: string) => set({ password: d }),
            setTime:(d:string)=>set({time:d}),
            setUserDetails:(d:any) =>set({userDetails :d}),
        }),
        {
            name: 'useLogin',
        }
    )
)
