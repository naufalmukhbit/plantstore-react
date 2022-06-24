import {
	TypedUseSelectorHook,
	useDispatch as useDispatchDefault,
	useSelector as useSelectorDefault,
} from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = useDispatchDefault;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorDefault;
