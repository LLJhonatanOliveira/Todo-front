import { atom } from "recoil";
import { Row } from "../protocols/interface";

export const rowState = atom<Row[]>({
    key: 'rowState',
    default: [],
});


export const filter = atom<string>({
    key: 'filter',
    default: '',
});

export const id = atom<number>({
    key: 'id',
    default:1,
})

export const openNewDialog = atom<boolean>({
    key: 'openNewDialog',
    default: false
})

export const openEditDialog = atom<boolean>({
    key: 'openEditDialog',
    default: false
})

export const openDeleteDialog = atom<boolean>({
    key: 'openDeleteDialog',
    default: false
})