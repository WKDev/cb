import React, { useState } from 'react'
import Switch from '../elements/Switch'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import arrow_icon from '../assets/arrow_icon.svg'
import './content.css'

const LightContent = (props) => {
    const [isOpen, setisOpen] = useState(false)
    const [light1, setLight1] = useState(false)
    const [light2, setLight2] = useState(false)

    const [arrowDir, setArrowDir] = useState('arrow-icon')

    const handleExpand = () => {
        setisOpen(!isOpen) // open collapse
        isOpen ? setArrowDir('arrow-icon-reversed') : setArrowDir('arrow-icon')
    }
    return (
        <div>
            <Switch
                id="light1"
                label="Living Room"
                isOn={light1}
                onColor="#EF476F"
                handleToggle={() => setLight1(!light1)}
                timer={true}
            ></Switch>
            <Switch
                id="light2"
                label="Kitchen"
                isOn={light2}
                onColor="#EF476F"
                handleToggle={() => setLight2(!light2)}
                timer={false}
            ></Switch>

            <Collapse in={isOpen}>
                <div>
                    <Switch
                        id="light2"
                        label="Kitchen"
                        isOn={light2}
                        onColor="#EF476F"
                        handleToggle={() => setLight2(!light2)}
                        timer={false}
                    ></Switch>
                    <Switch
                        id="light2"
                        label="Kitchen"
                        isOn={light2}
                        onColor="#EF476F"
                        handleToggle={() => setLight2(!light2)}
                        timer={false}
                    ></Switch>
                    <Switch
                        id="light2"
                        label="Kitchen"
                        isOn={light2}
                        onColor="#EF476F"
                        handleToggle={() => setLight2(!light2)}
                        timer={false}
                    ></Switch>
                </div>
            </Collapse>

            <Button
                variant="Light"
                size="lg"
                bsPrefix="collapse-expand-light"
                onClick={handleExpand}
            >
                <img className={arrowDir} src={arrow_icon} alt="" />
            </Button>
        </div>
    )
}

export default LightContent
