import { Injectable, NotFoundException } from '@nestjs/common';
import * as shortUUID from 'short-uuid';

import { AddDto, UpdateStatusDto, UpdateTextDto } from './dto';
import { TaskEntity } from './entities';

@Injectable()
export class TodoService {
  private todos: TaskEntity[] = [];

  getAll(): TaskEntity[] {
    return this.todos;
  }

  add(dto: AddDto) {
    const newTodo = new TaskEntity({
      id: shortUUID.generate(),
      isDone: false,
      ...dto,
    });
    this.todos.push(newTodo);
    return newTodo;
  }

  updateText(findID: string, dto: UpdateTextDto) {
    const findIndex = this.todos.findIndex(({ id }) => id === findID);
    if (findIndex < 0) {
      throw new NotFoundException();
    }

    this.todos[findIndex] = { ...this.todos[findIndex], text: dto.text };
  }

  updateStatus(findID: string, dto: UpdateStatusDto) {
    const findIndex = this.todos.findIndex(({ id }) => id === findID);
    if (findIndex < 0) {
      throw new NotFoundException();
    }

    this.todos[findIndex] = {
      ...this.todos[findIndex],
      isDone: dto.status === 'done',
    };
  }

  deleteAll() {
    this.todos = [];
  }

  delete(findID: string) {
    const findIndex = this.todos.findIndex(({ id }) => id === findID);
    if (findIndex < 0) {
      throw new NotFoundException();
    }

    this.todos = this.todos.filter(({ id }) => id !== findID);
  }

  deleteDone() {
    this.todos = this.todos.filter(({ isDone }) => !isDone);
  }
}
