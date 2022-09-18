const BUFFER_DIR = './data/buffer/'

import fs from 'fs';
import path from 'path';

fs.readdir(BUFFER_DIR, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(BUFFER_DIR, file), err => {
      if (err) throw err;
    });
  }
  console.log('All buffers has been cleared');
});