import Swal from "sweetalert2";

import { Row } from "../../../protocols/interface";

export default function handleDeleteRow(
  id: number,
  rowData: Row[],
  setRowData: React.Dispatch<React.SetStateAction<Row[]>>
) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedRows = rowData.filter((row) => row.id !== id);
      setRowData(updatedRows);
    }
  });
}
