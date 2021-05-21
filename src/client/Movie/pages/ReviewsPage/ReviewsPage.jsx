
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews } from '../../service/movie-service';
import ReviewsList from '../../components/ReviewsList';
import ErrorMessage from '../../components/ErrorMessage';

import styles from './ReviewsPage.module.css'



const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const {movieId} =useParams()


    useEffect(() => {
        const fetchMovieReviews = async () => {
            try {
                const { data } = await getMovieReviews(movieId)

                setReviews(data.results)
                setLoading(false)
            }
            catch (error) {
                setError(error)
            }
            
        }
        if (loading) {
                fetchMovieReviews()
            }
    }, [loading,movieId])
    
    
    return (
        <>
            {error && <ErrorMessage text={`Something went wrong. Try again!`} />}
            {!loading && !error && <div className={styles.wrapper}>
                <ReviewsList reviews={reviews} />
            </div>}
        </>
    )
 
}

export default Reviews
