import { memo } from 'react'

const Button = ({ handle, children, classBtn }) => {
    return (
        <button 
            onClick={handle}
            className={classBtn}
        >
            {children}
        </button>
    )
}

export default memo(Button)