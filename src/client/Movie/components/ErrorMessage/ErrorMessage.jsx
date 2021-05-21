import {memo} from 'react';

import styles from './ErrorMessage.module.css'

import PropTypes from 'prop-types';

function ErrorMessage({text}) {
    return <p className={styles.error}>{text}</p>
        
};

export default memo(ErrorMessage);

ErrorMessage.propTypes ={
    text: PropTypes.string.isRequired
}

