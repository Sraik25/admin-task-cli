import 'colors';
import { resolve } from 'path/posix';
import { createInterface } from 'readline';

console.clear();

const showMenu = (): Promise<string> => {
  return new Promise<string>((resolve) => {
    console.clear();

    console.log('============================'.green);
    console.log(' Seleccione una opción'.green);
    console.log('============================\n'.green);

    console.log(`${'1.'.green} Crear tareas`);
    console.log(`${'2.'.green} Listar tareas`);
    console.log(`${'3.'.green} Listar tareas completadas`);
    console.log(`${'4.'.green} Listar tareas pendientes`);
    console.log(`${'5.'.green} Completar tarea(s)`);
    console.log(`${'6.'.green} Borrar tarea`);
    console.log(`${'0.'.green} Salir\n`);

    const readLine = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question('Seleccione una opción: ', (option) => {
      readLine.close();
      resolve(option);
    });
  });
};

const pause = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    const readLine = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`\nPresione ${'ENTER'.green} para continuar \n`, () => {
      readLine.close();
      resolve();
    });
  });
};

export { showMenu, pause };
