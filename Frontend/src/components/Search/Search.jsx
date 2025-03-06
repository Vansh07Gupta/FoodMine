import React, { useState ,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './search.module.css';

export default function Search() {
  const { searchTerm } = useParams();
  const [term, setTerm] = useState(searchTerm || '');
  const navigate = useNavigate();

  const search = async () => {
    term ? navigate(`/search/${term}`) : navigate('/');
  };
  useEffect(() => {
    setTerm(searchTerm ?? '');
  }, [searchTerm]);

  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && search()}
        value={term}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}
