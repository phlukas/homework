import React from 'react';
import {useState} from 'react';
import ReactDom from 'react-dom';
import './styles.css';

function SearchBox()
{
  const [movies, setMovies] = useState([]);

  const updateMovies = (event) =>
  {
    if(event !== undefined && event.target.value.length >= 3)
    {
      fetch("https://api.themoviedb.org/3/search/movie?api_key=16486dab915b18f2628fff964f1553d4&language=en-US&query=" + event.target.value)
      .then((data) => data.json())
      .then((data) =>
      {
        let newMovies = [];
        data.results.slice(0, 8).map((x, i) => newMovies[i] = x);
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
        <div className="searchBoxBackground">
          <input id="text" className="text" type="text" placeholder="Enter movie name" onChange={updateMovies}/>
        <button type="submit"><svg width="20" height="18" viewBox="0 -10 92 92" xmlns="http://www.w3.org/2000/svg"><path d="M20.8 39.27c0-11.016 8.808-19.976 19.637-19.976 10.827 0 19.635 8.96 19.635 19.972 0 11.014-8.808 19.976-19.635 19.976-10.83 0-19.64-8.96-19.64-19.976zm55.472 32.037l-15.976-16.25c3.357-4.363 5.376-9.835 5.376-15.788 0-14.16-11.32-25.67-25.232-25.67-13.923 0-25.24 11.51-25.24 25.67s11.32 25.67 25.237 25.67c4.776 0 9.227-1.388 13.04-3.74L69.84 77.85c1.77 1.8 4.664 1.8 6.432 0 1.77-1.8 1.77-4.744 0-6.544z" fill="#ef8500"/></svg></button>
        </div>
        {movies.length > 0 &&
        <div className = "autocomplete-table">
          {
            movies.map((x, i) => {return <div onClick={() => {document.getElementById("text").value = x.title; updateMovies();}} className="option" key={i}>{x.title}<p>{x.vote_average} Rating, {parseInt(x.release_date)}</p></div>})
          }
        </div>}
      </form>
    </>);
}

ReactDom.render(<SearchBox/>, document.getElementById('root'));
