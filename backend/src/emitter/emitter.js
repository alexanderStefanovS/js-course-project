
import EventEmitter from 'events';

let emitter;

export function getEmitter() {
  if (emitter) {
    return emitter;
  } else {
    emitter = new EventEmitter();
    return emitter;
  }
}
