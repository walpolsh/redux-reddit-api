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
      return action.subreddit;
    default:

      //  Can I put a default between cases?
      // Yes you can! JavaScript will drop you back to the default
      // if it can't find a match
      return state;
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action
) {
  //The Object.assign() method only copies enumerable
  //and own properties from a source object to a target object.
  // It uses [[Get]] on the source and [[Set]] on the target,
  // so it will invoke getters and setters.
  //
  // if the action type matches the case then assign new state
  //merge future state and current state into a new object, push to curent state.

  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.recievedAt,
      });
    default:
      return state;
  };
};

//Multi-case - single operation

// This method takes advantage of the fact that if there is no break
// below a case statement it will continue to execute the next case
// statement regardless if the case meets the criteria.
//
// This is an example of a single operation sequential switch
// statement, where three different values perform exactly the same.

//We use ES6 computed property syntax so we can update
//state[action.subreddit] with Object.assign() in a concise way.

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),

        //extracted posts(state, action) that manages
        //the state of a specific post list
      });

    //is equivalent to this:
    // let nextState = {}
    // nextState[action.subreddit] = posts(state[action.subreddit], action)
    // return Object.assign({}, state, nextState)

    default:
      return state;
  };
};
