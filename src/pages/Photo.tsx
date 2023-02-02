import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';


export function usePhotoGallery() {
    const savePicture = async (photo: Photo, fileName: string, id: number): Promise<UserPhoto> => {
        let base64Data: string;
        // "hybrid" will detect Cordova or Capacitor;
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!,
            });
            base64Data = file.data;
        } else {
            base64Data = await base64FromPath(photo.webPath!);
        }
        console.log(base64Data);
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });
        if (isPlatform('hybrid')) {
            // Display the new image by rewriting the 'file://' path to HTTP
            // Details: https://ionicframework.com/docs/building/webview#file-protocol
            return {
                filepath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
                base64: base64Data,
            };
        }
        else {
            // Use webPath to display the new image instead of base64 since it's
            // already loaded into memory
            return {
                filepath: fileName,
                webviewPath: photo.webPath,
                base64: base64Data,
            };
        }
    };


    // open camera
    const takePhoto = async (id: any) => {
        if (id == null) {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 100,
            });
            const fileName = new Date().getTime() + '.jpeg';
            const savedFileImage = await savePicture(photo, fileName, id);
            const newPhotos = [
                savedFileImage,
                ...photos,
            ];
            setPhotos(newPhotos);
        }
        else if(id!=null && id>0) {
            removeItem(id);
            console.log(photos.length);
        }
        else {
            removeAllItem();
        }

        // Preferences.remove({ key: PHOTO_STORAGE });
    };

    function removeItem(index: any) {
        const arraytemp = [...photos];
        console.log(JSON.stringify(arraytemp));
        arraytemp.splice(index, 1)
        setPhotos(arraytemp);
    }

    function removeAllItem() {
        setPhotos([]);
    }

    const [photos, setPhotos] = useState<UserPhoto[]>([]);

    return {
        photos,
        takePhoto,
    };

}


export async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('method did not return a string');
            }
        };
        reader.readAsDataURL(blob);
    });
}
export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
    base64: string;
}


export function ajoutPhoto(id: any, base64image: any) {
    fetch(`http://localhost:4444/insertPhoto/` + id + `/` + sessionStorage.getItem("TokenUtilisateur"), {
        method: 'POST',
        body: base64image
    }
    ).then((res) => {
        console.log(res);
    });
}