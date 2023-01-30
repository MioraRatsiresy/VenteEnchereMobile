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
    IonCardTitle,
    IonModal,
    IonChip,
    IonThumbnail,
    IonSelectOption,
    IonSelect,
    IonInput
} from '@ionic/react';
import { IonItem, IonList } from '@ionic/react';
import { useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, home, list, addCircleOutline, cashOutline, logOutOutline, add, closeCircleOutline, camera } from 'ionicons/icons';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Login from '../pages/Login';
import axios from 'axios';
import ListeComponent from './ListeComponent';
import MesEncheres from '../modele/MesEncheres';

const AccueilComponent = () => {
    const [deconnecte, setDeconnecte] = useState(0);
    const [rechargement, setRechargement] = useState(0);
    const [liste, setListe] = useState(0);
    const [mesEncheres, setMesEncheres] = useState<any | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [categorie, setCategorie] = useState<any | null>(null);
    const [inputs, setInputs] = useState({});
    const [produit, setProduit] = useState<any | null>(null);
    const [succes, setSucces] = useState(0);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        axios.get("http://localhost:4444/listecategorie").then((response) => {
            setCategorie(response.data["categorie"]);
            if (categorie != null) {
                console.log(categorie[0]["categorie"]);
            }
        });
        setIsOpen(true);
    }

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
            var listeEnchere = Array();
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
            if (mesEncheres == null) {
                console.log("Tsisy");
            }
        })
    }

    function getProduitByCategorie(id: number) {
        axios.get("http://localhost:4444/getProduitByCategorie/" + id).then((response) => {
            setProduit(response.data["produit"]);
        });
    }

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        if (name == "categorie") {
            getProduitByCategorie(value);
        }
        if (produit == null) {
            console.log("Hi");
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios.post("http://localhost:4444/insertEnchere/" + sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("TokenUtilisateur"), null, { params: inputs }).then((response) => {
            console.log("OK");
            setIsOpen(false);
            axios.get("http://localhost:4444/listeMesEncheres/" + sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("TokenUtilisateur")).then((response) => {
            //setMesEncheres(response.data["mesEncheres"]);
            // console.log(response.data["mesEncheres"][0]["categorie"]);
            var listeEnchere = Array();
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
            if (mesEncheres == null) {
                console.log("Tsisy");
            }
        })
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
                                <IonFab slot="start" vertical="center" horizontal="end" onClick={openModal}>
                                    <IonFabButton>
                                        <IonIcon icon={add}></IonIcon>
                                    </IonFabButton>
                                </IonFab>

                            </div>
                        </IonContent>
                    </>
                    : <Login />
            }
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Nouvelle enchère</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={closeModal}>
                                <IonIcon icon={closeCircleOutline}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">

                    <form onSubmit={handleSubmit}>
                        <IonItem>
                            <IonFab slot="start" vertical="center" horizontal="end" onClick={openModal}>
                                <IonFabButton>

                                    <IonIcon icon={camera}></IonIcon>

                                </IonFabButton>
                            </IonFab>
                        </IonItem>


                        <IonItem>
                            <IonLabel><b>Catégorie :</b></IonLabel>
                            <IonSelect placeholder="Catégorie" name="categorie" onIonChange={handleChange}>
                                {categorie ?.map((value1: string, j: number) => {
                                    return (
                                        <div key={j}>
                                            <IonSelectOption value={categorie[j]["id"]}>{categorie[j]["categorie"]}</IonSelectOption>
                                        </div>
                                    )
                                })}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel><b>Produit :</b></IonLabel>
                            <IonSelect placeholder="Produit" name="produit" onIonChange={handleChange}>
                                {produit ?.map((value1: string, j: number) => {
                                    return (
                                        <div key={j}>
                                            <IonSelectOption value={produit[j]["id"]}>{produit[j]["produit"]}</IonSelectOption>
                                        </div>
                                    )
                                })}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Libelle</IonLabel>
                            <IonInput type="text" name="libelle" onIonChange={handleChange}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Prix minimum</IonLabel>
                            <IonInput type="number" name="prixMin" onIonChange={handleChange}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Durée</IonLabel>
                            <IonInput type="number" name="duree" onIonChange={handleChange}></IonInput>
                        </IonItem>

                        <IonButton color="success" expand="block" type="submit">Valider</IonButton>

                    </form>
                </IonContent>
            </IonModal>
        </>
    );
};

export default AccueilComponent;
