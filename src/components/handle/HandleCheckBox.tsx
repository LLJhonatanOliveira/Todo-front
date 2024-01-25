import axios from "axios";
import { mutate } from "swr";
import { FetchedTodos} from "../../protocols/interface";

export default function handleCheckboxChange(id: number, fetchedTodos: FetchedTodos,pageNumber:number) {
     const todo = fetchedTodos.data.find(t => t.id === id)
    const status =  todo?.status;
    const promise =  axios.patch(`/update-status/${id}`, {status})
    promise.then(res => {
      mutate(`/get-todo?page=${pageNumber}`)
    })
    
  
  }