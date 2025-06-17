import fs from 'fs'

import express, { Express } from 'express';
import cookies from "cookie-parser";

import { CS571DefaultSecretConfig, CS571Initializer } from '@cs571/api-framework'
import { CS571AllFeaturedItemsRoute } from './routes/all-featured-items';
import { CS571FeaturedSaleItemRoute } from './routes/featured-item';
import { CS571FeaturedSaleItemMapper } from './model/services/feature-mapper';

console.log("Welcome to HW3!");

const app: Express = express();

app.use(cookies());

const appBundle = CS571Initializer.init(app, {
  allowNoAuth: [],
  skipAuth: false
});

const featuredSaleItems = JSON.parse(fs.readFileSync("includes/featured-items.json").toString())
const featureMapper = new CS571FeaturedSaleItemMapper(featuredSaleItems);

appBundle.router.addRoutes([
  new CS571AllFeaturedItemsRoute(featuredSaleItems),
  new CS571FeaturedSaleItemRoute(featureMapper)
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});
