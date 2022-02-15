import { useState } from 'react';
import Axios from "axios";
import styled from 'styled-components';
import MovieComponenet from './component/MovieComponent ';
import MovieinfoComponenet from './component/MovieinfoComponenet';



export const API_KEY = "a9118a3a";

const Container =styled.div`
display:flex;
flex-direction: column;
`;
const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color:black;
align-items: center;
color: white;
padding:10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
font-family: 'Montserrat', sans-serif;

`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  font-family: 'Montserrat', sans-serif;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 50%;
  height: 50%;
  margin: 100px;
  // opacity: 50%;
`;






function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [moviesList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();


  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
  console.log(response)
  updateMovieList(response.data.Search)
  };





  const onTeaxtChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout)
  };

  return (
    <Container className="App">
    <Header>
    <AppName>  <MovieImage src="/movie.icon.png" />     Movies App </AppName> 
  <SearchBox>
  <SearchIcon src="/Search.Icon.png" />
  <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTeaxtChange}
          />
  </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieinfoComponenet selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />
      )}
      <MovieListContainer>
 {moviesList?.length
 ? moviesList.map((movie,index) => <MovieComponenet key={index} movie={movie} onMovieSelect={onMovieSelect}/>)
 :   <Placeholder src="https://cdn.dribbble.com/users/1461164/screenshots/3477627/film-festival.gif" />
 }
   
        
      </MovieListContainer>

    </Container>
  );
}

export default App;
