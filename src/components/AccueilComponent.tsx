import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import React, { useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, home, list, addCircleOutline, cashOutline, logOutOutline } from 'ionicons/icons';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Login from '../pages/Login'

const AccueilComponent: React.FC = () => {
    const [page, setPage] = useState(0);

    function logout() {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var retour = JSON.parse(this.responseText);
                if (retour['message'] === "Logout with success") {
                    sessionStorage.clear();
                    setPage(1);
                }
                else {
                }
            }
        }
        xmlhttp.open("GET", "http://localhost:4444/deconnexion");
        xmlhttp.send();
    }

    return (
        <>
            {page === 0 ?
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route exact path="/tab1">
                                <Tab1 />
                            </Route>
                            <Route exact path="/tab2">
                                <Tab2 />
                            </Route>
                            <Route path="/tab3">
                                <Tab3 />
                            </Route>
                            <Route exact path="/">
                                <Redirect to="/tab1" />
                            </Route>
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom"><IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={cashOutline} />
                        </IonTabButton>
                            <IonTabButton tab="tab3" href="/tab3">
                                <IonIcon icon={home} />

                            </IonTabButton>
                            <IonTabButton tab="tab1" onClick={logout}>
                                <IonIcon icon={logOutOutline} />
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
                :
                <Login />
            }
        </>
    );
};

export default AccueilComponent;
