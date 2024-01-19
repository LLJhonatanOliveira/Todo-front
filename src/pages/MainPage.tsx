import {
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import Body from "../components/Body";
import Head from "../components/Head";
import styled from "styled-components";

export default function MainPage() {
  
  return (
    <ContainerMain>
      <TableContainer className = 'containerMain' component={Paper}>
        <Table>
          <Head />
          <Body />
        </Table>
        <button className="bttNew" />
      </TableContainer >
    </ContainerMain>
  );
}

const ContainerMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .bttNew{
    margin-top: 10px;
    width: 50px;
    height: 50px;
    position: absolute;
    left: 50%
  }
`