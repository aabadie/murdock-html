/*
 * Copyright (C) 2021 Inria
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 * Author: Alexandre Abadie <alexandre.abadie@inria.fr>
 */

import { Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from 'react-router-dom';

import { LoadingSpinner } from './components';

const PullRequests = lazy(() => import('./PullRequests'));
const Nightlies = lazy(() => import('./Nightlies'));


const MurdockNavBar = () => {
    const location = useLocation();

    return (
        <div>
          <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
            <div className="container-fluid">
              <div className="navbar-brand">
                <a className="navbar-brand" href="https://github.com/RIOT-OS/RIOT" target="_blank" rel="noopener noreferrer"><i className="bi-github me-1"></i>RIOT-OS/RIOT</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                  <li className="nav-item">
                    <Link to="/" className={location.pathname === "/" ? "nav-link active": "nav-link"}>Pull Requests</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/nightlies" className={location.pathname === "/nightlies" ? "nav-link active": "nav-link"}>Nightlies</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    );
}

const Murdock = () => (
    <Router>
        <MurdockNavBar />
        <Suspense fallback={<div className="container"><LoadingSpinner /></div>}>
            <Switch>
                <Route exact path="/" component={PullRequests} />
                <Route path="/nightlies" component={Nightlies}/>
            </Switch>
        </Suspense>
    </Router>
);

export default Murdock;
