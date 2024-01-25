import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { RowCreate } from "../../protocols/interface";


interface NewItemDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newData: RowCreate) => void;
}

function NewItemDialog({ open, onClose, onAdd }: NewItemDialogProps) {

  const [newData, setNewData] = useState<RowCreate>({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleAdd = () => {
    onAdd(newData);
    setNewData({
      title: "",
      description: "",
      dueDate: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose the fields you want to add</DialogTitle>
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
          label=""
          type="date"
          id="date"
          fullWidth
          value={newData.dueDate}
          onChange={(e) => setNewData({ ...newData, dueDate: e.target.value })}
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
