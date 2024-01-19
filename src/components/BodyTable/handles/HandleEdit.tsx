import Swal from "sweetalert2";
import { Row } from "../../../protocols/interface";

export default async function handleEditRow(id: number, rowData: Row[], setRowData: React.Dispatch<React.SetStateAction<Row[]>>){

    const updatedRows = rowData.find(row => row.id === id);
    const { value: editedRow } = await Swal.fire({
      title: "Edit item",
      html: `
        <label for="title">Title:</label>
        <input type="text" id="title" value="${updatedRows?.title}" class="swal2-input">
        <label for="description">Description:</label>
        <input type="text" id="description" value="${updatedRows?.description}" class="swal2-input">
      `,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLInputElement).value;
        return { title, description };
      },
    });
    if(editedRow) {
      const updatedRows = rowData.map(row =>
        row.id === id ? { ...row, title: editedRow.title, description: editedRow.description } : row
      );
      setRowData(updatedRows);
    }
  }