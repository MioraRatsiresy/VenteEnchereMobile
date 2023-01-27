import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import './ExploreContainer.css';

import Login from './LoginComponent';
import LoginComponent from './LoginComponent';
import AccueilComponent from './AccueilComponent';
import RechargementCompte from './RechargementCompte';

import { logOutOutline } from 'ionicons/icons';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonTitle>Ventes aux enchères</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
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
    </IonPage>
  );
};

export default ExploreContainer;
