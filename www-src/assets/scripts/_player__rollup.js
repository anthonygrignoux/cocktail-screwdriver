import { plyr } from 'plyr';

export function createPlayer() {
  plyr.setup(document.querySelectorAll('.js-player'), options);
}
