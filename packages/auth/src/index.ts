import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ForcedSubject,
  MongoAbility,
} from '@casl/ability';

const actions = ['manage', 'invite', 'delete'] as const;
const subjects = ['user', 'all'];

type AppAbilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
];

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

const { build, can, cannot } = new AbilityBuilder(createAppAbility);

can('invite', 'user');
cannot('delete', 'user');

export const ability = build();
