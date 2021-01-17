import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shoppies = props => {

  const [noms, setNoms] = useState([]);
  const [nomCount, setNomCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [firstRun, setFirstRun] = useState(true);


  useEffect(async () => {
    try {
      const { data } = await axios.get('/api/nominations');
      console.log('data is, ', data);
      setNoms(data);
    } catch (err) {
      console.error(err);
    }
  }, [])


  const handleChange = () => {
    //setFirstRun(false);
  }

  const handleNom = async () => {
    try {
      await axios.post('/api/nominations', {
        title: "The Avengers",
        year: 2012
      })
    const {data} = await axios.get('api/nominations')
    setNoms(data);
    setNomCount(nomCount++);
    console.log('data inside handle Nom is, ', data);
    } catch (err) {
      console.error(err);
    }
  }





  return (
    <div>
    <div className="container" id="search">
        <p>Movie title</p>
        <textarea rows="1" columns="50"></textarea>
      </div>
      <div className="flexboxes">
        {firstRun ? null:
        (<div className="container" id="searchResults">
          <h4>Search Results for *search input value*</h4>
          <div className="resultsLine">
           {searchResults.length ?
            (searchResults.map(result => (
              <div key={result.id}>
                <p className="results">{result.title} ({result.year})</p>
          <button className="results" onClick={handleNom}>Nominate</button>
          {/* need to disable button if movie in nominations */}
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
          <button className="results">Remove</button>
          </div>))):
          (<p>No Nominations</p>)}
          </div>

        </div>
        </div>
        </div>
  )

}

export default Shoppies;
