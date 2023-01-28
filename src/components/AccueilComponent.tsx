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
    IonButton,
    IonSearchbar,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle
} from '@ionic/react';
import { IonItem, IonList } from '@ionic/react';
import { useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, home, list, addCircleOutline, cashOutline, logOutOutline, add } from 'ionicons/icons';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Login from '../pages/Login';
import axios from 'axios';
import ListeComponent from './ListeComponent';
import MesEncheres from '../modele/MesEncheres';

const AccueilComponent  = () => {
    const [deconnecte, setDeconnecte] = useState(0);
    const [rechargement, setRechargement] = useState(0);
    const [liste, setListe] = useState(0);
    const [mesEncheres, setMesEncheres] = useState<any | null>(null); 

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
        setListe(0);
    }

    function ViewMesEncheres() {
        console.log("Mes enchères");
        setRechargement(0);
        setListe(1);
        axios.get("http://localhost:4444/listeMesEncheres/" + sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("TokenUtilisateur")).then((response) => {
            //setMesEncheres(response.data["mesEncheres"]);
           // console.log(response.data["mesEncheres"][0]["categorie"]);
            var listeEnchere =  Array();
           // console.log(response.data["mesEncheres"][0]["idEnchere"]);
            for (var item = 0; item < response.data["mesEncheres"].length; item++) {
                listeEnchere[item] = new MesEncheres();
                listeEnchere[item].idEnchere = response.data["mesEncheres"][item]["idEnchere"];
                listeEnchere[item].libelle = response.data["mesEncheres"][item]["libelle"];
                listeEnchere[item].categorie = response.data["mesEncheres"][item]["categorie"];
                listeEnchere[item].dateHeure = response.data["mesEncheres"][item]["dateHeure"];
                listeEnchere[item].dateFin = response.data["mesEncheres"][item]["dateFin"];
                listeEnchere[item].produitEnchere = response.data["mesEncheres"][item]["produitEnchere"];
                //setMesEncheres(listeEnchere[item]);
            }
            setMesEncheres(listeEnchere);
            if(mesEncheres==null){
                console.log("Tsisy");
            }
            /*else{
                console.log("Misy: "+mesEncheres[0]["libelle"]);
            }*/
            //setMesEncheres(listeEnchere);
            //console.log("Mes encheres : "+mesEncheres[0].libelle);
            //console.log("State : "+mesEncheres);
        })
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
                                        <IonMenuToggle>
                                            <IonLabel onClick={ViewMesEncheres}>Mes enchères</IonLabel>
                                        </IonMenuToggle>
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
                                <IonToolbar>
                                    <IonSearchbar></IonSearchbar>
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
                                {
                                    liste === 1 ?
                                        <>
                                            <ListeComponent mesEncheres={mesEncheres}></ListeComponent>
                                        </>
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
