import { writeFileSync } from 'fs';

const saveDB = (data: any) => {
  const file = './db/data.txt';
  writeFileSync(file, JSON.stringify(data));
};

export { saveDB };
