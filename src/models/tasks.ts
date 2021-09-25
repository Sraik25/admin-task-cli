/* _list:
 * {'uuid-131112321-1123131-2' : {id: 12, desc: 'asd', completed: 23132123}}
 * {'uuid-131112321-1123131-2' : {id: 12, desc: 'asd', completed: 23132123}}
 * {'uuid-131112321-1123131-2' : {id: 12, desc: 'asd', completed: 23132123}}
 */

import Task from './task';

export interface ITask {
  id: string;
  desc: string;
  completed: string | null;
}

interface IMessage extends Partial<ITask> {
  idx: string;
  status: string;
}
interface ITaskBD {
  [id: string]: ITask;
}

class Tasks {
  _list: ITaskBD = {};

  get listArray(): ITask[] {
    const list: ITask[] = [];

    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id: string): void {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray = (tasks: Task[] = []): void => {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  };

  createTask(desc: string = ''): void {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  formatedMessage({ idx, desc, status, completed }: IMessage, all: boolean) {
    if (all) {
      console.log(`${idx} ${desc} :: ${status}`);
    } else {
      console.log(`${idx} ${desc} :: ${completed ? completed.green : status}`);
    }
  }

  formatedList(data: ITask[], all = true): void {
    data.map((task, index) => {
      const idx = `${index + 1}`.green;
      const { desc, completed } = task;
      const status = completed ? 'Completado'.green : 'Pendiente'.red;

      this.formatedMessage({ idx, desc, status, completed }, all);
    });
  }

  listCompleted(): void {
    const listTaskFormated = [...this.listArray];

    this.formatedList(listTaskFormated);
  }

  listCompletedPending(complete = true): void {
    const listTaskFormated = [...this.listArray];

    const completeList = listTaskFormated.filter((list) =>
      complete ? list.completed !== null : list.completed === null
    );

    if (completeList.length > 0) {
      this.formatedList(completeList, false);
    } else {
      console.log(`No tiene tareas ${complete ? 'completadas' : 'pendientes'}`);
    }
  }

  toggleCompleted(ids: Array<string> = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completed) {
        task.completed = new Date().toISOString();
      }
    });

    this.listArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completed = null;
      }
    });
  }
}

export default Tasks;
