import { normalize } from './normalize';

jest.mock('./utils/getDayOfYear');

export const iterationResponse = [
  {
    number: 2,
    projectId: 99,
    length: 1,
    teamStrangth: 1,
    stories: [
      {
        kind: 'story',
        id: 563,
        createdAt: '2018-09-25T12:01:00Z',
        updatedAt: '2018-09-25T12:01:00Z',
        acceptedAt: '2018-09-25T12:00:05Z',
        estimate: 3,
        storyType: 'feature',
        name: 'Complete construction of the Expeditionary Battle Planetoid',
        description:
          'Palpatine was impressed with the PoC, make this one bigger',
        currentState: 'accepted',
        requestedById: 102,
        externalId: 'abc123',
        integrationId: 30,
        url: 'http://localhost/story/show/563',
        projectId: 99,
        ownerIds: [102, 101],
        labels: [
          {
            id: 2009,
            projectId: 99,
            kind: 'label',
            name: 'plans',
            createdAt: '2018-09-25T12:01:00Z',
            updatedAt: '2018-09-25T12:01:00Z'
          }
        ],
        ownedById: 102
      },
      {
        kind: 'chore',
        id: 564,
        createdAt: '2018-09-25T12:24:00Z',
        updatedAt: '2018-09-25T12:24:00Z',
        acceptedAt: '2018-09-26T12:00:05Z',
        estimate: 3,
        storyType: 'feature',
        name: 'Test the Expeditionary Battle Planetoid',
        description: 'Blow upp some stuff',
        currentState: 'accepted',
        requestedById: 102,
        externalId: 'abc123',
        integrationId: 30,
        url: 'http://localhost/story/show/564',
        projectId: 99,
        ownerIds: [102, 100000],
        labels: [
          {
            id: 2009,
            projectId: 99,
            kind: 'label',
            name: 'plans',
            createdAt: '2018-09-25T12:01:00Z',
            updatedAt: '2018-09-25T12:01:00Z'
          }
        ],
        ownedById: 102
      }
    ],
    start: '2018-09-25T12:01:00Z',
    finish: '2018-09-25T12:00:10Z',
    kind: 'iteration'
  }
];

export const membershipsResponse = [
  {
    person: {
      kind: 'person',
      id: 100,
      name: 'Emperor Palpatine',
      email: 'emperor@galacticrepublic.gov',
      initials: 'EP',
      username: 'palpatine'
    }
  },
  {
    person: {
      kind: 'person',
      id: 101,
      name: 'Darth Vader',
      email: 'vader@deathstar.mil',
      initials: 'DV',
      username: 'vader'
    }
  },
  {
    person: {
      kind: 'person',
      id: 102,
      name: 'Wilhuff Tarkin',
      email: 'governor@eriadu.gov',
      initials: 'WT',
      username: 'tarkin'
    }
  }
];

export const result = {
  iteration: {
    finish: '2018-09-25T12:00:10Z',
    kind: 'iteration',
    length: 1,
    number: 2,
    projectId: 99,
    start: '2018-09-25T12:01:00Z',
    teamStrangth: 1
  },
  people: {
    100: {
      email: 'emperor@galacticrepublic.gov',
      id: 100,
      initials: 'EP',
      kind: 'person',
      name: 'Emperor Palpatine',
      username: 'palpatine'
    },
    101: {
      email: 'vader@deathstar.mil',
      id: 101,
      initials: 'DV',
      kind: 'person',
      name: 'Darth Vader',
      username: 'vader'
    },
    102: {
      email: 'governor@eriadu.gov',
      id: 102,
      initials: 'WT',
      kind: 'person',
      name: 'Wilhuff Tarkin',
      username: 'tarkin'
    }
  },
  stories: {
    563: {
      acceptedAt: '2018-09-25T12:00:05Z',
      createdAt: '2018-09-25T12:01:00Z',
      currentState: 'accepted',
      blockers: [],
      description: 'Palpatine was impressed with the PoC, make this one bigger',
      estimate: 3,
      externalId: 'abc123',
      id: 563,
      integrationId: 30,
      kind: 'story',
      labels: [
        {
          createdAt: '2018-09-25T12:01:00Z',
          id: 2009,
          kind: 'label',
          name: 'plans',
          projectId: 99,
          updatedAt: '2018-09-25T12:01:00Z'
        }
      ],
      name: 'Complete construction of the Expeditionary Battle Planetoid',
      ownedById: 102,
      ownerIds: [102, 101],
      projectId: 99,
      requestedById: 102,
      storyType: 'feature',
      updatedAt: '2018-09-25T12:01:00Z',
      url: 'http://localhost/story/show/563'
    },
    564: {
      kind: 'chore',
      id: 564,
      createdAt: '2018-09-25T12:24:00Z',
      updatedAt: '2018-09-25T12:24:00Z',
      acceptedAt: '2018-09-26T12:00:05Z',
      estimate: 3,
      blockers: [],
      storyType: 'feature',
      name: 'Test the Expeditionary Battle Planetoid',
      description: 'Blow upp some stuff',
      currentState: 'accepted',
      requestedById: 102,
      externalId: 'abc123',
      integrationId: 30,
      url: 'http://localhost/story/show/564',
      projectId: 99,
      ownerIds: [102],
      labels: [
        {
          id: 2009,
          projectId: 99,
          kind: 'label',
          name: 'plans',
          createdAt: '2018-09-25T12:01:00Z',
          updatedAt: '2018-09-25T12:01:00Z'
        }
      ],
      ownedById: 102
    }
  },
  storyIds: [563, 564],
  uniqueOwnerIds: [102, 101]
};

describe('normalize', () => {
  it('normalizes response', () => {
    expect(normalize({ iterationResponse, membershipsResponse })).toEqual(
      result
    );
  });
});
