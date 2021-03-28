import './Routes.css'
import React, { useEffect, useState } from 'react'

import { Switch, Redirect, Route } from 'react-router-dom'
import { Dashboard, Login } from '../pages'

const App = () => {
    //어느 세션으로 보낼 지 선택

    const [isAuthorized, setIsAuthorized] = useState(false)

    //여기서 세션 확인이 안되면 로그인 페이지로 이동시키기
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch('/ref_sess', requestOptions)
            .then((res) => res.json())
            .then((users) => {
                console.log('in app_sessCheck')
                setIsAuthorized(Boolean(parseInt(users.isAuthorized)))
                console.log(isAuthorized)
            })
    })
    return (
        <div>
            {isAuthorized ? (
                <Redirect to="/dashboard" />
            ) : (
                <Redirect to="/login" />
            )}

            <Switch>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>

                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
            {/* <Route exact path="/about:name" component={About} /> */}
        </div>
    )
}

export default App
