import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"


import { getMovieCast } from '../../service/movie-service';
import CastList from '../../components/CastList';
import ErrorMessage from '../../components/ErrorMessage';

import styles from './CastPage.module.css'

import defaultImg from '../../../../images/404.jpeg'


const CastPage = () => {

    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

     const { movieId } = useParams();

    useEffect(() => {
        const fetchMovieCast = async () => {
            try {
                const { data } = await getMovieCast(movieId)
                const newProfiles = data.cast.map(({ profile_path, ...rest }) => {
                    const newProfilesPath = profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : defaultImg

                    return {
                        ...rest,
                        profile_path: newProfilesPath,
                    }
                
                })
                setProfiles(newProfiles)
                setLoading(false)
            }
            catch (error) {
                setError(error)
            }
        }
        if (loading) {
            fetchMovieCast()
        }
    
 }, [loading,movieId])
    return (
            <>
                {error && <ErrorMessage text={`Something went wrong. Try again!`} />}
                
            {!loading&& !error&&<div className={styles.wrapper}>
                <CastList profiles={profiles} />
            </div>}
                
            </>)
    
}

export default CastPage

