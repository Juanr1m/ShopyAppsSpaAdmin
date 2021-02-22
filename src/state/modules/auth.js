import axios from 'axios'

export const state = {
  currentUser: getSavedState('auth.currentUser'),
  // currentUserId: getSavedState('auth.currentUserId'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state)
  },
  // SET_CURRENT_USER_ID(state, newValue) {
  //   state.userId = newValue
  //   saveState('auth.currentUserId', newValue)
  // },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { email, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    return axios
      .post('http://127.0.0.1:8000/api/users/auth/token/login/', {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.auth_token
        commit('SET_CURRENT_USER', token)
        return token
      })
    // .then(
    //   axios
    //     .get(
    //       'http://127.0.0.1:8000/api/users/auth/users/me/' +
    //         '?access_token=' +
    //         state.currentUser.token
    //     )
    //     .then((response) => {
    //       const userId = response.data.id
    //       commit('SET_CURRENT_USER_ID', userId)
    //       return userId
    //     })
    // )
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit('SET_CURRENT_USER', null)
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null)

    return axios
      .get('/api/session')
      .then((response) => {
        const user = response.data
        commit('SET_CURRENT_USER', user)
        return user
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null)
        } else {
          console.warn(error)
        }
        return null
      })
  },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.currentUser
    ? state.currentUser.token
    : ''
}
