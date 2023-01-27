import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import './ExploreContainer.css';

import Login from './LoginComponent';
import LoginComponent from './LoginComponent';
import AccueilComponent from './AccueilComponent';
import RechargementCompte from './RechargementCompte';

import { logOutOutline, add } from 'ionicons/icons';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
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
      :<Login/>
      }
    </IonPage>
  );
};

export default ExploreContainer;
