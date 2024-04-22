import {create} from 'zustand'
import {v4 } from 'uuid';

export const useUser = create((set)=>({
	id:'777',
	email:'choco@naver.com',
	password:'1234',
	nickname:'초코',
	setUser:({email, password, nickname})=>set({id:v4(), email,password, nickname}),
	editUser:({email, password, nickname}) =>set((state)=>({
		...state,
		email: email !== undefined ? email : state.email,
        password: password !== undefined ? password : state.password,
        nickName: nickname !== undefined ? nickname : state.nickName
	})),
	emptyUser:()=> set(({id:'',email:'',password:'',nickname:''}))
}))