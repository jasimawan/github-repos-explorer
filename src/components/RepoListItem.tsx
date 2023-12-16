import styled from "styled-components";
import { Repo } from "../types";

const Container = styled.div`
  background-color: #1976d2;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px;
`;

const StyledH4 = styled.h4`
  margin: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RepoLitsItem = ({ repo }: { repo: Repo }) => {
  return (
    <Container>
      <TitleContainer>
        <StyledH4>{repo.name}</StyledH4>
        <StyledH4>{`${repo.stargazers_count} ★`}</StyledH4>
      </TitleContainer>

      {repo.description && (
        <p>
          {repo.description.length > 150
            ? `${repo.description.substring(0, 150)}...`
            : repo.description}
        </p>
      )}

      <a href={repo.html_url} target="_blank">
        Click here to view repo.
      </a>
    </Container>
  );
};
