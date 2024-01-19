import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState } from "recoil";
import { rowState } from "../../atoms/rowAtom";
import handleEditRow from "./handles/HandleEdit";
import handleDeleteRow from "./handles/HandleDelete";
import handleCheckboxChange from "./handles/HandleCheckBox";
export default function Body() {
  const [rowData, setRowData] = useRecoilState(rowState);
  
  return (
    <TableBody>
      {rowData.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell>{row.date}</TableCell>
          <TableCell>
            <Checkbox
              checked={row.status}
              onChange={() => handleCheckboxChange(row.id, rowData, setRowData)}
            />
          </TableCell>
          <TableCell>
            <EditIcon onClick={() => handleEditRow(row.id, rowData, setRowData)} />
            <DeleteIcon onClick={() => handleDeleteRow(row.id, rowData, setRowData)} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
