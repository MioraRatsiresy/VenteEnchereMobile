import {
    IonIcon,
    IonLabel,
    IonItem,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonModal,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonThumbnail,
    IonFab,
    IonFabButton,
    IonRow,
    IonGrid,
    IonCol
} from '@ionic/react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { camera, closeCircleOutline } from 'ionicons/icons';
import Login from '../pages/Login';
import { ajoutPhoto, usePhotoGallery } from '../pages/Photo';
import './ListeComponent.css';

const ListeComponent = ({ mesEncheres }: { mesEncheres: any }) => {
    const { photos, takePhoto } = usePhotoGallery();
    const [nullite, setNullite] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState<any | null>(null);
    const [photos1, setPhotos] = useState<any | null>(null);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(idEnchere: number) {
        console.log("idEnchere : " + idEnchere);
        axios.get("http://192.168.43.108:4444/infoEnchere/" + idEnchere + "/" + sessionStorage.getItem("TokenUtilisateur")).then((response) => {
            setInfo(response.data["infoEnchere"]);
            console.log(response.data["infoEnchere"]);
            if (info != null) {
                console.log(info[0].libelle);
            }
        });
        getAllPhoto(idEnchere);
        setIsOpen(true);
    }
    function getAllPhoto(idEnchere: number) {
        axios.get("http://192.168.43.108:4444/getPhotoEnchere/" + idEnchere).then((response) => {
            console.log(response.data["photo"]);
            setPhotos(response.data["photo"]);
            if (photos1 != null) {
                console.log("null");
                console.log(photos1[0].photo);
            }
        });
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
    function insertPhoto(id: any) {
        console.log(JSON.stringify(photos));
        axios.post("http://192.168.43.108:4444/insertPhoto/" + id + "/" + sessionStorage.getItem("TokenUtilisateur"), photos).then((res) => {
            console.log(res);
            takePhoto(-3);
        });
        setIsOpen(false);
        openModal(id);
    }

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
                                <>
                                    <IonGrid>
                                        <IonRow>
                                            {photos1 ?.map((value1: string, j: number) => {
                                                return (
                                                    <div key={j}>
                                                        {j === 0 ?
                                                            <IonItem>
                                                                <img src={`data:image/jpeg;base64,${photos1[j]["photo"]}`} alt="zety" />
                                                            </IonItem>
                                                            :
                                                            <IonCol slot="start">
                                                                <img src={`data:image/jpeg;base64,${photos1[j]["photo"]}`} alt="zety" />

                                                            </IonCol>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </IonRow>
                                    </IonGrid>
                                </>
                                <IonCardHeader>
                                    <IonItem>
                                        <IonFab slot="start" vertical="center" horizontal="end">
                                            <IonFabButton onClick={() => takePhoto(null)}>
                                                <IonIcon icon={camera}></IonIcon>
                                            </IonFabButton>
                                        </IonFab>
                                    </IonItem>
                                    {
                                        photos.length > 0 ?
                                            <>
                                                {
                                                    photos.map((value: any, id: number) => {
                                                        return (
                                                            <>
                                                                <p key={id}><IonButton onClick={() => takePhoto(id)}><IonIcon icon={closeCircleOutline}> </IonIcon></IonButton><img src={photos[id].webviewPath} alt="Img" width={100}></img></p>
                                                            </>
                                                        );
                                                    })
                                                }
                                                <IonButton onClick={insertPhoto.bind(this, info[0].idEnchere)}>Insérer</IonButton>
                                            </>


                                            :
                                            ''
                                    }
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
                                        {
                                            info[0].statut === "Termine" ?
                                                <IonLabel><b>Statut : </b><b id="termine">{info[0].statut}</b></IonLabel>
                                                : ''
                                        }
                                        {
                                            info[0].statut === "En cours" ?
                                                <IonLabel><b>Statut : </b><b id="enCours">{info[0].statut}</b></IonLabel>
                                                : ''
                                        }
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
