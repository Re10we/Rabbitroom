import {
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
  Delete,
  Get,
  UseInterceptors,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { AuthGuard } from '../user/guard/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TaskDto } from './dto/task.dto';
import { roleUser } from './schemas/course.schema';

@Controller('course')
@ApiTags('course-controller')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('createCourse/:nameCourse')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  createCourse(@Request() req, @Param('nameCourse') nameCourse: string) {
    const { username } = req.user;

    return this.courseService.createCourse(username, nameCourse);
  }

  @Post('join/:codeCourse')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  joinCourse(@Request() req, @Param('codeCourse') codeCourse: string) {
    const { username } = req.user;

    return this.courseService.joinCourse(username, codeCourse);
  }

  @Post('createTask/:codeCourse')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  createTask(
    @Request() req,
    @Body() dto: TaskDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Param('codeCourse') codeCourse: string,
  ) {
    const { username } = req.user;
    dto.files = files;

    return this.courseService.createTask(codeCourse, username, dto);
  }

  @Post('createTopic/:codeCourse/:nameTopic')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  createTopic(
    @Param('codeCourse') codeCourse: string,
    @Param('nameTopic') nameTopic: string,
  ) {
    return this.courseService.addTopicToCourse(codeCourse, nameTopic);
  }

  @Get('getCourses')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  getCoursesByUser(@Request() req) {
    const { username } = req.user;

    return this.courseService.getCoursesByUser(username);
  }

  @Get('getCourseName/:codeCourse')
  getCourseByCode(@Param('codeCourse') codeCourse: string) {
    return this.courseService.getCourseNameByCode(codeCourse);
  }

  @Get('getCourseUsers/:codeCourse')
  getCourseUsersByCode(@Param('codeCourse') codeCourse: string) {
    return this.courseService.getCourseUsersByCode(codeCourse);
  }

  @Get('getCourseTasks/:codeCourse')
  getCourseTasksByCode(@Param('codeCourse') codeCourse: string) {
    return this.courseService.getCourseTasksByCode(codeCourse);
  }

  @Get('getCourseTopics/:codeCourse')
  getCourseTopicsByCode(@Param('codeCourse') codeCourse: string) {
    return this.courseService.getCourseTopicsByCode(codeCourse);
  }

  @Get('isAdminUser/:codeCourse/:userName')
  isAdminUser(
    @Param('codeCourse') codeCourse: string,
    @Param('userName') userName: string,
  ) {
    return this.courseService.isSomeRoleUser(
      codeCourse,
      userName,
      roleUser.admin,
    );
  }

  @Get('isTeacherUser/:codeCourse/:userName')
  isTeacherUser(
    @Param('codeCourse') codeCourse: string,
    @Param('userName') userName: string,
  ) {
    return this.courseService.isSomeRoleUser(
      codeCourse,
      userName,
      roleUser.teacher,
    );
  }

  @Get('isStudentUser/:codeCourse/:userName')
  isStudentUser(
    @Param('codeCourse') codeCourse: string,
    @Param('userName') userName: string,
  ) {
    return this.courseService.isSomeRoleUser(
      codeCourse,
      userName,
      roleUser.student,
    );
  }

  @Delete('deleteTask/:codeCourse/:idTask')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  deleteTaskFromCourse(
    @Param('codeCourse') codeCourse: string,
    @Param('idTask') idTask: string,
  ) {
    return this.courseService.deleteTaskFromCourse(codeCourse, idTask);
  }

  @Delete('delete/:nameCourse')
  deleteUser(@Param('nameCourse') nameCourse: string) {
    return this.courseService.deleteByName(nameCourse);
  }

  @Delete('deleteAll')
  deleteAll() {
    return this.courseService.deleteAll();
  }
}
