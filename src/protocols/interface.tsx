export interface Row {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: boolean;
}
export interface RowCreate extends Omit<Row, 'id' | 'status'> {}