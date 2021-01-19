import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shoppies = props => {

  const [noms, setNoms] = useState([]);
  const [complete, setComplete] = useState(false);
  const [alreadyComplete, setAlreadyComplete] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [searchVal, setSearchVal] = useState('');


  useEffect(async () => {
    try {
      const { data } = await axios.get('/api/nominations');
      setNoms(data);
    } catch (err) {
      console.error(err);
    }
  }, [])

  useEffect(() => {
    if (noms.length >= 5) {
      setComplete(true);
    }
    else {
      setComplete(false);
      setAlreadyComplete(false);
    }
  }, [noms.length])


  const handleChange = async (string) => {
    try {
    const modifyString = string => string.replace(' ', '+');
    const { data } = await axios(`http://www.omdbapi.com/?apikey=fcf9a313&s=${modifyString(string)}&type=movie`);
    if (Array.isArray(data.Search)) {
      setFirstRun(false);
      setSearchVal(string);
      data.Search.map(result => {
        for (let i = 0; i < noms.length; i++) {
          if (result.Title === noms[i].title && result.Year === noms[i].year.toString()) {
          result['nominated'] = true;
          }
          else result['nominated'] = false;
        }
      });

      setSearchResults(data.Search)
    } else setSearchResults([]);
    } catch (err) {
      console.error(err);
    }
  }


  const handleAddNom = async (movie) => {
    if (noms.length < 5) {
    try {
      await axios.post('/api/nominations', {
        title: movie.Title,
        year: movie.Year
      })
    const { data } = await axios.get('/api/nominations')
    setNoms(data);
    for(let i = 0; i < searchResults.length; i++) {
      if (movie.Title === searchResults[i].Title && movie.Year === searchResults[i].Year) {
        searchResults[i].nominated = true;
        setSearchResults([...searchResults]);
        break;
      }
    }
    } catch (err) {
      console.error(err);
    }
    } else setAlreadyComplete(true);
  }

  const handleRemove = async (movie) => {
    try {
      await axios.delete(`/api/nominations/${movie.id}`);
      const { data } = await axios.get('/api/nominations');
      setNoms(data);
      // if (noms.length < 5) setAlreadyComplete(false);
      for (let i = 0; i < searchResults.length; i++) {
        if (movie.title === searchResults[i].Title && movie.year.toString() === searchResults[i].Year) {
          searchResults[i].nominated = false;
          setSearchResults([...searchResults]);
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="container" id="search">
        <label htmlFor="searchBar">Movie title</label>
        <input name="searchBar" onInput={(e) => handleChange(e.currentTarget.value)}></input>
      </div>


      {alreadyComplete ? <p>You have reached the maximum nominations.</p> : null}
      <div className="flexboxes">
        {firstRun ? null:
        (<div className="container" id="searchResults">
          <h4>Search Results for "{searchVal}"</h4>
          <div className="resultsLine">
           {searchResults.length ?
            (searchResults.map(result => (
              <div key={result.imdbID}>
                <p className="results">{result.Title} ({result.Year})</p>
          <button className="results" disabled={result.nominated ? ('disabled') : null} onClick={(e) => handleAddNom(result)}>Nominate</button>
                </div>
            ))) : <p>No Results Found</p>}
          </div>
        </div>)
        }

        <div className="container" id="nominations">
          <h4>Nominations</h4>
          <div className="resultsLine">
          {noms.length ? (noms.map(movie => (
            <div key={movie.id}>
          <p className="results">{movie.title} ({movie.year})</p>
          <button className="results" onClick={(e) => handleRemove(movie)}>Remove</button>
          </div>))):
          (<p>No Nominations</p>)}
          </div>

        </div>

        {complete ? (
          <div>
            <h2>Nominations Complete!</h2>
            </div>
        ) : null}
      </div>
    </div>
  )

}

export default Shoppies;
