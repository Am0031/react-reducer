import { useEffect, useState } from "react";

export const GithubRepo = () => {
  //some states
  const [repos, setRepos] = useState();
  const [username, setUsername] = useState("am0031");

  //function to get repos
  const getRepos = async (username) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    ).then((response) => response.json());
    setRepos(response);
  };

  //function to get the info from the form and do the search
  const onSubmit = (event) => {
    event.preventDefault();
    getRepos(username);
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  //some useEffect
  useEffect(() => {
    getRepos(username);
  }, []);

  return (
    <div>
      <h1>Public repos by user</h1>
      <form onSubmit={onSubmit}>
        <input
          id="search-input"
          placeholder="Enter github username"
          onChange={handleChange}
        ></input>
        <button id="submit-btn">Search</button>
      </form>
      {repos && repos.length ? (
        repos.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })
      ) : (
        <div> No repos </div>
      )}
    </div>
  );
};
