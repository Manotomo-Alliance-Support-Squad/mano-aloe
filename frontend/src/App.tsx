import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import SessionService from "./services/session.service";
import { LanguageContext, LanguageContextValue } from "./components/languageSwitch/languageContext";
import DisplayedLanguage from "./models/language";

import HomePage from './pages/home/home';

interface AppProps {
}

export default class App extends React.Component<AppProps, LanguageContextValue> {

    state: LanguageContextValue = {
        language: DisplayedLanguage.Original,
        toggleLanguage: () => {
            const { language } = this.state;
            const nextLanguage = language === DisplayedLanguage.Original ? DisplayedLanguage.Japanese : DisplayedLanguage.Original;

            this.setState({ language: nextLanguage });
            SessionService.saveLanguage(nextLanguage);
        }
    };

    componentDidMount() {
        if (SessionService.getLanguage() === null) {
            SessionService.saveLanguage(DisplayedLanguage.Original);
        }
        this.setState({ language: SessionService.getLanguage() as DisplayedLanguage });
    }

    render() {
        return (
            <LanguageContext.Provider value={this.state}>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to="/home" />
                    </Route>
                    <Route path='/home' component={HomePage} />
                </Switch>
            </LanguageContext.Provider>
        );
    }
}
