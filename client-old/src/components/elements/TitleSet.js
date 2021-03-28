import React from 'react'
import setting_icon from '../assets/setting_icon.svg'
import './elements.css'
// import Button from 'react-bootstrap/Button'

const TitleSet = (props) => {
    return (
        <div className="title-wrap">
            <div className="title-set">
                {props.isOn === true ? (
                    <div className="status-led"></div>
                ) : (
                    <div className="status-led-off"></div>
                )}
                <h5>{props.title}</h5>
            </div>

            <img
                src={setting_icon}
                alt=""
                className="setting_img"
                onClick={props.onSettingClick}
            />
        </div>
    )
}

export default TitleSet
