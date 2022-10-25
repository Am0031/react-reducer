import { useReducer, useEffect } from "react";

export const GithubRepo = () => {
  //initial state
  const initialState = {
    repos: undefined,
    selectedRepo: undefined,
    username: "",
    isSearching: false,
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
      case "searching":
        return {
          ...state,
          isSearching: action.isSearching,
        };
      default:
        throw new Error();
    }
  };
  //useReducer state
  const [state, dispatch] = useReducer(reducer, initialState);

  //useEffect for repos population on load of page
  useEffect(() => {
    getReposAndDispatch("am0031");
  }, []);

  //useEffect for username change - useEffect #2
  useEffect(() => {
    if (state.isSearching === true) {
      getReposAndDispatch(state.username);
    }
  }, [state.username]);

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

  //function to handle input field change
  const handleChange = (event) => {
    if (!state.isSearching) {
      dispatch({
        type: "searching",
        isSearching: true,
      });
    }
    dispatch({ type: "username", username: event.target.value });
  };

  //function to handle click on a repo to see more details
  const onRepoClick = (event) => {
    const selection = state.repos.filter(
      (item) => item.id === parseInt(event.target.id)
    )[0];
    dispatch({ type: "selected", selection });
  };

  //function to set time style
  const setTimeStyle = (selectedRepo) => {
    if (selectedRepo) {
      const updateDay = new Date(selectedRepo.updated_at);
      const timeframe = Math.floor(
        (new Date() - updateDay) / (1000 * 3600 * 24)
      );

      if (timeframe < 7) {
        return "green";
      } else if (timeframe < 21) {
        return "orange";
      } else {
        return "red";
      }
    }
  };

  return (
    <div style={{ marginLeft: "2rem" }}>
      <h1>
        Public repos by user - **This page is managed with useReducer and
        useEffect**
      </h1>
      <div>
        <h2>Search form</h2>
        <form>
          <input
            style={{ width: "400px" }}
            id="search-input"
            value={state.username}
            placeholder="Enter github username"
            onChange={handleChange}
          ></input>
        </form>
      </div>
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
          {state.repos && <h3>{state.repos.length} repos</h3>}
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
              <h3
                style={{
                  color: `${setTimeStyle(state.selectedRepo)}`,
                }}
              >
                Last updated: {state.selectedRepo.updated_at}
              </h3>
              <h3>URL: {state.selectedRepo.url}</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
