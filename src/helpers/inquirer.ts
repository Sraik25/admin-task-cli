import { prompt, QuestionCollection, Answers } from 'inquirer';
import 'colors';

const menuOptions: QuestionCollection = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tareas`,
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`,
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`,
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`,
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`,
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`,
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  // console.clear();

  console.log('==========================='.green);
  console.log(' Seleccione una opción'.green);
  console.log('==========================='.green);

  const { option } = await prompt(menuOptions);

  return option;
};

const pause = async () => {
  const question: QuestionCollection = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`,
    },
  ];

  await prompt(question);
};

const readInput = async (message: string) => {
  const question: QuestionCollection = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }

        return true;
      },
    },
  ];

  const { desc } = await prompt(question);

  return desc;
};

export { inquirerMenu, pause, readInput };
