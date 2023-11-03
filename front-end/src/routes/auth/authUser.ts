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

  async validEmail(): Promise<boolean> {
    return (await axios.get(`http://localhost:3000/auth/validEmail/${this.user.email}`)).data;
  }

  async validUserName(): Promise<boolean> {
    return (await axios.get(`http://localhost:3000/auth/validUserName/${this.user.name}`)).data;
  }

  validPassword(): boolean {
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
