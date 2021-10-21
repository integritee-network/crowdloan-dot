import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  crowdLoanRunning: false
});

export const setCrowdLoanRunning = (s: string) => {
  setGlobalState('crowdLoanRunning', s);
};

export { useGlobalState };
