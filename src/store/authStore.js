import {create} from 'zustand'

export const useAuth = create((set)=>({
	auth:false,
	setAuth:(val)=> set((state)=>({auth:val}))
}))