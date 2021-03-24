import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import LoginForm from "./js/components/LoginForm";

function App(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <div className='App'>
            {isLoggedIn ?
                <BrowserRouter basename={""}>
                    <Switch>
                        <Route path="/page-address">
                            <div>
                                <h1>New Page</h1>
                                <h3>This page uses React Router.</h3>
                                <p>Copy this Route and update the "path" to the desired relative URL</p>
                                <Link to={"/"}>LINK TO HOME PAGE</Link>
                            </div>
                        </Route>
                        <Route path="/">
                            <div>
                                <Link to={"/page-address"}>LINK TO ANOTHER PAGE</Link>
                                <h1>HOME PAGE</h1>
                                <h3>This page uses React Router.</h3>
                                <p>This entire code block should be replaced by a React Component.</p>
                            </div>
                        </Route>
                    </Switch>
                </BrowserRouter>
            :
                // Route to Login first
                <LoginForm onLogin={() => setIsLoggedIn(true)}/>
            }
        </div>
    );
}

export default App;
