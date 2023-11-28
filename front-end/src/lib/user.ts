import axios, { Axios } from "axios";
import type FormData from "form-data";

export class User {
  private static instance: User;
  private static axiosInstance: Axios;

  private constructor() {}

  static getInstance(): User {
    if (!User.instance) {
      User.instance = new User();
      User.axiosInstance = axios.create({
        withCredentials: true,
        baseURL: process.env.BASE_URL,
      });
    }

    return User.instance;
  }

  async logOut(): Promise<void> {
    await User.axiosInstance.get("/auth/logOut");

    localStorage.clear();
  }
  async isLogginIn(): Promise<boolean> {
    try {
      const response = await User.axiosInstance.get("/user/inSession");

      return response.data;
    } catch {
      return false;
    }
  }

  async createCourse(nameCourse: string): Promise<string | null> {
    const response = await User.axiosInstance.post<string | null>(
      `/course/createCourse/${nameCourse}`,
      {}
    );

    return response.data;
  }

  async joinCourse(codeCourse: string): Promise<boolean> {
    const response = await User.axiosInstance.post<boolean>(`/course/join/${codeCourse}`, {});

    return response.data;
  }

  async createTask(formData: FormData, codeCourse: string): Promise<boolean> {
    const response = await User.axiosInstance.post(`/course/createTask/${codeCourse}`, formData);

    return response.data;
  }

  async createTopic(codeCourse: string, nameTopic: string): Promise<boolean> {
    const response = await User.axiosInstance.post<boolean>(
      `/course/createTopic/${codeCourse}/${nameTopic}`
    );

    return response.data;
  }

  async deleteTaskFromCourse(idTask: string, codeCourse: string): Promise<boolean> {
    const response = await User.axiosInstance.delete<boolean>(
      `/course/deleteTask/${codeCourse}/${idTask}`
    );

    return response.data;
  }

  async getUserName() {
    const response = await User.axiosInstance.get("/user/userName");

    return response.data;
  }

  async getUserEmail() {
    const response = await User.axiosInstance.get("/user/userEmail");

    return response.data;
  }

  async getUserCourses(): Promise<[]> {
    const response = await User.axiosInstance.get("/course/getCourses");

    return await response.data;
  }

  async getCourseNameByCode(codeCourse: string): Promise<string | null> {
    const response = await User.axiosInstance.get(`/course/getCourseName/${codeCourse}`);

    return response.data;
  }

  async getCourseUsersByCode(codeCourse: string): Promise<[]> {
    const response = await User.axiosInstance.get(`/course/getCourseUsers/${codeCourse}`);

    return response.data;
  }

  async getCourseTasksByCode(codeCourse: string): Promise<[]> {
    const response = await User.axiosInstance.get(`/course/getCourseTasks/${codeCourse}`);

    return response.data;
  }

  async getCourseTopicsByCode(codeCourse: string): Promise<[]> {
    const response = await User.axiosInstance.get(`/course/getCourseTopics/${codeCourse}`);

    return response.data;
  }

  async isAdminUser(codeCourse: string, userName: string): Promise<boolean> {
    const response = await User.axiosInstance.get(`/course/isAdminUser/${codeCourse}/${userName}`);

    return response.data;
  }

  async isTeacherUser(codeCourse: string, userName: string): Promise<boolean> {
    const response = await User.axiosInstance.get(
      `/course/isTeacherUser/${codeCourse}/${userName}`
    );

    return response.data;
  }

  async isStudentUser(codeCourse: string, userName: string): Promise<boolean> {
    const response = await User.axiosInstance.get(
      `/course/isStudentUser/${codeCourse}/${userName}`
    );

    return response.data;
  }
}
