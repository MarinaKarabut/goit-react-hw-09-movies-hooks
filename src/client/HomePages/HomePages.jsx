import { useState, useEffect } from "react";


import Loader from '../Movie/components/Loader'
import { trendMovies } from '../Movie/service/movie-service';
import ErrorMessage from '../../client/Movie/components/ErrorMessage';
import MovieList from "../Movie/components/MovieList/MovieList";


import styles from './HomePage.module.css'


const HomePage = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



  useEffect(() => {
    const fetchMovies = async () => {
            try{
                const { data } = await trendMovies()
                const newMovies = data.results
                setLoading(false);
                setMovies([...movies, ...newMovies]);

            }
            catch(error){
                setError(error)
            }
        }
        if(loading){
            fetchMovies();
            
        }

  }, [loading, movies])

    return (
        <>
            <h1 className={styles.title}>Trending today</h1>
            {loading && <Loader />}
            {!loading&& !error && <div className={styles.wrapper}>
                <MovieList movies={movies} />
            </div>}
            {error && <ErrorMessage text={`Something went wrong. Try again!`} />}
             
            </>
                    
        )
    
}

export default HomePage
