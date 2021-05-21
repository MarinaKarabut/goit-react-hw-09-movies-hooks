
import { useState, useEffect } from 'react';
// import { Redirect } from "react-router-dom"
import SearchForm from '../../components/SearchForm/SearchForm';
import { searchMovies } from '../../service/movie-service';
import MovieList from '../../components/MovieList';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../../../shared/components/Button'


import styles from './MoviesPage.module.css';

const MoviesPage = () => {

    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchSearchMovies = async () => {
            try {
                const { data } = await searchMovies(query, page)
                console.log(data);
                const newMovies = data.results
                setMovies([...movies,...newMovies])
                setLoading(false)

            }
            catch (error) {
                setError(error)
                setLoading(false)
            }
        
        
        }
    
        if (loading) {
            fetchSearchMovies()
        }
      
    }, [loading,query,page])

    const onChangeQuery = ({ query }) => {
        setQuery(query)
        setMovies([])
        setLoading(true)
        setError(null)
        setPage(1)
    }

     const loadMore = () => {
        const prevPage=page
        setPage(prevPage+1)
        setLoading(true);
    }


    return (
            <>
            <SearchForm onSubmit={onChangeQuery} />
            <div className={styles.wrapper}>
                <MovieList movies={movies} />
                
            </div>
            <div className={styles.wrapperBtn}>
                {movies.length > 0 && !loading && <Button className={styles.btn} onClick={loadMore}>Load more</Button>}
            </div>
                {error && <ErrorMessage text={`Something went wrong. Try again!`} />}
            
            </>
        )
}

export default MoviesPage

// class MoviesPage extends Component {
//     state = {
//         movies: [],
//         query: "",
//         loading: false,
//         error: null,
//         submit:false
//     };

//     async componentDidMount() {
//         const query = new URLSearchParams(this.props.location.search).get('query')

//         if (query) {

//          try {
//             const { data } = await searchMovies(query)
//             const newMovies = data.results

//             this.setState({
//                     movies: newMovies,
//                     loading: false,
//                     submit:false
//                 }) 
//             }
//             catch (error) {
//                 this.setState({
//                     loading: false,
//                     submit:false,
//                     error
//                 })
//             }
//             finally{
//                 this.setState({ loading: false, submit:false })
//             };  
              
//         }
//     }
 
    
//    async componentDidUpdate(prevProps, prevState, snapshot) {
//        const { loading, query } = this.state
       
//         if (loading) {
//             try {
//             const { data } = await searchMovies(query)
//             const newMovies = data.results

//             this.setState({
//                     movies: newMovies,
//                     loading: false,
//                     submit:false
//                 }) 
//             }
//             catch (error) {
//                 this.setState({
//                     loading: false,
//                     submit:false,
//                     error
//                 })
//             }
//             finally{
//                 this.setState({ loading: false, submit:false })
//             };
        
//         }   
//     }

     
    
//     onChangeQuery = searchQuery => {
//         this.setState({
//             query: searchQuery,
//             movies: [],
//             loading: true,
//             error: null,
//             submit: true
//         })
//     }

    
//     render() {

//         const { movies, submit, query, error} = this.state
//         const { onChangeQuery } = this
//         if(submit){
//             const redirectOptions = {
//                 pathname: "/movies",
//                 search: `?query=${query}`
//             };
//             return <Redirect to={redirectOptions}/>
//         }

    
//         return (
//             <>
                
//                 <SearchForm onSubmit={onChangeQuery} />
//                 <div className={styles.wrapper}>
//                     <MovieList movies={movies} />
//                 </div>
//                 {error && <ErrorMessage text={`Something went wrong. Try again!`} />}
            
//             </>
//         )
//     }
// }
    
//  export default MoviesPage;
 