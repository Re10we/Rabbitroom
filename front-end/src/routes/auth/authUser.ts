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
    const { data, status } = await axios.post<User>(
      "http://localhost:3000/auth/create",
      this.user
    );

    return { data, status };
  }

  async signInUser() {
    const { data, status } = await axios.post<User>(
      "http://localhost:3000/auth/signIn",
      this.user
    );

    return { data, status };
  }
}
