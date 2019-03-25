import React from 'react';
import { render, wait } from 'react-testing-library';
import { ProjectContainer } from './ProjectContainer';
import * as api from './api';
import {
  iterationResponse,
  membershipsResponse,
  result as normalizationResult
} from './normalize.test';

jest.mock('./utils/getDayOfYear');

const mockBlockers = [
  { id: 563, blockers: { resolved: false } },
  { id: 564, blockers: { resolved: true } }
];

let mockRender;

describe('ProjectContainer', () => {
  beforeEach(() => {
    api.getCurrentIteration = jest.fn(() => Promise.resolve(iterationResponse));
    api.getMemberships = jest.fn(() => Promise.resolve(membershipsResponse));
    api.getBlockers = jest.fn(() => Promise.resolve(mockBlockers));

    mockRender = jest.fn(() => <div>mockRender</div>);
  });

  it('fetches current iteration', async () => {
    render(<ProjectContainer id="1" render={() => <div />} />);

    await wait();
    expect(api.getCurrentIteration).toHaveBeenCalledWith('1');
  });

  it('fetches memberships', async () => {
    render(<ProjectContainer id="1" render={mockRender} />);

    await wait();
    expect(api.getCurrentIteration).toHaveBeenCalledWith('1');
  });

  it('fetches blockers', async () => {
    render(<ProjectContainer id="1" render={mockRender} />);

    await wait();
    expect(api.getBlockers).toHaveBeenCalledWith('1', [563, 564]);
  });

  it('second call to render function has fetched and normalized data', async () => {
    render(<ProjectContainer id="1" render={mockRender} />);

    await wait();
    await wait();
    expect(mockRender.mock.calls[1][0]).toEqual({
      ...normalizationResult,
      error: null,
      isFetching: false
    });
  });

  it('third call to render function has blockers', async () => {
    render(<ProjectContainer id="1" render={mockRender} />);

    await wait();
    await wait();
    await wait();
    expect(
      mockRender.mock.calls[2][0].stories.map(story => story.blockers)
    ).toEqual([{ resolved: false }, { resolved: true }]);
  });

  it('renders error on request error', async () => {
    api.getCurrentIteration = jest.fn(() =>
      Promise.reject(new Error('request error'))
    );

    const { container } = render(
      <ProjectContainer id="1" render={mockRender} />
    );

    await wait();
    expect(container.querySelector('div')).toHaveTextContent('Error');
  });
});
