export enum TaskStatus {
  ToDo,
  InProgress,
  Done,
}

export class Task {
  constructor(
    public id: string,
    public task: string,
    public status: TaskStatus
  ) {}
}
