import {
  InputAdornment,
  Pagination,
  Paper,
  Stack,
  Table,
  TableContainer,
  TextField,
} from "@mui/material";
import Body from "../components/BodyTable/Body";
import Head from "../components/Head";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { filter, page } from "../atoms/rowAtom";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import NewItemDialog from "../components/Dialogs/NewItemDialog";
import { RowCreate } from "../protocols/interface";
import useData from "../hooks/useData";
import axios from "axios";
import { mutate } from "swr";


export default function MainPage() {
  const {fetchedTodos, isLoading, isError} = useData();
  const [pageNumber, setPageNumber] = useRecoilState(page)
  const [filterData, setFilterData] = useRecoilState(filter);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddNewItem = async (newData: RowCreate) => {
    try {
      const promise =  await axios.post('/create-todo', newData)
      mutate(`/get-todo?page=${pageNumber}`)
    } catch (error) {
      console.log(error)
    }
  
    handleCloseDialog();
  };

  return (
    <>
    {isError && <p>Ups! Error</p>}
    {isLoading && <p>Carregando...</p>}
    {fetchedTodos && <ContainerMain>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setFilterData(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer className="containerMain" component={Paper}>
        <Table className="table">
          <Head />
          <Body />
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ alignItems: "center", marginTop: "15px" }}>
        <Pagination count={fetchedTodos.pagination.totalPages} onChange={(event, value) => setPageNumber(value)} />
      </Stack>
      <button onClick={handleOpenDialog} className="bttNew">
        + New
      </button>
      <NewItemDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onAdd={handleAddNewItem}
      />
    </ContainerMain>}
    
    </>
  );
}

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .head {
    background-color: aliceblue;
  }
  .bttNew {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    margin-top: 50px;
    width: 100px;
    height: 50px;
    background: #f3f1f1;
    border-radius: 5px;
    cursor: pointer;
  }
`;
