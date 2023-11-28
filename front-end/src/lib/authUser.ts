import axios, { Axios, type AxiosResponse } from "axios";

export type User = {
  name: string;
  email: string;
  password: string;
};

export class AuthUser {
  private axiosInstance: Axios;

  constructor(private user: User) {
    this.user = user;
    this.axiosInstance = axios.create({
      withCredentials: true,
      //baseURL: "http://localhost:3000",
    });
  }

  async signUpUser(): Promise<AxiosResponse<User, any>> {
    const response = await this.axiosInstance.post<User>("/auth/signUp", this.user);

    return response;
  }

  async signInUser(): Promise<void> {
    await this.axiosInstance.post<boolean>("/auth/signIn", this.user);
  }

  async isStorageEmail(): Promise<boolean> {
    return (await this.axiosInstance.get(`/auth/isStorageEmail/${this.user.email}`)).data;
  }

  async isStorageUserName(): Promise<boolean> {
    return (await this.axiosInstance.get(`/auth/isStorageUserName/${this.user.name}`)).data;
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
