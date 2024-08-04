
import { auth, provider, signInWithPopup, storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp,query, orderBy, onSnapshot} from 'firebase/firestore';

import db from "../firebase";
import { SET_USER,SET_LOADING_STATUS ,GET_ARTICLES} from "./actionType";


export const setUser = (payload) => ({
    type: SET_USER,
    user: payload
})

export const setLoading=(status)=>({
    type:SET_LOADING_STATUS,
    status:status,
})

export const getArticles=(payload)=>({
    type:GET_ARTICLES,
    payload:payload,
})

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                dispatch(setUser(payload.user))
            })
            .catch((error) => alert(error.message));
    }
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user))
            }
        })
    }
}

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut()
            .then(() => { dispatch(setUser(null)) })
            .catch((error) => {
                console.log(error.message)
            })
    }
};

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true))
        if (payload.image !== "") {
            const upload =
                ref(storage, `images/${payload.image.name}`)
            const uploadtask = uploadBytesResumable(upload, payload.image);

            uploadtask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Progress:${progress}%`);
                if (snapshot.state === 'RUNNING') {
                    console.log(`Progress${progress}%`)
                }
            }, error => console.log(error.code),
                async () => {
                    const downloadURL = await getDownloadURL(uploadtask.snapshot.ref);
                    await addDoc(collection(db, 'articles'), {
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            date: Timestamp.now(),
                            image: payload.user.photoURL,
                        },
                        video: payload.video,
                        sharedImg: downloadURL,
                        comments: 0,
                        description: payload.description,
                    });
                    dispatch(setLoading(false));
                }
            );

        }
        else if (payload.video) {
            addDoc(collection(db, 'articles'), {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: Timestamp.now(),
                    image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description,
            });
        }
    };
}

// export function getArticlesAPI(){
//     return (dispatch)=>{
//         let payload;
//         db.collection("articles").orderBy("actor.date","desc").onSnapshot((snapshot)=>{
//             payload=snapshot.docs.map((doc)=>doc.data());
//             console.log(payload);
//         })
//     }
// }

export function getArticlesAPI() {
    return (dispatch) => {
      const articlesQuery = query(collection(db, "articles"), orderBy("actor.date", "desc"));
      onSnapshot(articlesQuery, (snapshot) => {
        const payload = snapshot.docs.map((doc) => doc.data());
        dispatch(getArticles(payload));
      });
    };
  }

