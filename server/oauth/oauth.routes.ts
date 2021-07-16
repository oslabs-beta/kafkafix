import { Application, Request, Response } from 'express';
import { RouteConfig } from '../common/route.config';
import  axios  from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export class OAuthRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, 'OAuthRoutes');
    }
    routes() {
        /**
     * @desc    login user
        */
       
         this.app.get('/oauth', (req, res) => {
            res.redirect(
              `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
            );
          });
          
          this.app.get('/oauth-callback', ({ query: { code } }, res) => {
            const body = {
              client_id: process.env.GITHUB_CLIENT_ID,
              client_secret: process.env.GITHUB_SECRET,
              code,
            };
            const opts = { headers: { accept: 'application/json' } };
            axios
              .post('https://github.com/login/oauth/access_token', body, opts)
              .then((_res) => _res.data.access_token)
              .then((token) => {
              
                res.redirect(`/?token=${token}`);
              })
              .catch((err) => res.status(500).json({ err: err.message }));
          });
        return this.app;
    }
}
