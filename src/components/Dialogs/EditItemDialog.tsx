import  { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { RowUpdate } from '../../protocols/interface';

interface EditItemDialogProps {
  open: boolean;
  onClose: () => void;
  onEdit: (editedData: RowUpdate
  ) => void;
  initialData: RowUpdate
}

export default function EditItemDialog({
  open,
  onClose,
  onEdit,
  initialData,
}: EditItemDialogProps) {

    const [editedData, setEditedData] = useState<RowUpdate>(initialData);
    const handleEdit = () => {
        onEdit(editedData);
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
