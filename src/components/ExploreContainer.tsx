import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './ExploreContainer.css';
import { useEffect } from 'react';
import React, { useState } from 'react';
import Login from './LoginComponent';
import LoginComponent from './LoginComponent';
import AccueilComponent from './AccueilComponent';
import RechargementCompte from './RechargementCompte';
import ListeComponent from './ListeComponent';
import axios from 'axios';
import MesEncheres from '../modele/MesEncheres';

import { logOutOutline, add } from 'ionicons/icons';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  var [mesEncheres, setMesEncheres] = useState(null);
  //const [listeMesEncheres, setListeMesEncheres] = useState(null);
  

  return (
    <IonPage>
      {sessionStorage.getItem("TokenUtilisateur") != null ?
        <IonContent fullscreen className="ion-padding ion-text-center" >
          {name === "Login" ?
            <LoginComponent></LoginComponent>
            : ''
          }
          {name === "Home" ?
            <AccueilComponent></AccueilComponent>
            : ''
          }
          {name === "Rechargement" ?
            <RechargementCompte></RechargementCompte>
            : ''
          }
        </IonContent>
        : <Login />
      }
    </IonPage>
  );
};

export default ExploreContainer;
