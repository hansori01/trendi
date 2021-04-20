import { cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { tweetContext } from '../States/TweetStateProvider'

import SentiBarChart from '../LeftDatas/BarChart';

afterEach(cleanup);

const tweets = [
  {
    sentiment: { score: 1 }
  },
];

const tweetScores = {
  veryNeg: 0,
  neg: 0,
  slightNeg: 0,
  neutral: 0,
  slightPos: 0,
  pos: 0,
  veryPos: 0
};

// create mock useEffect to set init state
test("non-shallow render", () => {
    const element = new TestRenderer.create(
        <tweetContext.Provider value={tweets, tweetScores}>
            <SentiBarChart />
        </tweetContext.Provider>
    );
    expect(element.root.findByType("div").children).toEqual(['Provided Value']);
});