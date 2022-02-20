import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddDto, UpdateStatusDto, UpdateTextDto } from './dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAll() {
    return this.todoService.getAll();
  }

  @Post()
  add(@Body() dto: AddDto) {
    return this.todoService.add(dto);
  }

  @Patch(':id')
  @HttpCode(204)
  updateText(@Param('id') id: string, @Body() dto: UpdateTextDto) {
    return this.todoService.updateText(id, dto);
  }

  @Patch(':id/status')
  @HttpCode(204)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.todoService.updateStatus(id, dto);
  }

  @Delete()
  @HttpCode(204)
  deleteAll() {
    return this.todoService.deleteAll();
  }

  @Delete('done')
  @HttpCode(204)
  deleteDone() {
    return this.todoService.deleteDone();
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
