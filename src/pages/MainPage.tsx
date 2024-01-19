import { Paper, Table, TableContainer } from "@mui/material";
import Body from "../components/BodyTable/Body";
import Head from "../components/Head";
import styled from "styled-components";
import ButtonNewRow from "../components/ButtonNew";


export default function MainPage() {
  return (
    <ContainerMain>
      <TableContainer className="containerMain" component={Paper}>
        <Table className="table">
          <Head />
          <Body />
        </Table>
        <ButtonNewRow/>
      </TableContainer>
      
    </ContainerMain>
  );
}

const ContainerMain = styled.div`
  display: flex;
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
    margin-top: 10px;
    width: 100px;
    height: 50px;
    position: absolute;
    left: 50%;
    background: #f3f1f1;
    border-radius: 5px;
    cursor: pointer;
  }
`;
