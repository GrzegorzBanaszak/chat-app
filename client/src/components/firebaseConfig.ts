import {initializeApp} from "firebase/app"
import {getFirestore,CollectionReference,collection,DocumentData} from "firebase/firestore"
import {getAuth} from "firebase/auth";
import { getStorage,ref } from "firebase/storage"
import ICharacter from "../interfaces/ICharacter";
import IMessage from "../interfaces/IMessage";
import IUser from "../interfaces/IUser";


const firebaseConfig = {
  apiKey: "AIzaSyBNV5aL7R_DdfWVDGMVJUEusl_Y2ZPJ6pc",
  authDomain: "chat-app-26d71.firebaseapp.com",
  projectId: "chat-app-26d71",
  storageBucket: "chat-app-26d71.appspot.com",
  messagingSenderId: "9355796876",
  appId: "1:9355796876:web:37fdcac45ae573f8db36a9"

};


export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app);
export const auth = getAuth(app)
export const storageRef = ref(storage)



const createCollection = <T = DocumentData> (collectionName : string) =>{
    return collection(db,collectionName) as CollectionReference<T>
}

export const usersCol = createCollection<IUser>('users')
export const charactersCol = createCollection<ICharacter>('characters')
export const messagesCol = createCollection<IMessage>('messages')