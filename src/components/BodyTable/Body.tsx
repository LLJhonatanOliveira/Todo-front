import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState, useRecoilValue } from "recoil";
import { filter, rowState } from "../../atoms/rowAtom";
import handleCheckboxChange from "./handles/HandleCheckBox";
import { Row } from "../../protocols/interface";
import { useEffect, useState } from "react";
import EditItemDialog from "../Dialogs/EditItemDialog";
import DeleteItemDialog from "../Dialogs/DeleteItemDialog";

interface BodyProps {
  page: number;
}

export default function Body({ page }: BodyProps) {
  const [rowData, setRowData] = useRecoilState(rowState);
  const [filterData] = useRecoilValue(filter);
  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Row>({id:0,
    title: "",
    description: "",
    date: "",
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
      date: "",
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
      date: "",
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

  const handleDeleteItem = () => {
    const updatedRows = rowData.filter((row) => row.id !== itemToDelete);
    setRowData(updatedRows);
    handleCloseDeleteDialog();
  };

  useEffect(() => {
    if (filterData !== undefined) {
      const newData: Row[] = rowData.filter((item) =>
        item.title.toLowerCase().includes(filterData.toLowerCase())
      );
      const startIndex = (page - 1) * 5;
      const endIndex = startIndex + 5;
      const pageData = newData.slice(startIndex, endIndex);
      setFilteredData(pageData);
      return;
    }
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    const newData = rowData.slice(startIndex, endIndex);

    setFilteredData(newData);
  }, [filterData, rowData, page]);

  return (
    <>
      <TableBody>
        {filteredData.length === 0
          ? "No activity"
          : filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.date}</TableCell>
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
