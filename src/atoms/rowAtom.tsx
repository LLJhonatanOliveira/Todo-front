import { atom } from "recoil";
import { Row } from "../protocols/interface";

export const rowState = atom<Row[]>({
    key: 'rowState',
    default: [],
});
