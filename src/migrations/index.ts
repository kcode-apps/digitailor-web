import * as migration_20260609_115112_baseline from './20260609_115112_baseline';

export const migrations = [
  {
    up: migration_20260609_115112_baseline.up,
    down: migration_20260609_115112_baseline.down,
    name: '20260609_115112_baseline'
  },
];
