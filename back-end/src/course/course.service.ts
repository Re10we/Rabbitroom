import { Injectable } from '@nestjs/common';
import { Course, roleUser } from './schemas/course.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { User } from '../user/schemas/user.schema';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,
    @InjectModel(Task.name)
    private readonly questModel: Model<Task>,
  ) {}

  private generateRandomString(length: number): string {
    const characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';

    for (let i: number = 0; i < length; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  async createCourse(userName: string, nameCourse: string): Promise<string> {
    let codeCourse: string = this.generateRandomString(6);

    while (await this.isFoundCodeCourse(codeCourse)) {
      codeCourse = this.generateRandomString(6);
    }

    await this.courseModel.create({
      codeCourse: codeCourse,
      nameCourse: nameCourse,
      users: [],
      tasks: [],
    });

    const isSuccessfullyAdd = await this.addUserToCourse(
      userName,
      roleUser.admin,
      codeCourse,
    );

    if (isSuccessfullyAdd == true) {
      return codeCourse;
    } else {
      throw Error('don`t added');
    }
  }

  async joinCourse(userName: string, codeCourse: string): Promise<boolean> {
    const candidate = this.userModel.findOne({ name: userName });
    if (candidate == null) {
      return false;
    }

    const course = this.courseModel.findOne({ codeCourse: codeCourse });
    if (course == null) {
      return false;
    }

    const isSuccessfullyAdd = await this.addUserToCourse(
      userName,
      roleUser.student,
      codeCourse,
    );

    return isSuccessfullyAdd;
  }

  async createTask(taskDto: TaskDto) {
    await this.questModel.create();
  }

  async addUserToCourse(
    userName: string,
    roleUser: roleUser,
    codeCourse: string,
  ): Promise<boolean> {
    const course = await this.courseModel.findOne({ codeCourse: codeCourse });
    if (course == null) {
      console.log(`course is null`);

      return false;
    }

    const candidate = this.userModel.findOne({ name: userName });
    if (candidate == null) {
      console.log(`candidate is null`);

      return false;
    }

    const isSuccessfullyPush =
      course.users.length !=
      course.users.push({ user: (await candidate)._id, role: roleUser });

    if (isSuccessfullyPush == true) {
      await course.updateOne({ users: course.users });
    }

    return isSuccessfullyPush;
  }

  async isFoundCodeCourse(codeCourse: string): Promise<boolean> {
    return (await this.courseModel.findOne({ codeCourse: codeCourse })) != null;
  }

  async getCoursesByUser(userName: string) {
    const user = await this.userModel.findOne({ name: userName });
    if (user == null) {
      return [];
    }

    const courses = await this.courseModel.find({
      users: { $elemMatch: { user: user._id } },
    });

    return courses;
  }

  async getCourseNameByCode(codeCourse: string): Promise<string | null> {
    const course = await this.courseModel.findOne({ codeCourse: codeCourse });
    if (course == null) {
      return null;
    }

    return course.nameCourse;
  }

  async getCourseUsersByCode(
    codeCourse: string,
  ): Promise<{ userName: string; role: string }[] | []> {
    const course = await this.courseModel.findOne({ codeCourse: codeCourse });
    if (course == null) {
      return [];
    }

    let users = await Promise.all(
      course.users.map(async (element, index, array) => {
        const userName = (await this.userModel.findById(element.user)).name;
        const roleStr = this.getRoleStringByIndex(element.role);

        return { userName: userName, role: roleStr };
      }),
    );

    return users;
  }

  async getCourseTasksByCode(codeCourse: string): Promise<[Task] | []> {
    const course = await this.courseModel.findOne({ codeCourse: codeCourse });
    if (course == null) {
      return [];
    }

    return course.tasks;
  }

  getRoleStringByIndex(indexRole: number): string {
    if (indexRole == roleUser.admin) {
      return 'admin';
    } else if (indexRole == roleUser.student) {
      return 'student';
    } else if (indexRole == roleUser.teacher) {
      return 'teacher';
    } else {
      return '';
    }
  }

  async deleteByName(nameCourse: string): Promise<boolean> {
    return (
      (await this.courseModel.findOneAndRemove({
        nameCourse: nameCourse,
      })) != null
    );
  }

  async deleteAll() {
    await this.courseModel.deleteMany({});
  }
}