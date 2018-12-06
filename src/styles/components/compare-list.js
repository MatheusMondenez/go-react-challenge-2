import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }
`;

export const Action = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    border-radius: 3px;
    border: 0;
    flex-basis: calc(49%);
    padding: 8px;
    background: #136dd4;
    color: #fff;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #0d59af;
    }

    &:nth-child(2n) {
      background: #dd0505;
    }

    &:nth-child(2n):hover {
      background: #b30404;
    }

    i {
      margin-right: 8px;
    }
  }
`;
