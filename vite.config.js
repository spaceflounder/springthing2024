import { resolve } from 'node:path';

export default {

  resolve: {
    alias: {
      '@infodom': resolve(__dirname, 'infodom'),
      '@game': resolve(__dirname, 'Game'),
      '#root': resolve(__dirname)
    }
  },
  base: './'

}
