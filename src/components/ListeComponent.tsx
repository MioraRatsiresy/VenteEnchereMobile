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
    IonListHeader,
    IonModal,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonChip,
    IonTitle,
    IonThumbnail
} from '@ionic/react';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, home, list, addCircleOutline, cashOutline, logOutOutline, globe, closeCircleOutline } from 'ionicons/icons';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Login from '../pages/Login';
import MesEncheres from '../modele/MesEncheres';

const ListeComponent = ({ mesEncheres }: { mesEncheres: any }) => {
    const [nullite, setNullite] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

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
                        mesEncheres ?.map((value1: string, j: number) => {
                            return (
                                <div key={j}>
                                    <IonCard color="light">
                                        <IonCardHeader>
                                            <IonCardTitle><b>{mesEncheres[j].libelle}</b></IonCardTitle>
                                            <IonCardSubtitle><b>Produit :</b>{mesEncheres[j].produitEnchere},{mesEncheres[j].categorie}</IonCardSubtitle>
                                        </IonCardHeader>

                                        <IonCardContent>
                                            <IonCardSubtitle><b>Date début :</b>{mesEncheres[j].dateHeure}</IonCardSubtitle>
                                            <IonCardSubtitle><b>Date fin :</b>{mesEncheres[j].dateFin}</IonCardSubtitle>
                                            <IonButton color="secondary" onClick={openModal}>Détails</IonButton>
                                        </IonCardContent>
                                    </IonCard>
                                </div>
                            )
                        })}
                </div>
                : <Login />
            }
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Détail</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={closeModal}>
                                <IonIcon icon={closeCircleOutline}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonCard>
                        <img alt="Silhouette of mountains" src="assets/image/image2.jpg" />
                        <IonItem>
                            <IonThumbnail slot="start">
                                <img alt="Silhouette of mountains" src="assets/image/image2.jpg" />
                            </IonThumbnail>
                            <IonThumbnail slot="start">
                                <img alt="Silhouette of mountains" src="assets/image/image2.jpg" />
                            </IonThumbnail>
                            <IonThumbnail slot="start">
                                <img alt="Silhouette of mountains" src="assets/image/image2.jpg" />
                            </IonThumbnail>
                        </IonItem>
                        <IonCardHeader>
                            <IonItem>
                                <IonCardTitle><b>Bac à litière</b></IonCardTitle>
                            </IonItem>
                            <IonItem>
                                <IonCardSubtitle>Chat, Animalerie</IonCardSubtitle>
                            </IonItem>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonItem>
                                <IonLabel><b>Date début :</b></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><b>Date fin :</b></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><b>Prix minimum :</b></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><b>Durée :</b></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><b>Statut :</b></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><b>Lead :</b></IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><b>Montant :</b></IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonModal>
        </>
    );
};

export default ListeComponent;
