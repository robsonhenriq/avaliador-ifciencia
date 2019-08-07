import avaliacaoReducers from './avaliacao';
import { combineReducers } from 'redux';

export default combineReducers({
    avaliacoes: avaliacaoReducers
});