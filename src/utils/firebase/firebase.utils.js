// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAQhrxw8nDsaW52CZWY-8kQfq11_i76mpA",
    authDomain: "crwn-clothing-database1.firebaseapp.com",
    projectId: "crwn-clothing-database1",
    storageBucket: "crwn-clothing-database1.appspot.com",
    messagingSenderId: "612474675865",
    appId: "1:612474675865:web:7abad5e670e0b60e800e08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log('Batch Done');
}

export const createUserDocumentFromAuth = async (userAuth, aditionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(
                userDocRef, {
                displayName,
                email,
                createdAt,
                ...aditionalInfo,
            });
        } catch (err) {
            console.log('error creating the user', err);
        }
    };
    return userSnapshot;
    //if user data does/doesn't exists

    //create/set the doc with the data from userAuth in my collection

    //return userDocRef
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshop = await (getDocs(q));
    const categoryMap = querySnapshop.docs.map(docsSnapshot => docsSnapshot.data());

    return categoryMap;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    console.log("creatingAuth");
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    console.log("signin email/pw");
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {

    onAuthStateChanged(auth, callback);
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            }, reject)
    })
}