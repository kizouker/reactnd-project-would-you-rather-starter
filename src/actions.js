import {ACTION_POST_QUESTION, ACTION_UPDATE_STATISTICS, 
  ACTION_UPDATE_LIST, ACTION_UPDATE_LEADERBOARD} from './actionTypes'

/**
 * Action creators
 */

export function updateStatistics(text) {
  return { type: ACTION_UPDATE_STATISTICS, text }
}
export function updateList(text) {
  return { type: ACTION_UPDATE_LIST, text }
}
export function updateLeaderboard(text) {
  return { type: ACTION_UPDATE_LEADERBOARD, text }
}
