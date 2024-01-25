import axios from "axios";
import useSWR, { mutate } from "swr";
import { FetchedTodos } from "../protocols/interface";
import { useRecoilValue } from "recoil";
import { filter, page } from "../atoms/rowAtom";
interface UseDataResult {
    fetchedTodos: FetchedTodos;
    isLoading: boolean;
    isError: any; 
  }

export default function useData(): UseDataResult{
    const pageNumber = useRecoilValue(page);
    const filterData = useRecoilValue(filter)
    const {data, error, isLoading} = useSWR(`/get-todo?page=${pageNumber}&filter=${filterData}`, (url) =>
    axios.get(url).then((res) => 
    res.data
    ))

    console.log(data,'estou no hook')
    return {
        fetchedTodos: data,
        isLoading,
        isError: error
    }
}