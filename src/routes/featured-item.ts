import { Express } from 'express';

import { CS571Route } from "@cs571/api-framework";
import { CS571FeaturedSaleItemMapper } from '../model/services/feature-mapper';
import { DayOfWeek } from '../model/day-of-week';

export class CS571FeaturedSaleItemRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = (process.env['CS571_BASE_PATH'] ?? "") + '/featured-item';

    private readonly featureMapper: CS571FeaturedSaleItemMapper;

    public constructor(featureMapper: CS571FeaturedSaleItemMapper) {
        this.featureMapper = featureMapper;
    }

    public addRoute(app: Express): void {
        app.get(CS571FeaturedSaleItemRoute.ROUTE_NAME, (req, res) => {
            let day = req.query.day as string;
            if (!day) {
                res.status(200).send(this.featureMapper.getFeaturedSaleItem());
            } else {
                day = day.trim().toLowerCase();
                if (['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(day)) {
                    res.status(200).send(this.featureMapper.getFeaturedSaleItemOnDay((day[0].toUpperCase() + day.slice(1)) as DayOfWeek));
                } else {
                    res.status(400).send({msg: "A valid day includes 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', or 'Saturday'"});
                }
            }
            
        })
    }

    public getRouteName(): string {
        return CS571FeaturedSaleItemRoute.ROUTE_NAME;
    }


}