import { useEffect, useState } from "react";

export const GithubRepo = () => {
  //some states
  const [repos, setRepos] = useState();

  //function to get repos
  const getRepos = async () => {
    const response = await fetch(
      "https://api.github.com/users/am0031/repos"
    ).then((response) => response.json());
    setRepos(response);
  };
  //some useEffect
  useEffect(() => {
    getRepos();
  }, []);

  return (
    <div>
      <h1>My repos</h1>
      {repos &&
        repos.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
    </div>
  );
};
