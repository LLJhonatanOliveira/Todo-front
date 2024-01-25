import axios from "axios";
import useSWR from "swr";
import { Row } from "../protocols/interface";
interface UseDataResult {
    fetchedTodos: Row[];
    isLoading: boolean;
    isError: any; 
  }
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
export default function useData(): UseDataResult{
    
    const {data, error, isLoading} = useSWR('/get-todo', (url) =>
    axios.get(url).then((res) => res.data))
    return {
        fetchedTodos: data,
        isLoading,
        isError: error
    }
}