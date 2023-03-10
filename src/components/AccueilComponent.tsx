import {
    IonIcon,
    IonLabel,
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
    IonModal,
    IonSelectOption,
    IonSelect,
    IonInput,
    IonGrid,
    IonCol,
    IonRow
} from '@ionic/react';
import { IonItem, IonList } from '@ionic/react';
import { useState } from 'react';
import { home, cashOutline, logOutOutline, add, closeCircleOutline, hammer, personOutline } from 'ionicons/icons';
import Tab2 from '../pages/Tab2';
import Login from '../pages/Login';
import axios from 'axios';
import ListeComponent from './ListeComponent';
import MesEncheres from '../modele/MesEncheres';
import Profile from './Profile';
import './AccueilComponent.css';

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
    const [cameraPhoto, setCamera] = useState(0);
    const [profile, setProfile] = useState(0);
    const [monProfile, setMonProfile] = useState<any | null>(null);
    const [solde, setSolde] = useState<any | null>(null);
    const [accueil, setAccueil] = useState(0);

    function openCamera() {
        console.log("Camera");
        //setCamera(1);
        //setIsOpen(false);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        axios.get("https://backofficeventeenchere-production-db7d.up.railway.app/listecategorie").then((response) => {
            setCategorie(response.data["categorie"]);
            console.log("Categorie : " + response.data["categorie"][0]["categorie"]);
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
        xmlhttp.open("GET", "https://backofficeventeenchere-production-db7d.up.railway.app/deconnexion");
        xmlhttp.send();
    }

    function ViewRechargement() {
        console.log("Lol");
        setRechargement(1);
        setListe(0);
        setProfile(0);
        setAccueil(1);
    }

    function ViewMesEncheres() {
        console.log("Mes ench??res");
        setRechargement(0);
        setListe(1);
        setProfile(0);
        setAccueil(1);
        axios.get("https://backofficeventeenchere-production-db7d.up.railway.app/listeMesEncheres/" + sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("TokenUtilisateur")).then((response) => {
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
        axios.get("https://backofficeventeenchere-production-db7d.up.railway.app/getProduitByCategorie/" + id).then((response) => {
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
        axios.post("https://backofficeventeenchere-production-db7d.up.railway.app/insertEnchere/" + sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("TokenUtilisateur"), null, { params: inputs }).then((response) => {
            console.log("OK");
            setIsOpen(false);
            axios.get("https://backofficeventeenchere-production-db7d.up.railway.app/listeMesEncheres/" + sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("TokenUtilisateur")).then((response) => {
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
                    //console.log("Tsisy");
                    console.log("Valeur ?? rechercher: " + event.target.value);
                }
            })
        })
    }

    function ViewProfile() {
        console.log("Profile");
        axios.get("https://backofficeventeenchere-production-db7d.up.railway.app/getClientById/" + sessionStorage.getItem("idUser") + "/" + sessionStorage.getItem("TokenUtilisateur")).then((response) => {
            setMonProfile(response.data["client"]);
            console.log("Personne : " + response.data["client"][0]["prenom"]);
        });
        axios.get("https://backofficeventeenchere-production-db7d.up.railway.app/getSoldeClient/" + sessionStorage.getItem("idUser")).then((response) => {
            setSolde(response.data["solde"]);
            console.log("Solde : " + response.data["solde"][0]["solde"]);
        });
        setRechargement(0);
        setListe(0);
        setProfile(1);
        setAccueil(1);
    }

    const handleSearch = (event: any) => {
        const val = event.target.value;
        console.log(val);
        axios.get("https://backofficeventeenchere-production-db7d.up.railway.app/rechercheAvanceFront", { params: { "search": val } }).then((response) => {
            var listeEnchere = Array();
            console.log(response.data["enchere"]);
            for (var item = 0; item < response.data["enchere"].length; item++) {
                listeEnchere[item] = new MesEncheres();
                listeEnchere[item].idEnchere = response.data["enchere"][item]["idEnchere"];
                listeEnchere[item].libelle = response.data["enchere"][item]["libelle"];
                listeEnchere[item].categorie = response.data["enchere"][item]["categorie"];
                listeEnchere[item].dateHeure = response.data["enchere"][item]["dateHeure"];
                listeEnchere[item].dateFin = response.data["enchere"][item]["dateFin"];
                listeEnchere[item].produitEnchere = response.data["enchere"][item]["produitEnchere"];
                //setMesEncheres(listeEnchere[item]);
            }
            setMesEncheres(listeEnchere);
            //console.log("Mes ench??res: "+mesEncheres);
        });
        setRechargement(0);
        setProfile(0);
        setListe(1);
        setAccueil(1);
    }

    function ViewHome() {
        setRechargement(0);
        setProfile(0);
        setListe(0);
        setAccueil(0);
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
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol>
                                                        <IonIcon icon={home}></IonIcon>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel onClick={ViewHome}>Home</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonMenuToggle>
                                    </IonItem>
                                    <IonItem>
                                        <IonMenuToggle>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol>
                                                        <IonIcon icon={cashOutline}></IonIcon>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel onClick={ViewRechargement}>Rechargement</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonMenuToggle>
                                    </IonItem>
                                    <IonItem>
                                        <IonMenuToggle>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol>
                                                        <IonIcon icon={hammer}></IonIcon>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel onClick={ViewMesEncheres}>Mes ench??res</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonMenuToggle>
                                    </IonItem>
                                    <IonItem>
                                        <IonMenuToggle>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol>
                                                        <IonIcon icon={personOutline}></IonIcon>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel onClick={ViewProfile}>Profile</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonMenuToggle>
                                    </IonItem>

                                    <IonItem>
                                        <IonMenuToggle>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol>
                                                        <IonIcon icon={logOutOutline}></IonIcon>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel onClick={logout}>Log out</IonLabel>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonMenuToggle>
                                    </IonItem>
                                    <p>ETU : 1502,1391</p>
                                    <IonMenuToggle>
                                        <IonButton>Close menu</IonButton>
                                    </IonMenuToggle>
                                </IonList>
                            </IonContent>
                        </IonMenu>
                        <>
                            <IonHeader id="main-content">
                                <IonToolbar>
                                    <IonButtons slot="start" >
                                        <IonMenuButton></IonMenuButton>
                                    </IonButtons>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="8">
                                                <IonTitle><b>Ench??re </b> ETU : 1502,1391</IonTitle>
                                            </IonCol>
                                            <IonCol size="4">
                                                <IonFab onClick={openModal} vertical="center" horizontal="start" id="fab">
                                                    <IonFabButton style={{ width: "40px", height: "40px" }}>
                                                        <IonIcon icon={add}></IonIcon>
                                                    </IonFabButton>
                                                </IonFab>
                                            </IonCol>

                                        </IonRow>
                                    </IonGrid>
                                </IonToolbar>
                                <IonToolbar>
                                    <IonSearchbar onIonChange={handleSearch}></IonSearchbar>
                                </IonToolbar>
                            </IonHeader>
                            <h1></h1>
                        </>
                        
                            <>
                                {
                                    accueil === 0 ?
                                        <>
                                            <img src="image/accueil.jpg" />
                                            <h1><b>Commencons!</b></h1>
                                            <br />
                                            <h5>Vendez rapidement, R??alisez une bonne affaire, Gagnez de la visibilit??.</h5>
                                            <br />
                                            <br />
                                            <IonButton color="primary" expand="block" id="commencez" onClick={openModal}>Commencez ?? vendre</IonButton>
                                        </>
                                        : ''
                                }
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
                                {
                                    profile === 1 ?
                                        <>
                                            <Profile profile={monProfile} solde={solde}></Profile>
                                        </>
                                        : ''
                                }
                            </>
                        
                    </>
                    : <Login />
            }
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Nouvelle ench??re</IonTitle>
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
                            <IonLabel><b>Cat??gorie :</b></IonLabel>
                            <IonSelect placeholder="Cat??gorie" name="categorie" onIonChange={handleChange}>
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
                            <IonLabel position="floating">Dur??e</IonLabel>
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
