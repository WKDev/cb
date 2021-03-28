import React from 'react'
import './elements.css'
// import Button from 'react-bootstrap/Button'
import clock from '../assets/clock.svg'
const Switch = ({ label, isOn, handleToggle, onColor, id, timer }) => {
    return (
        <div className="switch-wrap">
            <span className="switch-with-label">
                <input
                    checked={isOn}
                    onChange={handleToggle}
                    className="react-switch-checkbox"
                    id={label}
                    type="checkbox"
                />
                <label
                    style={{ background: isOn && onColor }}
                    className="react-switch-label"
                    htmlFor={label}
                >
                    <span className={`react-switch-button`} />
                </label>
                <label onClick={handleToggle}>{label}</label>
            </span>
            {timer && <img src={clock} className="clock-img" alt="" />}
        </div>
    )
}

export default Switch
