import React, {useEffect, useState} from 'react';

import {Button} from "@material-ui/core";

import {Header} from "./components/header";
import {Lists} from "./components/lists";
import {Tooltip} from "./components/tooltip";

import {INSTALL_BUTTON_TOOLTIP_TEXT} from "./CONSTS";

import './App.css';

function App() {

    const [button, showButton] = useState(false);
    const [tooltip, showTooltip] = useState(false);
    const [textForTooltip, changeTextForTooltip] = useState('');

    const [beforeInstallEvent, setBeforeInstallEvent] = useState(null);

    useEffect(() => {
        const listener = (event) => {
            event.preventDefault();
            setBeforeInstallEvent(event);
            if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true) {
                return false;
            }
            showButton(true)
        };

        window.addEventListener('beforeinstallprompt', listener);
        return () => {
            window.removeEventListener('beforeinstallprompt', listener);
        }
    }, []);

    const installApp = async () => {
        if(!beforeInstallEvent) return false;
        beforeInstallEvent.prompt();
        const answer = await beforeInstallEvent.userChoice;
        if (answer.outcome !== 'accepted'){
            showTooltip(true);
            changeTextForTooltip(INSTALL_BUTTON_TOOLTIP_TEXT)
        }
        setBeforeInstallEvent(null);
        showButton(false)
    };

    const onTooltipClose = () => {
        showTooltip(false);
        changeTextForTooltip('')
    };

    const installButton = () => <Button variant="contained" color="secondary" onClick={installApp}>Install</Button>;
    return (
        <div className="App" data-testid='App'>
            <Header children={button && installButton}/>
            <Lists/>
            {tooltip && <Tooltip text={textForTooltip} onClose={onTooltipClose} data-testid='Tooltip'/>}
        </div>
    );
}

export default App;
