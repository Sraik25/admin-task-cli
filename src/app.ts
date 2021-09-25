import 'colors';
import {
  confirm,
  inquirerMenu,
  pause,
  readInput,
  listTaskDelete,
  showListCheckBox,
} from './helpers/inquirer';
import { readDB, saveDB } from './helpers/saveFile';
import Tasks from './models/tasks';

console.clear();

const main = async (): Promise<void> => {
  let option = '';

  const tasks = new Tasks();
  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    option = await inquirerMenu();

    switch (option) {
      case '1':
        const desc = await readInput('Descripción: ');
        tasks.createTask(desc);
        break;

      case '2':
        tasks.listCompleted();
        break;

      case '3':
        tasks.listCompletedPending();
        break;

      case '4':
        tasks.listCompletedPending(false);
        break;

      case '5':
        const ids = await showListCheckBox(tasks.listArray);
        tasks.toggleCompleted(ids);
        console.log(ids);
        break;

      case '6':
        const id = await listTaskDelete(tasks.listArray);
        if (id !== '0') {
          const ok = await confirm('¿Desea eliminar esa tarea?');
          if (ok) {
            tasks.deleteTask(id);
          }
        }
        break;

      default:
        break;
    }

    saveDB(tasks.listArray);

    await pause();
  } while (option !== '0');
};

main();
