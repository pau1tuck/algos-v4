//web/src/redux/utils/useAppDispatch.ts
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";

// export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
