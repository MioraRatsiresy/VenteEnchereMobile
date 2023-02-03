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
import './RechargementCompte.css';

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
        <div id="contenu">
            {sessionStorage.getItem("TokenUtilisateur") != null ?
                <IonGrid>
                    <IonRow>
                        <IonCol>

                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <img src="image/debit.svg" alt=""/>
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
                            <IonButton color="primary" expand="block" onClick={rechargement}>Envoyer</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                : <Login />
            }
        </div>
    );
};

export default AccueilComponent;
