import { Injectable } from '@nestjs/common';
import { Course, roleUser } from './schemas/course.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { User } from '../user/schemas/user.schema';
import { TaskDto } from './dto/task.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
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
    let codeCourse: string = this.generateRandomString(
      parseInt(process.env.CODE_COURSE_LENGHT),
    );

    while (await this.isFoundCodeCourse(codeCourse)) {
      codeCourse = this.generateRandomString(
        parseInt(process.env.CODE_COURSE_LENGHT),
      );
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

  async createTask(
    codeCourse: string,
    owner: string,
    taskDto: TaskDto,
  ): Promise<boolean> {
    const task = await this.taskModel.create({
      owner: owner,
      due: taskDto.due,
      title: taskDto.title,
      description: taskDto.description,
      maxPoints: taskDto.maxPoints,
      topic: taskDto.topic,
      students: taskDto.students,
      files: [],
      links: taskDto.links,
    });

    const isSuccessfullyAdd = this.addTaskToCourse(task, codeCourse);

    if (task != null && taskDto.files != undefined && isSuccessfullyAdd) {
      let AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
      let s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_BUCKET_REGION,
      });
      const course = await this.courseModel.findOne({ codeCourse: codeCourse });

      //upload all files on AWS storage
      let urls = await Promise.all(
        taskDto.files.map(async (item) => {
          const originalname = item.originalname;

          const uploadParams = {
            Bucket: AWS_S3_BUCKET,
            Key:
              course.nameCourse +
              ':' +
              course.codeCourse +
              '/' +
              task.title +
              ':' +
              task._id +
              '/' +
              String(originalname),
            Body: item.buffer,
            ContentType: item.mimetype,
          };

          const getParams: AWS.S3.GetObjectRequest = {
            Bucket: AWS_S3_BUCKET,
            Key:
              course.nameCourse +
              ':' +
              course.codeCourse +
              '/' +
              task.title +
              ':' +
              task._id +
              '/' +
              String(originalname),
          };

          //upload file on AWS storage
          const s3Response = await s3.upload(uploadParams).promise();

          //get url file on AWS storage
          const url = await s3.getSignedUrlPromise('getObject', getParams);

          return url;
        }),
      );

      await task.updateOne({ files: urls });
    }

    return isSuccessfullyAdd;
  }

  async addTaskToCourse(task: Task, codeCourse: string): Promise<boolean> {
    const course = await this.courseModel.findOne({ codeCourse: codeCourse });
    if (course == null) {
      return false;
    }

    if (task == null) {
      return false;
    }

    const isSuccessfullyPush = course.tasks.length != course.tasks.push(task);

    if (isSuccessfullyPush == true) {
      await course.updateOne({ tasks: course.tasks });
    }

    return isSuccessfullyPush;
  }

  async addUserToCourse(
    userName: string,
    roleUser: roleUser,
    codeCourse: string,
  ): Promise<boolean> {
    const course = await this.courseModel.findOne({ codeCourse: codeCourse });
    if (course == null) {
      return false;
    }

    const candidate = this.userModel.findOne({ name: userName });
    if (candidate == null) {
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

  async addTopicToCourse(
    codeCourse: string,
    nameTopic: string,
  ): Promise<boolean> {
    const course = await this.courseModel.findOne({ codeCourse: codeCourse });
    if (course == null) {
      return false;
    }

    const isFoundTopic =
      course.topics.find((element) => element == nameTopic) == nameTopic;

    if (isFoundTopic) {
      return false;
    } else {
      const isSuccessfullyPush =
        course.topics.length != course.topics.push(nameTopic);

      if (isSuccessfullyPush) {
        await course.updateOne({ topics: course.topics });
      }

      return isSuccessfullyPush;
    }
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
      course.users.map(async (element) => {
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

  async getCourseTopicsByCode(codeCourse: string): Promise<[string] | []> {
    const course = await this.courseModel.findOne({ codeCourse: codeCourse });
    if (course == null) {
      return [];
    }

    return course.topics;
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
