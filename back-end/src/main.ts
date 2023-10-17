import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase
const applic = initializeApp({
  apiKey: "AIzaSyDCx1lsHp836bqxUgqUOdjhrp1BoNNY0g8",
  authDomain: "rabbitroom-93eb6.firebaseapp.com",
  databaseURL: "https://rabbitroom-93eb6-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "rabbitroom-93eb6",
  storageBucket: "rabbitroom-93eb6.appspot.com",
  messagingSenderId: "720273610518",
  appId: "1:720273610518:web:c4ad83904c6b2cc0ba2237"
});

const db = getDatabase();
const starCountRef = onValue(ref(db, '/Users/yevhen'), (snapshot) => {
  //const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...i
  //console.log(snapshot.val());
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const auth = getAuth(applic);
  const signInUser = await signInWithEmailAndPassword(auth, 'temp1@gmail.com', 'password');
    
  //const user = getAuth(applic);

  console.log(auth.currentUser.email);
  
  if (auth) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // ...
    //console.log(user.email);
  } else {
    // No user is signed in.
  }

}

bootstrap();
