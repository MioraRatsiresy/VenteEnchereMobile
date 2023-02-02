import {
    IonIcon,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    useIonAlert,
    useIonToast
} from '@ionic/react';
import axios from "axios";
import React, { useState } from 'react';
import { cashOutline, globe } from 'ionicons/icons';
import Login from '../pages/Login';

const AccueilComponent: React.FC = () => {
    const [montant, setMontant] = useState<any>(null);
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();
    const [handlerMessage, setHandlerMessage] = useState('');
    const [roleMessage, setRoleMessage] = useState('');

    function rechargement() {
        console.log("Rechargement");
        if (montant < 0) {
            presentAlert({
                header: '❌Montant négatif!❌',
                buttons: [
                    {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            setHandlerMessage('Alert confirmed');
                        },
                    },
                ],
                onDidDismiss: (e: CustomEvent) => setRoleMessage(`Dismissed with role: ${e.detail.role}`),
            })
            setMontant("");
        } else {
            axios.post("http://localhost:4444/rechargermoncompte/" + sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("TokenUtilisateur") + "?montant=" + montant).then((response) => {
                setMontant("");
                console.log("Id utilisateur : " + sessionStorage.getItem("idUser"));
                presentToast({
                    message: "Votre demande de rechargement prise en compte",
                    duration: 1000,
                    icon: globe
                })
            })
        }
    }

    return (
        <>
            {sessionStorage.getItem("TokenUtilisateur") != null ?
                <IonGrid>
                    <IonRow>
                        <IonCol>

                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                style={{ fontSize: "70px", color: "#528f76" }}
                                icon={cashOutline}
                            />
                            <b><h1>Rechargement de compte</h1></b>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Montant</IonLabel>
                                <IonInput value={montant} onIonChange={(e: any) => setMontant(e.target.value)} type="number" min="0"></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton color="warning" expand="block" onClick={rechargement}>Envoyer</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                : <Login />
            }
        </>
    );
};

export default AccueilComponent;
