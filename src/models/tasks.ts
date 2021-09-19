/* _list:
 * {'uuid-131112321-1123131-2' : {id: 12, desc: 'asd', completed: 23132123}}
 * {'uuid-131112321-1123131-2' : {id: 12, desc: 'asd', completed: 23132123}}
 * {'uuid-131112321-1123131-2' : {id: 12, desc: 'asd', completed: 23132123}}
 */

import Task from './task';

class Tasks {
  _list: any = {};

  get listArray(): any {
    const list: any = [];

    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  createTask(desc: string = '') {
    const task = new Task(desc);
    console.log(this);

    console.log({ task });

    this._list[task.id] = task;
  }
}

export default Tasks;
