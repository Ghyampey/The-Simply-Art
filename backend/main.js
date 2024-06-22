// require('dotenv').config();
// const express = require('express');
// const helmet = require('helmet');
// const fileUpload = require('express-fileupload');
// const { forEach } = require('./routes/Index');
// const connectDB = require('./db/Connect');
// const notFound = require('./middleware/NofFound');
// const errorHandlerMiddleware = require('./middleware/ErrorHandler');
// const cors = require('cors');

// const app = express();

// // Use helmet to set the Referrer Policy
// app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));

// // Middleware
// app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000', 
// }));

// app.use(express.json());
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// forEach((route) => {
//     app[route.method](route.path, route.handler);
// });

// app.use(notFound);
// app.use(errorHandlerMiddleware);
// app.use(
//     fileUpload({
//         useTempFiles: true,
//     })
// );

// app.use('/api/admin', require('./routes/admin'));

// const port = process.env.PORT || 5000;

// const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tsa');
//         app.listen(port, () => console.log(`Server is listening on port ${port}...`));
//     } catch (error) {
//         console.log(error);
//     }
// };

// start();

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
require('express-async-errors');
const fileUpload = require('express-fileupload');
const routes = require('./routes/Index');
const connectDB = require('./db/Connect');
const notFound = require('./middleware/NofFound');
const errorHandlerMiddleware = require('./middleware/ErrorHandler');
const cors = require('cors');

const app = express();

// Use helmet to set the Referrer Policy
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
}));

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/admin', require('./routes/admin'));

// Validate and set up routes
const validMethods = ['get', 'post', 'put', 'delete', 'patch'];

routes.forEach((route) => {
    const { path, method, handler } = route;
    if (!validMethods.includes(method)) {
        console.error(`Invalid method ${method} for path ${path}`);
        return;
    }
    if (Array.isArray(handler)) {
        app[method](path, ...handler);
    } else {
        app[method](path, handler);
    }
});

app.use(notFound);
app.use(errorHandlerMiddleware);
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tsa');
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
