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
    const [info, setInfo] = useState<any | null>(null);
    const [photos, setPhotos] = useState<any | null>(null);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(idEnchere: number) {
        console.log("idEnchere : " + idEnchere);
        axios.get("http://localhost:4444/infoEnchere/" + idEnchere + "/" + sessionStorage.getItem("TokenUtilisateur")).then((response) => {
            setInfo(response.data["infoEnchere"]);
            if (info != null) {
                console.log(info[0].libelle);
            }
        });
        axios.get("http://localhost:4444/getPhotoEnchere/" + idEnchere).then((response) => {
            setPhotos(response.data["photo"]);
            if (photos != null) {
                console.log("null");
                console.log(photos[0].photo);
            }
        });
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
                                    <IonCard color="warning">
                                        <IonCardHeader>
                                            <IonCardTitle><b>{mesEncheres[j].libelle}</b></IonCardTitle>
                                            <IonCardSubtitle><b>Produit :</b>{mesEncheres[j].produitEnchere},{mesEncheres[j].categorie}</IonCardSubtitle>
                                        </IonCardHeader>

                                        <IonCardContent>
                                            <IonCardSubtitle><b>Date début :</b>{mesEncheres[j].dateHeure}</IonCardSubtitle>
                                            <IonCardSubtitle><b>Date fin :</b>{mesEncheres[j].dateFin}</IonCardSubtitle>
                                            <IonButton color="secondary" onClick={() => openModal(mesEncheres[j].idEnchere)}>Détails</IonButton>
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
                    {
                        info != null ?
                            <IonCard>
                                {photos ?.map((value1: string, j: number) => {
                                    return (
                                        <div key={j}>
                                            { j===0 ?
                                            <img alt="Silhouette of mountains" src={photos[j]["photo"]} />
                                            :
                                            <IonItem>
                                                <IonThumbnail slot="start">
                                                    <img alt="Silhouette of mountains" src={photos[j]["photo"]} />
                                                </IonThumbnail>
                                            </IonItem>
                                            }
                                        </div>
                                    )
                                })}
                                <IonCardHeader>
                                    <IonItem>
                                        <IonCardTitle><b>{info[0].libelle}</b></IonCardTitle>
                                    </IonItem>
                                    <IonItem>
                                        <IonCardSubtitle>{info[0].produitEnchere}, {info[0].categorie}</IonCardSubtitle>
                                    </IonItem>
                                </IonCardHeader>

                                <IonCardContent>
                                    <IonItem>
                                        <IonLabel><b>Date début :</b>{info[0].dateHeure}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel><b>Date fin :</b>{info[0].dateFin}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel><b>Prix minimum :</b>{info[0].prixMin}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel><b>Durée :</b>{info[0].duree} j.</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel><b>Statut :</b>{info[0].statut}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel><b>Montant :</b>{info[0].montant}</IonLabel>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                            : ''
                    }
                </IonContent>
            </IonModal>

        </>
    );
};

export default ListeComponent;
