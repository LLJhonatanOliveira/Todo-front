import { Row } from "../../protocols/interface";


export default function handleCheckboxChange(id: number, rowData: Row[], setRowData: React.Dispatch<React.SetStateAction<Row[]>>) {
    const updatedRows = rowData.map((row) =>
      row.id === id ? { ...row, status: !row.status } : row
    );
    setRowData(updatedRows);
  }