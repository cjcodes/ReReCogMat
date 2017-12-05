export const LOADING = 'conversation/LOADING';
export const LOADED = 'conversation/LOADED';
export const UNLOAD = 'conversation/UNLOAD';
export const UPDATE = 'conversation/UPDATE';
export const UPDATE_SUCCESS = 'conversation/UPDATE_SUCCESS';
export const UPDATE_FAILED = 'conversation/UPDATE_FAILED';
export const UPDATE_MESSAGE = 'conversation/UPDATE_MESSAGE';

const defaultState = {
  loading: false,
  messages: {},
  tree: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {

    case LOADING:
      return {
        loading: true,
      };
    case LOADED:
      return {
        loading: false,
        ...action.conversation,
      };
    case UNLOAD:
      return defaultState;

    case UPDATE_MESSAGE:
      let m = state.messages;
      m[action.index] = {
        ...m[action.index],
        ...action.message,
      };

      return {
        ...state,
        messages: m,
      };
    default:
      return state;
  }
};

const messages = {
  '1': {
    text: 'Outbound message one. Reply ONE or TWO.',
    replies: [
      { text: 'banana', id: '2' },
      { text: 'ninja', id: '3' },
    ],
  },
  '2': {
    parent: '1',
    text: 'Outbound branch 1',
    replies: [
      { text: 'reply' },
    ],
  },
  '3': {
    parent: '2',
    text: 'Outbound branch 2',
    replies: [
      { text: 'one', id: '4' },
      { text: 'two', id: '5' },
    ],
  },
  '4': {
    parent: '3',
    text: 'Outbound 2.1',
    replies: [
      { text: 'reply' },
    ],
  },
  '5': {
    parent: '3',
    text: 'Outbound 2.2',
    replies: [
      { text: 'reply' },
    ],
  },
  '6': {
    text: 'Closure',
    replies: null,
  }
};

export const load = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING,
    });

    setTimeout(() => {
      dispatch({
        type: LOADED,
        conversation: {
          messages,
        }
      });
    }, 0);
  }
}

export const unload = () => ({
  type: UNLOAD,
});

export const updateMessage = (index, message) => ({
  type: UPDATE_MESSAGE,
  index,
  message,
});
