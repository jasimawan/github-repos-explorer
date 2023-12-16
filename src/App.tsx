import styled from "styled-components";
import { TextInput, UsersList, StyledButton } from "./components";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { searchUsers } from "./store/reducers/users";
import { AppDispatch } from "./store/store";

const ContainerDiv = styled.div`
  height: 98vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 15px 15px 15px;
`;

const StyledTitle = styled.h2``;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(() => {
    if (searchTerm) {
      dispatch(searchUsers({ searchTerm: searchTerm }));
    }
  }, [dispatch, searchTerm]);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchTerm(value);
    },
    [setSearchTerm]
  );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <ContainerDiv>
      <StyledTitle>Github Repo Explorer</StyledTitle>
      <TextInput
        placeholder="Search user..."
        value={searchTerm}
        onChange={handleTextChange}
        onKeyDown={handleKeyPress}
      />
      <StyledButton onClick={handleSearch}>Search</StyledButton>
      <UsersList searchedText={searchTerm} />
    </ContainerDiv>
  );
}

export default App;
