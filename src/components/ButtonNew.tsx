import { useRecoilState } from "recoil";
import { rowState } from "../atoms/rowAtom";
import { useState } from "react";
import handleNewRow from "./BodyTable/handles/HandleAddNewRow";

export default function ButtonNewRow(){
    const [rowData, setRowData] = useRecoilState(rowState);
    const [idCounter, setIdCounter] = useState(1);
    return(
        <button onClick={() => handleNewRow(rowData, setRowData, idCounter, setIdCounter)} className="bttNew">+ New</button>
    )
}