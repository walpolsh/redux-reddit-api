/*
Here, the user can select a subreddit to display:
Actions are payloads of information that send data from your application
to your store. They are the only source of information for the store.
Actions are plain JavaScript objects.
Actions must have a type property that indicates
the type of action being performed.
Types should typically be defined as string constants.
Once your app is large enough, you may want to move them
into a separate module.



*/
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
};

/*Actions are plain JavaScript objects. Actions must have a type property that
//indicates the type of action being performed.
//Types should typically be defined as string constants.
//Once your app is large enough, you may want to move them into a separate module.
They can also press a “refresh” button to update it:*/

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function invalidateSubreddit(subreddit) {
  //pass in subreddit url
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
};

//These were the actions governed by the user interaction
//When it's time to fetch the posts for some subreddit,
// we will dispatch a REQUEST_POSTS action:

export const REQUEST_POSTS = 'REQUEST_POSTS';

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
};

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function requestPosts(subreddit) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
};
