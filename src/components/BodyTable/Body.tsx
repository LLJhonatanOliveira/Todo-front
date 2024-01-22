import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState, useRecoilValue } from "recoil";
import { filter, rowState } from "../../atoms/rowAtom";
import handleEditRow from "./handles/HandleEdit";
import handleDeleteRow from "./handles/HandleDelete";
import handleCheckboxChange from "./handles/HandleCheckBox";
import { Row } from "../../protocols/interface";
import { useEffect, useState } from "react";

interface BodyProps {
  page: number
}

export default function Body({page}:BodyProps) {
  const [rowData, setRowData] = useRecoilState(rowState);
  const [filterData] = useRecoilValue(filter)
  const [filteredData, setFilteredData] = useState<Row[]>([])
  useEffect(() => {
    if(filterData !== undefined) {
    const newData: Row[] = rowData.filter(item =>
      item.title.toLowerCase().includes(filterData.toLowerCase())
    );
    const startIndex = (page -1)*5;
    const endIndex = startIndex + 5;
    const pageData = newData.slice(startIndex, endIndex);
    setFilteredData(pageData);
    return
  }
    const startIndex = (page -1)*5;
    const endIndex = startIndex + 5;
    const newData = rowData.slice(startIndex, endIndex);
    
  setFilteredData(newData)
    
  }, [filterData, rowData, page])
  
  return (
    <TableBody>
      {filteredData.length === 0 ? 'No activity' : (filteredData.map((row) => (
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
      )))}
    </TableBody>
  );
}
