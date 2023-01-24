import styled, { keyframes } from "styled-components";

const AppWrapper = styled.div`
display:flex;
`
const Grid = styled.div`
  border: 1px solid #111;
`;

const Row = styled.div`
  display: flex;
  border: 1px solid #afa;
`;


const Col = styled.div`
  flex: 10;
  border: 1px solid #faf;
  
`;
const StyledTable = styled.table`
overflow-x: auto;
border-collapse: collapse;
width: 100%;
th, td {
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
`;


export {
  AppWrapper,
  Grid,
  Row,
  Col,
  StyledTable
}