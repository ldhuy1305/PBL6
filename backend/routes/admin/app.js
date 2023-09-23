const adminRoute = require('./admin');
const shipperRoute = require('./shipper');
const userRoute = require('./user');
const storeRoute = require('./store');
const approvalRoute = require('./approval');
function route(app){
    app.use('/',adminRoute);
    app.use('/shipper',shipperRoute);
    app.use('/user',userRoute);
    app.use('/store',storeRoute);
    app.use('/approval',approvalRoute);
}
module.exports = route