import * as migration_20260615_133734_baseline from './20260615_133734_baseline'

export const migrations = [
  {
    up: migration_20260615_133734_baseline.up,
    down: migration_20260615_133734_baseline.down,
    name: '20260615_133734_baseline',
  },
]
