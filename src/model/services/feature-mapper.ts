import { DayOfWeek } from "../day-of-week";
import FeatureItem from "../feature-item";
import WeeklyMenu from "../weekly-feature";

export class CS571FeaturedSaleItemMapper {
    
    private readonly featureMapper: WeeklyMenu;

    public constructor(featureMapper: WeeklyMenu) {
        this.featureMapper = featureMapper;
    }

    public getFeaturedSaleItem(): FeatureItem {
        return this.featureMapper[this.getDayName()]
    }

    public getFeaturedSaleItemOnDay(day: DayOfWeek): FeatureItem {
        return this.featureMapper[day]
    }

    // https://stackoverflow.com/questions/57187691/javascript-how-to-verify-day-by-getday-when-using-timezone
    private getDayName(): DayOfWeek {
        return new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago",
            weekday: 'long'
        }) as DayOfWeek
    }
}