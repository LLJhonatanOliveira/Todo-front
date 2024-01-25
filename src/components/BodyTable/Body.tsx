import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState, useRecoilValue } from "recoil";
import { filter, rowState } from "../../atoms/rowAtom";
import { Row } from "../../protocols/interface";
import { useEffect, useState } from "react";
import EditItemDialog from "../Dialogs/EditItemDialog";
import DeleteItemDialog from "../Dialogs/DeleteItemDialog";
import useData from "../../hooks/useData";
import handleCheckboxChange from "../handle/HandleCheckBox";
import axios from "axios";
import { mutate } from "swr";

interface BodyProps {
  page: number;
}

export default function Body({ page }: BodyProps) {
  const {fetchedTodos, isLoading, isError} = useData();
  const [rowData, setRowData] = useRecoilState(rowState);
  const [filterData] = useRecoilValue(filter);
  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Row>({id:0,
    title: "",
    description: "",
    dueDate: "",
    status: false});

  const [itemToDelete, setItemToDelete] = useState<number>(0);

  const handleOpenEditDialog = (item: Row) => {
    setItemToEdit(item);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setItemToEdit({id:0,
      title: "",
      description: "",
      dueDate: "",
      status: false,});
    setOpenEditDialog(false);
  };

  const handleEditItem = (data:Row) => {
    console.log(data)
    const updatedRows = rowData.map(row =>
      row.id === itemToEdit.id ? { ...row, title: data.title, description: data.description } : row
    );
    setRowData(updatedRows);
    setItemToEdit({id:0,
      title: "",
      description: "",
      dueDate: "",
      status: false})
    setOpenEditDialog(false);
  }

  const handleOpenDeleteDialog = (id: number) => {
    setItemToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setItemToDelete(0);
    setOpenDeleteDialog(false);
  };

   function handleDeleteItem() {
    const promise = axios.delete(`/delete-todo/${itemToDelete}`)
    promise.then((res) => {
      console.log(res.data)
      mutate('/get-todo')
    })
    .catch((err) => {
      console.log(err)
    })
    
    handleCloseDeleteDialog();
  };

 
  return (
    <>
      <TableBody>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Ups! Error</p>}
        {fetchedTodos && fetchedTodos.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={row.status}
                    onChange={() =>
                      handleCheckboxChange(row.id, rowData, setRowData)
                    }
                  />
                </TableCell>
                <TableCell>
                  <EditIcon onClick={() => handleOpenEditDialog(row)} />
                  <DeleteIcon onClick={() => handleOpenDeleteDialog(row.id)} />
                  <EditItemDialog
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    onEdit={(data) => handleEditItem(data)}
                    initialData={itemToEdit}
                  />
                  <DeleteItemDialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    onDelete={() => handleDeleteItem()}
                    id={itemToDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </>
  );
}
