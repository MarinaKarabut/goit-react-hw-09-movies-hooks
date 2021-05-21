import {memo} from 'react';

import PropTypes from 'prop-types';

import styles from './Button.module.css'

const Button =({ children, type = 'button', onClick = () => null,className}) =>{
    return <button  className={`${styles.button} ${className}`} type={type} onClick={onClick}>{children}</button>
};

export default memo(Button);

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
}

