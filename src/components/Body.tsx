import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRecoilState } from "recoil";
import { rowState } from "../atoms/rowAtom";
export default function Body(){
  const [rowData, setRowData] = useRecoilState(rowState)
  function handleCheckboxChange(id: number){
   const updatedRows =  rowData.map((row) => row.id === id ? {...row, status: !row.status} : row);
   setRowData(updatedRows)
  }

  function handleEditRow(id: number){

  }
  
  function handleDeleteRow(id: number){
    const updatedRows =  rowData.filter((row) => row.id !== id);
    setRowData(updatedRows)
  }
    
    return (
        <TableBody>
          {rowData.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <Checkbox
                  checked={row.status}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </TableCell>
              <TableCell>
               <EditIcon />
               <DeleteIcon onClick={() => handleDeleteRow(row.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    )
}