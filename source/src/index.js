import React from 'react';
import {useState} from 'react';
import ReactDom from 'react-dom';
import './styles.css';

function SearchBox()
{
  const [movies, setMovies] = useState([]);

  const updateMovies = (event) =>
  {
    if(event.target.value.length >= 3)
    {
      fetch("https://api.themoviedb.org/3/search/movie?api_key=16486dab915b18f2628fff964f1553d4&language=en-US&query=" + event.target.value)
      .then((data) => data.json())
      .then((data) =>
      {
        let newMovies = [];
        data.results.slice(0, 8).map((x, i) => newMovies[i] = x.original_title);
        setMovies(newMovies);
      });
    }else
    {
      setMovies([]);
    }
  };

  return(
    <>
      <form autoComplete="off">
        <input className="text" type="text" onChange={updateMovies}/>
        <input type="submit"/>
        <div className = "autocomplete-table">
          {
            movies.map((x, i) => {return <div className="option">{x+i}</div>})
          }
        </div>
      </form>
    </>);
}

ReactDom.render(<SearchBox/>, document.getElementById('root'));
