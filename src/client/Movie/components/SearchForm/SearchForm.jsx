
import useForm from '../../../../shared/hooks/useForm'
import {initialState} from './initialState'
import { fields } from './fields'
import Button from '../../../../shared/components/Button'

import styles from './SearchForm.module.css';


const SearchForm = ({onSubmit}) => {



    const [data, , handleChange, handleSubmit] = useForm({ initialState, onSubmit });


    return (
             <>
                <form className={ styles.form} onSubmit={handleSubmit}>
                    <input className={styles.input} onChange={handleChange} {...fields.query} value={data.query} />                  
                    <Button type="submit">Search</Button>
                </form>
             
            </>
         );


    
}

export default SearchForm
