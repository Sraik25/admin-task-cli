import 'colors';
import { inquirerMenu, pause, readInput } from './helpers/inquirer';
import { saveDB } from './helpers/saveFile';
import Tasks from './models/tasks';

console.clear();

const main = async (): Promise<void> => {
  console.log('Hola Mundo');

  let option = '';

  const tasks = new Tasks();

  type ACTIONSTYPE = {
    [key: string]: () => string | void | Promise<void>;
  };

  const ACCIONS: ACTIONSTYPE = {
    '1': () => readInput('Descripción: '),
    '2': () => console.log(tasks._list),
  };

  do {
    option = await inquirerMenu();
    console.log({ option });

    // const data = ACCIONS[option] && await ACCIONS[option]() ;
    // console.log(data);

    switch (option) {
      case '1':
        const desc = await readInput('Descripción: ');
        console.log(desc);
        tasks.createTask(desc);
        break;

      case '2':
        console.log(tasks.listArray);
        break;
      default:
        break;
    }

    saveDB(tasks.listArray);

    await pause();
  } while (option !== '0');

  // pause();
};

main();
