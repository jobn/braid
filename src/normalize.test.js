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

export const epicsResponse = [
  {
    id: 7,
    kind: 'epic',
    created_at: '2019-08-06T12:00:00Z',
    updated_at: '2019-08-06T12:00:00Z',
    project_id: 99,
    name: 'Turn Luke Skywalker',
    url: 'http://localhost/epic/show/7',
    label: {
      id: 2010,
      project_id: 99,
      kind: 'label',
      name: 'turning luke',
      created_at: '2019-08-06T12:00:00Z',
      updated_at: '2019-08-06T12:00:00Z'
    }
  },
  {
    id: 6,
    kind: 'epic',
    created_at: '2019-08-06T12:00:00Z',
    updated_at: '2019-08-06T12:00:00Z',
    project_id: 99,
    name: 'Death Star Plans',
    url: 'http://localhost/epic/show/6',
    label: {
      id: 2009,
      project_id: 99,
      kind: 'label',
      name: 'plans',
      created_at: '2019-08-06T12:00:00Z',
      updated_at: '2019-08-06T12:00:00Z'
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
  epics: {
    2009: {
      id: 6,
      kind: 'epic',
      created_at: '2019-08-06T12:00:00Z',
      updated_at: '2019-08-06T12:00:00Z',
      project_id: 99,
      name: 'Death Star Plans',
      url: 'http://localhost/epic/show/6',
      label: {
        id: 2009,
        project_id: 99,
        kind: 'label',
        name: 'plans',
        created_at: '2019-08-06T12:00:00Z',
        updated_at: '2019-08-06T12:00:00Z'
      }
    },
    '-1': {
      id: -1,
      kind: 'epic',
      name: 'No Epic',
      label: { id: -1 }
    }
  },
  stories: {
    563: {
      acceptedAt: '2018-09-25T12:00:05Z',
      createdAt: '2018-09-25T12:01:00Z',
      currentState: 'accepted',
      blockers: [],
      tasks: [],
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
      tasks: [],
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
  uniqueOwnerIds: [102, 101],
  uniqueEpicIds: [2009, -1]
};

describe('normalize', () => {
  it('normalizes response', () => {
    expect(
      normalize({ iterationResponse, membershipsResponse, epicsResponse })
    ).toEqual(result);
  });
});
