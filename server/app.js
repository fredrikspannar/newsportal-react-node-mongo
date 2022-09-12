import express from "express";
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import * as dotenv from "dotenv";
dotenv.config();

// setup app and middleware
const app = express();

//app.use(helmet());
app.use(compression());    
app.use(cookieParser());

app.use(express.json());

// setup routes
import authRoute from "./routes/auth.js";
import articleRoute from "./routes/articles.js";
import categoryRoute from "./routes/categories.js";
import profileRoute from "./routes/profile.js";

app.use(authRoute);
app.use(articleRoute);
app.use(categoryRoute);
app.use(profileRoute);

// swagger doc ( if development )
if ( process.env.NODE_ENV === 'development' ) {
    // firefox may block loading of needed scripts because
    // of 'Content-Security-Policy'
    app.use(function (req, res, next) {
        res.setHeader(
          'Content-Security-Policy',
          "default-src 'self'; font-src 'self'; img-src 'self' data: validator.swagger.io; script-src 'self' https: 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src 'self'"
        );
        next();
      });

    const swaggerOptions = {
        definition: {
          openapi: '3.0.0',
          info: {
            title: process.env.SWAGGER_API_NAME || 'Set env SWAGGER_API_NAME',
            version: process.env.SWAGGER_API_VERSION || 'Set env SWAGGER_API_VERSION',
          },
        },
        apis: ['./routes/*'], 
      };

      var options = {
        staticCSP: true,
          customCss: 'input:disabled, .try-out { display: none !important; }'
      };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
}

// default route to 404 not found if no other matches
app.use((req, res) => {
    res.status(404).send();
});

export default app;