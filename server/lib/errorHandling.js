import {SERVER_ERROR} from './errors';

export default (err, res) => {
    if (err.message && err.statusCode) {
        res.status(err.statusCode).json(err);
    } else {
        res.status(SERVER_ERROR.statusCode).json(SERVER_ERROR);
    }
}