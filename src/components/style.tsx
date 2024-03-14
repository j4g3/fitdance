import styled from "styled-components"

export const MainContainer = styled.div`
  margin: 5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const Table = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  tbody td:nth-child(2n) {
    background: #CCCCCC;
  }

`

export const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;

`
