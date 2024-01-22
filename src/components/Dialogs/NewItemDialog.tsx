import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Row } from "../../protocols/interface";
import { id } from "../../atoms/rowAtom";
import { useRecoilState } from "recoil";

interface NewItemDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newData: Row) => void;
}

function NewItemDialog({ open, onClose, onAdd }: NewItemDialogProps) {
  const [idCount, setIdCount] = useRecoilState(id);
  const [newData, setNewData] = useState<Row>({
    id: idCount,
    title: "",
    description: "",
    date: "",
    status: false,
  });

  const handleAdd = () => {
    setIdCount(idCount + 1);
    onAdd(newData);
    setNewData({
      id: idCount + 1,
      title: "",
      description: "",
      date: "",
      status: false,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          label="Title"
          id="title"
          fullWidth
          value={newData.title}
          onChange={(e) => setNewData({ ...newData, title: e.target.value })}
          sx={{ marginBottom: "5px" }}
        />
        <TextField
          label="Description"
          id="description"
          fullWidth
          value={newData.description}
          onChange={(e) =>
            setNewData({ ...newData, description: e.target.value })
          }
          sx={{ marginBottom: "5px" }}
        />
        <TextField
          label="Due Date"
          id="date"
          fullWidth
          value={newData.date}
          onChange={(e) => setNewData({ ...newData, date: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewItemDialog;
