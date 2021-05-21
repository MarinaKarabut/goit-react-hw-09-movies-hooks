import {memo} from 'react';
import PropTypes from 'prop-types';

import styles from './NotificationMessage.module.css'

function NotificationMessage({children}) {
    return <p className={styles.notification}>{children}</p>
};

export default memo(NotificationMessage);

NotificationMessage.propTypes ={
    text: PropTypes.string
}

