import {
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { AuthGuard } from '../user/guard/auth.guard';

@Controller('course')
@ApiTags('course-controller')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create/:nameCourse')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  createCourse(@Request() req, @Param('nameCourse') nameCourse: string) {
    const { username } = req.user;

    return this.courseService.createCourse(username, nameCourse);
  }

  @Get('getCourses')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  getCoursesByUser(@Request() req) {
    const { username } = req.user;

    return this.courseService.getCoursesByUser(username);
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
