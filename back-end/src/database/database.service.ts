import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable()
export class DatabaseService {
  async onModuleInit() {
    // Initialize Firebase
    const configApp = {
      apiKey: 'AIzaSyDCx1lsHp836bqxUgqUOdjhrp1BoNNY0g8',
      authDomain: 'rabbitroom-93eb6.firebaseapp.com',
      databaseURL:
        'https://rabbitroom-93eb6-default-rtdb.europe-west1.firebasedatabase.app/',
      projectId: 'rabbitroom-93eb6',
      storageBucket: 'rabbitroom-93eb6.appspot.com',
      messagingSenderId: '720273610518',
      appId: '1:720273610518:web:c4ad83904c6b2cc0ba2237',
    };

    const app = initializeApp(configApp);
    if (app) {
      console.log('Server run');
    } else console.log('Server don`t run');
  }

  async onModuleDestroy() {
    console.log('Server dissconected');
  }
}
