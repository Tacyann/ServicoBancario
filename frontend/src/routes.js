import React from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';

import Conta from './pages/Conta';


export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
        <Route path="/conta" exact component={Conta}/>
        </Switch>
        </BrowserRouter>
    );
}