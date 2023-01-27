import { useIonViewWillEnter } from '@ionic/react';
import { useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Login from './Login';


const Tab1: React.FC = () => {

  useEffect(() => {
    sessionStorage.clear();
  })

  return (
    <>
      <Login />
    </>
  );
};

export default Tab1;
