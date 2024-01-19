import {
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

export default function Head(){
    return(
      
        <TableHead className="head">
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title V</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
      
    )
}
