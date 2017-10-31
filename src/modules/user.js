export const SIGN_OUT = 'user/SIGN_OUT';
export const SIGN_UP = 'user/SIGN_UP';
export const SIGNED_UP = 'user/SIGNED_UP';
export const SIGN_UP_ERROR = 'user/ERROR';
export const AUTHENTICATE_REQUEST = 'user/AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'user/AUTHENTICATE_DONE';
export const AUTHENTICATE_FAILURE = 'user/AUTHENTICATE_ERROR';
export const VALIDATE = 'user/VALIDATE';
export const VALIDATE_DONE = 'user/VALIDATE_DONE';

const defaultState = {
  user: null,
  loading: true,
  checkedAuth: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {

    case SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    case VALIDATE_DONE:
      return {
        ...state,
        error: undefined,
        checkedAuth: true,
      };

    case SIGN_UP:
      return {
        ...state,
        user: null,
      };

    case SIGNED_UP:
      return {
        ...state,
        error: undefined,
        user: action.user,
        loading: false,
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case AUTHENTICATE_REQUEST:
      return {
        ...state,
        error: undefined,
        user: null
      };

    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.user,
        attributes: action.attributes,
        loading: false,
      };

    case AUTHENTICATE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}

export const signUp = (email, password, given_name, family_name, phone_number) => ({
  type: SIGN_UP,
  data: {
    email,
    password,
    given_name,
    family_name,
    phone_number,
  },
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const authenticate = (email, password) => ({
  type: AUTHENTICATE_REQUEST,
  email,
  password,
});

export const validateAuth = () => ({
  type: VALIDATE,
});
