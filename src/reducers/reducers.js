import { combineReducers } from 'redux';
/*
The combineReducers helper function turns an object whose
values are different reducing functions into a single reducing
function you can pass to createStore.
*/

import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from '../actions/actions';

/*
Using switch
In the following example, if expr evaluates to "Bananas",
the program matches the value with case "Bananas" and executes
the associated statement.
When break is encountered, the program breaks out of switch
and executes the statement following  switch.
If break were omitted, the statement for case "Cherries"
would also be executed.

switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Apples':
    console.log('Apples are $0.32 a pound.');
    break;
  case 'Bananas':
    console.log('Bananas are $0.48 a pound.');
    break;
  case 'Cherries':
    console.log('Cherries are $3.00 a pound.');
    break;
  case 'Mangoes':
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    break;
  default:
    console.log('Sorry, we are out of ' + expr + '.');
}
switch('Bananas') // Bananas are $0.48 a pound.
console.log("Is there anything else you'd like?");
*/

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
    //  Can I put a default between cases?
    // Yes you can! JavaScript will drop you back to the default
    // if it can't find a match
      return state
  }
}

function posts (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
)
