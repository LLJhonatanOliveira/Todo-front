export interface Row {
    id: number;
    title: string;
    description: string;
    date: string;
    status: boolean;
}

export const rows: Row[] = [
    { id: 1, title: 'Buy milk', description: 'Buy milk at a mall', date: '19/01/2024', status: true},
    { id: 2, title: 'Buy milk', description: 'Buy milk at a mall', date: '19/01/2024', status: true},
    { id: 3, title: 'Buy milk', description: 'Buy milk at a mall', date: '19/01/2024', status: false},
    { id: 4, title: 'Buy milk', description: 'Buy milk at a mall', date: '19/01/2024', status: false}
]