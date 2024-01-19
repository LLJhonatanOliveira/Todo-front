import { atom } from "recoil";
import { rows } from "../data/mockTable";

export const rowState = atom({
    key: 'rowState',
    default: rows,
});