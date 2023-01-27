import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
    IonPage,
    IonMenu,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonFab,
    IonMenuToggle,
    IonFabButton,
    IonButton
} from '@ionic/react';
import { IonItem, IonList } from '@ionic/react';
import React, { useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, home, list, addCircleOutline, cashOutline, logOutOutline, add } from 'ionicons/icons';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Login from '../pages/Login'

const AccueilComponent: React.FC = () => {
    const [deconnecte, setDeconnecte] = useState(0);
    const [rechargement, setRechargement] = useState(0);
    const [isOpen, setIsOpen] = useState(true);

    function logout() {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var retour = JSON.parse(this.responseText);
                if (retour['message'] === "Logout with success") {
                    sessionStorage.clear();
                    setDeconnecte(1);
                }
                else {
                }
            }
        }
        xmlhttp.open("GET", "http://localhost:4444/deconnexion");
        xmlhttp.send();
    }

    function ViewRechargement() {
        console.log("Lol");
        setRechargement(1);
        setIsOpen(false);
    }

    return (
        <>
            {
                deconnecte === 0 ?
                    <>
                        <IonMenu contentId="main-content" >
                            <IonHeader>
                                <IonToolbar>
                                    <IonTitle>Menu</IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent>
                                <IonList>
                                    <IonItem>
                                        <IonMenuToggle>
                                            <IonLabel onClick={ViewRechargement}>Rechargement</IonLabel>
                                        </IonMenuToggle>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Mes enchères</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel onClick={logout}>Log out</IonLabel>
                                    </IonItem>
                                    <IonMenuToggle>
                                        <IonButton>Close menu</IonButton>
                                    </IonMenuToggle>  
                                </IonList>
                            </IonContent>
                        </IonMenu>
                        <div id="main-content">
                            <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="start" >
                                        <IonMenuButton></IonMenuButton>
                                    </IonButtons>
                                    <IonTitle>Ventes aux enchères</IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            <h1></h1>
                        </div>
                        <IonContent>
                            <div>
                                {
                                    rechargement === 1 ?
                                        <Tab2 />
                                        : ''
                                }
                                <IonFab slot="start" vertical="center" horizontal="end">
                                    <IonFabButton>
                                    <IonIcon icon={add}></IonIcon>
                                    </IonFabButton>
                                </IonFab>

                            </div>
                        </IonContent>
                    </>
                    : <Login />
            }
        </>
    );
};

export default AccueilComponent;
