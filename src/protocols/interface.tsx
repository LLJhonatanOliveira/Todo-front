export interface Row {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: boolean;
}
export interface RowCreate extends Omit<Row, 'id' | 'status'> {};
export interface RowUpdate extends Omit<Row, 'dueDate' | 'status'> {}
export interface FetchedTodos extends Row {
    data: Row[],
    pagination: {
        currentPage: number,
        totalPages: number
    }
}