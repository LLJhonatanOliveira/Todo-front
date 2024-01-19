import Swal from "sweetalert2";
import { Row } from "../../../protocols/interface";
import dayjs from "dayjs";


export default async function handleNewRow(rows: Row[], setRows: React.Dispatch<React.SetStateAction<Row[]>>, idCounter: number, setIdCounter: React.Dispatch<React.SetStateAction<number>>){
    const { value: newData } = await Swal.fire({
        title: 'Add New Item',
        html: `
          <label for="title">Title:</label>
          <input type="text" id="title" class="swal2-input">
          <label for="description">Description:</label>
          <input type="text" id="description" class="swal2-input">
        `,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          const title = (document.getElementById('title') as HTMLInputElement).value;
          const description = (document.getElementById('description') as HTMLInputElement).value;
          return { title, description };
        },
      });
    
      if (newData) {
        const currentDate = dayjs();
        const formattedDate = currentDate.format('DD/MM/YYYY')
        const newRow: Row = {
          id: idCounter,
          title: newData.title,
          description: newData.description,
          date: formattedDate,
          status: false,
        };
    
        setRows([...rows, newRow]);
        setIdCounter(idCounter + 1);
        
      }
}