import  { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface EditItemDialogProps {
  open: boolean;
  onClose: () => void;
  onEdit: (editedData: {
    id: number;
    title: string;
    description: string;
    date: string;
    status: boolean;
  }) => void;
  initialData: { id: number; title: string; description: string; date: string; status:boolean };
}

export default function EditItemDialog({
  open,
  onClose,
  onEdit,
  initialData,
}: EditItemDialogProps) {

    const [editedData, setEditedData] = useState(initialData);
    const handleEdit = () => {
        onEdit(editedData);
        setEditedData(initialData);
      };
    
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose the field you want to add</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          id="title"
          fullWidth
          sx={{ marginBottom: "10px", marginTop:"5px" }}
          onChange={(e) =>
            setEditedData({ ...editedData, title: e.target.value })
          }
        />
        <TextField
          label="Description"
          id="description"
          fullWidth
          onChange={(e) =>
            setEditedData({ ...editedData, description: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEdit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
