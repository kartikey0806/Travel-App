import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { flights } from './flights';
import { bookings } from './bookings';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            flights,
            bookings
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
