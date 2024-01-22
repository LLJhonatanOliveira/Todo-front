import { InputAdornment, Pagination, Paper, Stack, Table, TableContainer, TextField } from "@mui/material";
import Body from "../components/BodyTable/Body";
import Head from "../components/Head";
import styled from "styled-components";
import ButtonNewRow from "../components/ButtonNew";
import { useRecoilState } from "recoil";
import { filter } from "../atoms/rowAtom";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import NewItemDialog from "../components/Dialogs/NewItemDialog";
import EditItemDialog from "../components/Dialogs/EditItemDialog";
import DeleteItemDialog from "../components/Dialogs/DeleteItemDialog";

export default function MainPage() {
  const [filterData, setFilterData] = useRecoilState(filter)
  const [page, setPage] = useState<number>(1)
  return (
    <ContainerMain>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => setFilterData(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      </Box>
      <TableContainer className="containerMain" component={Paper}>
        <Table className="table">
          <Head />
          <Body page={page}/>
        </Table>
       
      </TableContainer>
      <Stack spacing={2} sx={{alignItems: 'center', marginTop: '15px'}}>
        <Pagination count={10} onChange={(event, value) => setPage(value)} />
      </Stack>
      <ButtonNewRow/>
      <NewItemDialog />
      <EditItemDialog />
      <DeleteItemDialog />
    </ContainerMain>
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
