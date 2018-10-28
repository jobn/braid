import normalize from './normalize';

describe('normalize', () => {
  it('normalizes response', () => {
    const iterationResponse = [
      {
        number: 2,
        project_id: 99,
        length: 1,
        team_strength: 1,
        stories: [
          {
            kind: 'story',
            id: 563,
            created_at: '2018-09-25T12:01:00Z',
            updated_at: '2018-09-25T12:01:00Z',
            accepted_at: '2018-09-25T12:00:05Z',
            estimate: 3,
            story_type: 'feature',
            name: 'Complete construction of the Expeditionary Battle Planetoid',
            description:
              'Palpatine was impressed with the PoC, make this one bigger',
            current_state: 'accepted',
            requested_by_id: 102,
            external_id: 'abc123',
            integration_id: 30,
            url: 'http://localhost/story/show/563',
            project_id: 99,
            owner_ids: [102, 101],
            labels: [
              {
                id: 2009,
                project_id: 99,
                kind: 'label',
                name: 'plans',
                created_at: '2018-09-25T12:01:00Z',
                updated_at: '2018-09-25T12:01:00Z'
              }
            ],
            owned_by_id: 102
          },
          {
            kind: 'chore',
            id: 564,
            created_at: '2018-09-25T12:24:00Z',
            updated_at: '2018-09-25T12:24:00Z',
            accepted_at: '2018-09-26T12:00:05Z',
            estimate: 3,
            story_type: 'feature',
            name: 'Test the Expeditionary Battle Planetoid',
            description: 'Blow upp some stuff',
            current_state: 'accepted',
            requested_by_id: 102,
            external_id: 'abc123',
            integration_id: 30,
            url: 'http://localhost/story/show/564',
            project_id: 99,
            owner_ids: [102],
            labels: [
              {
                id: 2009,
                project_id: 99,
                kind: 'label',
                name: 'plans',
                created_at: '2018-09-25T12:01:00Z',
                updated_at: '2018-09-25T12:01:00Z'
              }
            ],
            owned_by_id: 102
          }
        ],
        start: '2018-09-25T12:01:00Z',
        finish: '2018-09-25T12:00:10Z',
        kind: 'iteration'
      }
    ];

    const membershipsResponse = [
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

    const result = {
      iteration: {
        finish: '2018-09-25T12:00:10Z',
        kind: 'iteration',
        length: 1,
        number: 2,
        project_id: 99,
        start: '2018-09-25T12:01:00Z',
        team_strength: 1
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
      stories: [
        {
          accepted_at: '2018-09-25T12:00:05Z',
          created_at: '2018-09-25T12:01:00Z',
          current_state: 'accepted',
          description:
            'Palpatine was impressed with the PoC, make this one bigger',
          estimate: 3,
          external_id: 'abc123',
          id: 563,
          integration_id: 30,
          kind: 'story',
          labels: [
            {
              created_at: '2018-09-25T12:01:00Z',
              id: 2009,
              kind: 'label',
              name: 'plans',
              project_id: 99,
              updated_at: '2018-09-25T12:01:00Z'
            }
          ],
          name: 'Complete construction of the Expeditionary Battle Planetoid',
          owned_by_id: 102,
          owner_ids: [102, 101],
          project_id: 99,
          requested_by_id: 102,
          story_type: 'feature',
          updated_at: '2018-09-25T12:01:00Z',
          url: 'http://localhost/story/show/563'
        },
        {
          kind: 'chore',
          id: 564,
          created_at: '2018-09-25T12:24:00Z',
          updated_at: '2018-09-25T12:24:00Z',
          accepted_at: '2018-09-26T12:00:05Z',
          estimate: 3,
          story_type: 'feature',
          name: 'Test the Expeditionary Battle Planetoid',
          description: 'Blow upp some stuff',
          current_state: 'accepted',
          requested_by_id: 102,
          external_id: 'abc123',
          integration_id: 30,
          url: 'http://localhost/story/show/564',
          project_id: 99,
          owner_ids: [102],
          labels: [
            {
              id: 2009,
              project_id: 99,
              kind: 'label',
              name: 'plans',
              created_at: '2018-09-25T12:01:00Z',
              updated_at: '2018-09-25T12:01:00Z'
            }
          ],
          owned_by_id: 102
        }
      ],
      uniqueOwnerIds: [102, 101]
    };

    expect(normalize({ iterationResponse, membershipsResponse })).toEqual(
      result
    );
  });
});
