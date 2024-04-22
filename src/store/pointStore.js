import {create} from 'zustand'

export const usePoint = create((set)=>({
	point:250,
	coupon: 1,
	addPoint:(val)=> set((state)=>({
		point: state.point +val
	})),
	addCoupon:(val)=> set((state)=>({
		coupon: state.coupon +val
	}))
}))