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
    IonItem,
    IonInput,
    IonButton,
    IonAlert,
    IonGrid,
    IonCol,
    IonRow,
    useIonAlert,
    useIonToast,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonImg,
    IonListHeader
} from '@ionic/react';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, home, list, addCircleOutline, cashOutline, logOutOutline, globe } from 'ionicons/icons';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Login from '../pages/Login';
import MesEncheres from '../modele/MesEncheres';

const ListeComponent = ({ mesEncheres }: { mesEncheres: any }) => {
    const [nullite, setNullite] = useState(0);

    useEffect(() => {
        if (mesEncheres === null) {
            console.log("Null e!");
            setNullite(1);
        }
        if (mesEncheres != null) {
            //console.log("OK : " + mesEncheres[0].libelle);
            setNullite(2);
        }
    })

    return (
        <>
            {sessionStorage.getItem("TokenUtilisateur") != null ?
                <div>
                    {
                        mesEncheres?.map((value1: string, j: number) => {
                            return (
                                <div key={j}>
                                    <IonCard color="success">
                                        <IonCardHeader>
                                            <IonCardTitle><b>{ mesEncheres[j].libelle }</b></IonCardTitle>
                                            <IonCardSubtitle><b>Produit :</b>{ mesEncheres[j].produitEnchere },{ mesEncheres[j].categorie }</IonCardSubtitle>
                                        </IonCardHeader>

                                        <IonCardContent>
                                            <IonCardSubtitle><b>Date début :</b>{ mesEncheres[j].dateHeure }</IonCardSubtitle>
                                            <IonCardSubtitle><b>Date fin :</b>{ mesEncheres[j].dateFin }</IonCardSubtitle>
                                        </IonCardContent>
                                    </IonCard>
                                </div>
                            )
                        })}
                </div>
                : <Login />
            }
        </>
    );
};

export default ListeComponent;
