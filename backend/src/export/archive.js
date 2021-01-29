
import archiver from 'archiver';
import {EventEmitter} from 'events';
import {createWriteStream} from 'fs';
import {basename, resolve} from 'path';

const GENERATED_FILES_DIR = './generated-files';
const ARCHIVES_DIR = './archives';

export function archive(dirname) {
  dirname = basename(dirname);
  const archiveName = `${ARCHIVES_DIR}/${dirname}.zip`;

  const output = createWriteStream(archiveName);
  const archive = archiver('zip', {
    zlib: {level: 9}
  });

  const emitter = new EventEmitter();
  output.on('finish', () => {
    emitter.emit('archive-done', resolve(archiveName));
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(`${GENERATED_FILES_DIR}/${dirname}/`, false);
  
  return archive.finalize()
    .then(() => emitter);
}
