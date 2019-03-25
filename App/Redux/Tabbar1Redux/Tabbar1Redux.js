import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tabbar1Status: ['tabbar1Status']
})

export const Tabbar1Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  tabbar1Status: 'first'
})

/* ------------- Reducers ------------- */
export const tabbar1Status = (state, action) => ({ ...state, tabbar1Status: action.tabbar1Status })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TABBAR1_STATUS]: tabbar1Status
})