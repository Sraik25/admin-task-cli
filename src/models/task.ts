import { v4 as uuidV4 } from 'uuid';

class Task {
  id: string = '';
  desc: string = '';
  completed = null;

  constructor(desc: string) {
    this.id = uuidV4();
    this.desc = desc;
    this.completed = null;
  }
}

export default Task;
