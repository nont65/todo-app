export class TaskEntity {
  id: string;
  text: string;
  isDone: boolean;

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }
}
