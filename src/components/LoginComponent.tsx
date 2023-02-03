import { useIonToast, useIonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import Home from '../pages/Home';
import { Utilisateur } from '../modele/Utilisateur';

const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState<any>(null);
    const [pwd, setPwd] = useState<any>(null);
    const [presentToast] = useIonToast();
    const [page, setPage] = useState(0);
    const [inscription, setInscription] = useState(0);
    const [accueil, setAccueil] = useState(0);
    const [presentAlert] = useIonAlert();
    const [nom, setNom] = useState<any>(null);
    const [prenom, setPrenom] = useState<any>(null);
    const [contact, setContact] = useState<any>(null);
    const [identifiant, setIdentifiant] = useState<any>(null);
    const [mdp, setMdp] = useState<any>(null);
    const [login, setLogin] = useState<any>(null);

    useEffect(() => {
        var temp = new Utilisateur();
        temp.identifiant = "Mbola";
        temp.pwd = "mbola";
        setLogin(temp);
    }, []);
    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name);
        var temp = new Utilisateur();
        if (login !== null) {
            if (name === "identifiant") {
                temp.identifiant = value;
                temp.pwd = login.pwd;
            }
            else if (name === "pwd") {
                temp.identifiant = login.identifiant;
                temp.pwd = value;
            }
        }
        setLogin(temp);
    }
    function validerFormulaire() {
        var emaildocument = document.getElementById('identifiant');
        var pwddocument = document.getElementById('pwd');
        let pwd = "";
        let identifiant = "";
        if (emaildocument != null && pwddocument != null) {
            pwd = (pwddocument as HTMLInputElement).value;
            identifiant = (emaildocument as HTMLInputElement).value;
        }
        console.log(identifiant);
        console.log(pwd);
        try {
            axios.post("https://backofficeventeenchere-production-db7d.up.railway.app/login/traitementClient?identifiant=" + identifiant + "&pwd=" + pwd).then((response) => {
                if (response.data['message'] === "Login correcte") {
                    sessionStorage.setItem("TokenUtilisateur", response.data['token']);
                    sessionStorage.setItem("idUser", response.data['iduser']);
                    setPage(1);
                    setAccueil(1);
                    setInscription(0);
                }
                else {
                    presentAlert(
                        {
                            header: response.data['message'],
                            buttons: [
                                {
                                    text: 'OK',
                                    role: 'confirm',
                                },

                            ],
                        }
                    );
                }
            })
            setEmail("");
            setPwd("");
        } catch (e) {
            alert("Exception : " + e);
        }
    };

    function viewInscription() {
        setPage(1);
        setAccueil(0);
        setInscription(1);
    }

    function viewLogin() {
        setPage(0);
        setAccueil(0);
        setInscription(0);
    }

    function validerInscription() {
        if (nom != null && prenom != null && contact != null && identifiant != null && mdp != null) {
            axios.post("https://backofficeventeenchere-production-db7d.up.railway.app/inscriptionClient?nom=" + nom + "&prenom=" + prenom + "&contact=" + contact + "&identifiant=" + identifiant + "&pwd=" + mdp).then((response) => {
                sessionStorage.setItem("TokenUtilisateur", response.data['token']);
                sessionStorage.setItem("idUser", response.data['iduser']);
                setPage(1);
                setAccueil(1);
                setInscription(0);
            })
        }
        else {
            presentAlert(
                {
                    header: "❌Veuillez remplir tous les champs s'il vous plait!",
                    buttons: [
                        {
                            text: 'OK',
                            role: 'confirm',
                        },

                    ],
                }
            );
        }
    }

    return (
        <>

            {
                page === 0 ?
                    <IonGrid>
                        <IonRow>
                            <IonCol>

                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonIcon
                                    style={{ fontSize: "70px", color: "rgb(252, 148, 44)" }}
                                    icon={personCircle}
                                />
                            </IonCol>
                        </IonRow>
                        {login != null ?
                            <>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating"> Identifiant</IonLabel>
                                            <IonInput value={login.identifiant} id="identifiant" type="text" onChange={handleChange}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>

                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating"> Mot de passe</IonLabel>
                                            <IonInput value={login.pwd} id="pwd" type="password" onChange={handleChange}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonButton color="warning" expand="block" onClick={validerFormulaire}>Login</IonButton>
                                        <p style={{ fontSize: "medium" }}>
                                            Vous n'avez pas encore de compte? <a onClick={viewInscription}><br />Inscrivez-vous ici!</a>😀
                                        </p>
                                    </IonCol>
                                </IonRow>
                            </>
                            :
                            ''
                        }
                    </IonGrid>
                    : ''
            }
            {
                accueil === 1 ?
                    <Home />
                    : ''
            }
            {
                inscription === 1 ?
                    <IonGrid>
                        <IonRow>
                            <IonCol>

                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonIcon
                                    style={{ fontSize: "70px", color: "rgb(252, 148, 44)" }}
                                    icon={personCircle}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Nom</IonLabel>
                                    <IonInput value={nom} onIonChange={(e: any) => setNom(e.target.value)} type="text"></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Prénom</IonLabel>
                                    <IonInput value={prenom} onIonChange={(e: any) => setPrenom(e.target.value)} type="text"></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Contact</IonLabel>
                                    <IonInput value={contact} onIonChange={(e: any) => setContact(e.target.value)} type="text"></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Identifiant</IonLabel>
                                    <IonInput value={identifiant} onIonChange={(e: any) => setIdentifiant(e.target.value)} type="text"></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Mot de passe</IonLabel>
                                    <IonInput value={mdp} onIonChange={(e: any) => setMdp(e.target.value)} type="password"></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton color="warning" expand="block" onClick={validerInscription}>S'inscrire</IonButton>
                                <p style={{ fontSize: "medium" }}>
                                    <a onClick={viewLogin}><br />Login</a>😀
                                </p>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    : ''
            }

        </>
    );
};

export default LoginComponent;
