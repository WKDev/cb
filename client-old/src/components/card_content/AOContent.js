import Button from 'react-bootstrap/Button'
import React from 'react'

const AOContent = () => {
    return (
        <div className="aoc-wrap">
            <Button variant="info" size="lg">
                Stay
            </Button>
            <Button variant="light" size="lg">
                Leave
            </Button>
        </div>
    )
}

export default AOContent
