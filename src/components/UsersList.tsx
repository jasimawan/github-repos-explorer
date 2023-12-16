import { useSelector } from "react-redux";
import { searchedUsers, searchUsersStatus } from "../store/reducers/users";
import { LoadingSpinner } from "./index";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin-top: 20px;
  max-height: 100%;
`;

const StyledP = styled.p`
  margin: 0px;
`;

export const UsersList = ({ searchedText }: { searchedText: string }) => {
  const users = useSelector(searchedUsers);
  const status = useSelector(searchUsersStatus);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "succeeded" && users.length === 0) {
    return <StyledP>{`No users with ${searchedText} exists.`}</StyledP>;
  }

  return (
    <StyledContainer>
      {users.length > 0 && (
        <StyledP>{`Showing users for "${searchedText}"`}</StyledP>
      )}
      {users.map((user) => (
        <div key={`${user.id}_${user.login}`}>{user.login}</div>
      ))}
    </StyledContainer>
  );
};
