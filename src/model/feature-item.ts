interface Nutrition {
    calories: number;
    protein?: string;
    fat?: string;
    carbohydrates?: string;
}

export default class FeatureItem {
    name: string;
    description: string;
    price: number;
    nutrition: Nutrition;

    constructor(
        name: string,
        description: string,
        price: number,
        nutrition: Nutrition
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.nutrition = nutrition;
    }
}