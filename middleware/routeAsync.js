// Not used - runing express-async-errors instead
module.exports = function (routeFunction){
    return async (req, res, next) => {
        try {
            await routeFunction(req, res);
        } catch (ex) {
            next(ex);
        }
    }
};