import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'


// middleware are added - orderwise
export default applyMiddleware(
    thunk,
    logger)
