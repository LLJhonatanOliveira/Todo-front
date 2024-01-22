import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface DeleteItemDialogProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    id: number;
  }
  

export default function DeleteItemDialog({ open, onClose, onDelete, id }:DeleteItemDialogProps){
    const handleDeleteItem = () => {
        onDelete();
      };
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete the item {id}?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteItem} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
}