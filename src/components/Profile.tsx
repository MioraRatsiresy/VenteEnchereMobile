import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonItem, IonButton } from '@ionic/react';

import './Profile.css';
import { useEffect } from 'react';

const Profile = ({ profile, solde }: { profile: any, solde: any }) => {

    return (
        <>
            {
                profile != null ?
                    <IonCard>
                        <img src="image/profile.jpg" />
                        <IonCardHeader>
                            <IonCardTitle><b>{profile[0]["prenom"]}</b></IonCardTitle>
                            <IonCardSubtitle>{profile[0]["nom"]}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonItem>
                                <IonLabel><b>Identifiant : </b>{profile[0]["identifiant"]}</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel><b>Contact : </b>{profile[0]["contact"]}</IonLabel>
                            </IonItem>
                            {solde != null ?
                                <IonItem>
                                    <IonLabel><b id="solde">Solde : </b>{solde[0]["solde"]} Ar.</IonLabel>
                                </IonItem>
                                : ''
                            }
                        </IonCardContent>
                    </IonCard>
                    : ''
            }
        </>
    );
}
export default Profile;