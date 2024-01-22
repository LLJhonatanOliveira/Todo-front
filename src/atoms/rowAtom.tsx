import { atom, useRecoilState } from "recoil";
import { Row } from "../protocols/interface";

export const rowState = atom<Row[]>({
    key: 'rowState',
    default: [],
});


export const filter = atom<string>({
    key: 'filter',
    default: '',
});
