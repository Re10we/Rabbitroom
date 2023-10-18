import { Injectable } from '@nestjs/common';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from 'firebase/auth';

@Injectable()
export class UsersService {
  createUserWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();

    const resultCreate = createUserWithEmailAndPassword(auth, email, password);

    return resultCreate;
  }

  signInWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();

    const resultSignIn = signInWithEmailAndPassword(auth, email, password);

    return resultSignIn;
  }
}
