import axios from "axios";

type User = {
  name: string;
  email: string;
  password: string;
};

export class AuthUser {
  constructor(private user: User) {
    this.user = user;
  }

  async regUser() {
    const { data, status } = await axios.post<User>("http://localhost:3000/auth/create", this.user);

    return { data, status };
  }

  async signInUser() {
    const { data, status } = await axios.post<User>("http://localhost:3000/auth/signIn", this.user);

    return { data, status };
  }

  async isStorageEmail(): Promise<boolean> {
    return (await axios.get(`http://localhost:3000/auth/validEmail/${this.user.email}`)).data;
  }

  async isStorageUserName(): Promise<boolean> {
    return (await axios.get(`http://localhost:3000/auth/validUserName/${this.user.name}`)).data;
  }

  isValidEmail(): boolean {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const result: boolean = expression.test(this.user.email);
    console.log(this.user.email);
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
