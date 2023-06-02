import { useReducer } from 'react';
import {
} from './actions';


export const reducer = (state, action) => {
  switch (action.type) {
     };
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
