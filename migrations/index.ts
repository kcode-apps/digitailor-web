import * as migration_20250608_000000_sample from './20250608_000000_sample'

export const migrations = [
  {
    up: migration_20250608_000000_sample.up,
    down: migration_20250608_000000_sample.down,
    name: '20250608_000000_sample',
  },
]
