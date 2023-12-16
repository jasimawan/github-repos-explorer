import styled from "styled-components";

export const StyledButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  background-color: #1976d2;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #1565c0;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
  }
`;
