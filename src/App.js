import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
export const API_KEY = "5b75006c";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  background-image:linear-gradient(to bottom, transparent,transparent, whitesmoke), url('https://media.istockphoto.com/vectors/film-reel-stripe-cinema-isolated-on-blue-background-modern-3d-film-vector-id1204686535?k=20&m=1204686535&s=170667a&w=0&h=TzWT4FDQ53vrNMAinxR_plDzwPuZHiZyDkwobLvFFes=');
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 120px;
  text-align: center;
  font-weight: bolder;
  font-family: 'Poppins', sans-serif;
  color: rgb(179, 255, 0);
  `;
const AppName = styled.div`  
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-weight: lighter;
  color: rgb(179, 255, 0);
  margin-top: -70px;
`;
const Header = styled.div`
  background-color: transparent;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  // box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Poppins', sans-serif;
  padding: 10px 10px;
  border-radius: 30px;
  margin-left: 20px;
  margin-bottom: 50px;
  margin-top: 10px;
  width: 30%;
  background-color: rgb(62, 218, 0);
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  background-color: rgb(62, 218, 0);
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
  
  
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          Movie App
        </AppName>
        <SearchBox>
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
       
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <>
          
          

          </>
        )}
      </MovieListContainer>
      
          <p>MOVICITY</p>
          <h1>The Best Movie information Website is here!</h1>
          <h3>Search a movie you want in the search box above</h3>
          <h4>Happy Searching :)</h4>
    </Container>
  );
}

export default App;