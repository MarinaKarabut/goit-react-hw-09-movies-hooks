
import { useState, useEffect, lazy, Suspense} from 'react';
import { Route, useParams} from "react-router-dom"
import { getOneMovie } from '../../service/movie-service';
import routes from '../../../../app/components/App/routes';

import ErrorMessage from '../../components/ErrorMessage';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader'

import defaultImg from '../../../../images/404.jpeg'

const CastPage = lazy(() => import('../CastPage'));
const ReviewsPage = lazy(()=> import( '../ReviewsPage'));

const MovieDetailsPage = () => {

    const [movie, setMovie] = useState({})
    const [genres, setGenres]=useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { movieId } = useParams();


    useEffect(() => {
        const fetchOneMovie = async () => {
            try {
                const { data } = await getOneMovie(movieId)
                setMovie(data)
                setGenres(data.genres)
                setLoading(false)
            }
            catch (error) {
               setError(error)
            }
        }
        if (loading) {
            fetchOneMovie()
        }
    }, [loading,movieId])

    const newImg = movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: defaultImg
    return (
        <>
                {loading&&<Loader/>}
                {error && <ErrorMessage text={`Something went wrong. Try again!`} />}
                {!loading&& !error && (<MovieCard
                    title={movie.title}
                    popularity={movie.vote_average}
                    overview={movie.overview}
                    genres={genres}
                    image={newImg}
                    idFilm={movie.id}
                />)}


            <Suspense fallback={<Loader />}>
                <Route path={routes.cast} render={(props) => <CastPage {...props}/>} />
                <Route path={routes.reviews} render={(props) => <ReviewsPage {...props} />} />
            </Suspense>
                

            </>
        )
}

export default MovieDetailsPage


