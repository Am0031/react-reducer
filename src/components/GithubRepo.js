import { useReducer, useEffect } from "react";

export const GithubRepo = () => {
  //initial state
  const initialState = {
    repos: undefined,
    selectedRepo: undefined,
    username: "",
  };
  //function reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "repos":
        return { ...state, selectedRepo: undefined, repos: action.newRepos };
      case "selected":
        return { ...state, selectedRepo: action.selection };
      case "username":
        return { ...state, username: action.username };
      default:
        throw new Error();
    }
  };
  //useReducer state
  const [state, dispatch] = useReducer(reducer, initialState);

  //useEffect for onload repos population
  useEffect(() => {
    getReposAndDispatch("am0031");
  }, []);

  //function to get repos
  const getReposAndDispatch = async (username) => {
    const getRepos = async (username) => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      ).then((response) => response.json());
      return response;
    };
    const newRepos = await getRepos(username);
    dispatch({ type: "repos", newRepos });
  };

  //function to get the info from the form and do the search
  const onSubmit = async (event) => {
    event.preventDefault();
    getReposAndDispatch(state.username);
  };

  //function to handle input field change
  const handleChange = (event) => {
    dispatch({ type: "username", username: event.target.value });
  };

  //function to handle click on a repo to see more details
  const onRepoClick = (event) => {
    const selection = state.repos.filter(
      (item) => item.id === parseInt(event.target.id)
    )[0];
    dispatch({ type: "selected", selection });
  };

  return (
    <div>
      <h1>Public repos by user</h1>
      <form onSubmit={onSubmit}>
        <input
          id="search-input"
          value={state.username}
          placeholder="Enter github username"
          onChange={handleChange}
        ></input>
        <button id="submit-btn">Search</button>
      </form>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
          }}
        >
          <h2>Search results</h2>
          {state.repos && state.repos.length ? (
            state.repos.map((item) => {
              return (
                <button
                  style={{ height: "20", width: "80%" }}
                  key={item.id}
                  id={item.id}
                  onClick={onRepoClick}
                >
                  {item.name}
                </button>
              );
            })
          ) : (
            <div> No repos </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <h2>Details for this repo</h2>
          {state.selectedRepo && (
            <>
              <h3>{state.selectedRepo.name}</h3>
              <h3>Last updated: {state.selectedRepo.updated_at}</h3>
              <h3>URL: {state.selectedRepo.url}</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
