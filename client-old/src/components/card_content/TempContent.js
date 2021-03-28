import React from 'react'

const TempContent = (props) => {
    return (
        <div className="temp-wrap">
            <p className="ac-data">{props.temp}</p>
            <p className="ac-data">{props.humid}</p>
        </div>
    )
}

export default TempContent
