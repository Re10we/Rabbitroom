import axios, { type AxiosResponse } from "axios";

export type User = {
  name: string;
  email: string;
  password: string;
};

export class AuthUser {
  constructor(private user: User) {
    this.user = user;
  }

  async signUpUser(): Promise<AxiosResponse<User, any>> {
    const response = await axios.post<User>("http://localhost:3000/auth/signUp", this.user);

    return response;
  }

  async signInUser(): Promise<AxiosResponse<string, any>> {
    const response = await axios.post<string>("http://localhost:3000/auth/signIn", this.user);

    return response;
  }

  async isStorageEmail(): Promise<boolean> {
    return (await axios.get(`http://localhost:3000/auth/isStorageEmail/${this.user.email}`)).data;
  }

  async isStorageUserName(): Promise<boolean> {
    return (await axios.get(`http://localhost:3000/auth/isStorageUserName/${this.user.name}`)).data;
  }

  isValidEmail(): boolean {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const result: boolean = expression.test(this.user.email);

    return result;
  }

  isValidUserName(): boolean {
    //TODO validation for user name
    return true;
  }
  isValidPassword(): boolean {
    //TODO validation password user
    return true;
  }

  getUserName(): string {
    return this.user.name;
  }

  getUserEmail(): string {
    return this.user.email;
  }

  getUserPassword(): string {
    return this.user.password;
  }
}
