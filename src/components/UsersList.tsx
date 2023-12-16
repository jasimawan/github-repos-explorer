import { useDispatch, useSelector } from "react-redux";
import {
  expandedUserIndex,
  expandUser,
  searchedUsers,
  searchUsersStatus,
} from "../store/reducers/users";
import { Accordion, LoadingSpinner, ReposList } from "./index";
import styled from "styled-components";
import { useCallback } from "react";
import { AppDispatch } from "../store/store";
import { getUserRepos } from "../store/reducers/repos";

const StyledContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const StyledListContainer = styled.div`
  width: 100%;
  overflow: scroll;
  height: 400px;
`;

const StyledP = styled.p`
  margin: 0px;
  margin-bottom: 20px;
`;

export const UsersList = ({ searchedText }: { searchedText: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(searchedUsers);
  const status = useSelector(searchUsersStatus);
  const expandedIndex = useSelector(expandedUserIndex);

  const handleExpandUser = useCallback(
    (index: number) => {
      dispatch(expandUser(index));
      dispatch(getUserRepos({ userName: users[index].login }));
    },
    [dispatch, users]
  );

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
      <StyledListContainer>
        {users.map((user, index) => (
          <Accordion
            key={`${user.id}_${user.login}`}
            title={user.login}
            avatarUrl={user.avatar_url}
            index={index}
            isExpanded={expandedIndex === index}
            onExpand={handleExpandUser}
          >
            <ReposList />
          </Accordion>
        ))}
      </StyledListContainer>
    </StyledContainer>
  );
};
