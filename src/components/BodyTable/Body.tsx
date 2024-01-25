import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState, useRecoilValue } from "recoil";
import { page} from "../../atoms/rowAtom";
import { Row, RowUpdate } from "../../protocols/interface";
import {  useState } from "react";
import EditItemDialog from "../Dialogs/EditItemDialog";
import DeleteItemDialog from "../Dialogs/DeleteItemDialog";
import useData from "../../hooks/useData";
import handleCheckboxChange from "../handle/HandleCheckBox";
import axios from "axios";
import { mutate } from "swr";

interface BodyProps {
  page: number;
}

export default function Body() {
  const {fetchedTodos, isLoading, isError} = useData();
  const pageNumber = useRecoilValue(page);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<RowUpdate>({id:0,
    title: "",
    description: "",
});

  const [itemToDelete, setItemToDelete] = useState<number>(0);

  const handleOpenEditDialog = (item: Row) => {
    console.log(item)
    setItemToEdit(item);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditItem = (data:RowUpdate) => {
    const promise = axios.patch(`/update-todo/${itemToEdit.id}`, {
      title: data.title,
      description: data.description,
    })
    promise.then((res) => {
      console.log(res.data)
      mutate('/get-todo')
      setItemToEdit({id:0,
        title: "",
        description: "",
    })
    })
    .catch((err) => {
      console.log(err)
    })
    

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
        {fetchedTodos && fetchedTodos.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={row.status}
                    onChange={() =>
                      handleCheckboxChange(row.id, fetchedTodos,pageNumber)
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
