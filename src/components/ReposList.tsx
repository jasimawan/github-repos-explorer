import { useSelector } from "react-redux";
import { userRepos, userReposStatus } from "../store/reducers/repos";
import { LoadingSpinner, RepoLitsItem } from "./index";

export const ReposList = () => {
  const repos = useSelector(userRepos);
  const status = useSelector(userReposStatus);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "succeeded" && repos?.length === 0) {
    return <p>This user doesn't have any repos yet.</p>;
  }

  return (
    <div>
      {repos.map((repo) => (
        <RepoLitsItem key={`${repo.id}_${repo.name}`} repo={repo} />
      ))}
    </div>
  );
};
