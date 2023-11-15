import axios from "axios";

/**
 * The User class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export class User {
  private static instance: User;

  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  static getInstance(): User {
    if (!User.instance) {
      User.instance = new User();
    }

    return User.instance;
  }

  isLogginIn(): boolean {
    return localStorage.getItem("access_token") != null ? true : false;
  }

  logOut(): void {
    localStorage.removeItem("access_token");
  }

  async createCourse(nameCourse: string): Promise<string | null> {
    if (this.isLogginIn() == true) {
      const response = axios.post<string | null>(
        `http://localhost:3000/course/create/${nameCourse}`,
        {},
        {
          headers: { Authorization: `Bearer ${this.getAccessTokken()}` },
        }
      );

      return (await response).data;
    }

    return null;
  }

  async joinCourse(codeCourse: string): Promise<boolean> {
    if (this.isLogginIn() == true) {
      const response = axios.post<boolean>(
        `http://localhost:3000/course/join/${codeCourse}`,
        {},
        {
          headers: { Authorization: `Bearer ${this.getAccessTokken()}` },
        }
      );

      return (await response).data;
    }

    return false;
  }

  getAccessTokken(): string | null {
    return localStorage.getItem("access_token");
  }

  async getUserName() {
    if (this.isLogginIn() == true) {
      const response = axios.get("http://localhost:3000/user/userName", {
        headers: { Authorization: `Bearer ${this.getAccessTokken()}` },
      });

      return (await response).data;
    }

    return null;
  }

  async getUserEmail() {
    if (this.isLogginIn() == true) {
      const response = axios.get("http://localhost:3000/user/userEmail", {
        headers: { Authorization: `Bearer ${this.getAccessTokken()}` },
      });

      return (await response).data;
    }

    return null;
  }

  async getUserCourses() {
    if (this.isLogginIn() == true) {
      const response = axios.get("http://localhost:3000/course/getCourses", {
        headers: { Authorization: `Bearer ${this.getAccessTokken()}` },
      });

      return (await response).data;
    }

    return null;
  }
}
