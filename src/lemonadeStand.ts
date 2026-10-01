export class LemonadeStand {
    private cash: number;

    private cups: number;
    private ice: number;
    private lemons: number;
    private sugar: number;

    // Amount of each supply needed to make one cup
    private readonly cupsPerLemonade = 1;
    private readonly icePerLemonade = 1;
    private readonly lemonsPerLemonade = 1;
    private readonly sugarPerLemonade = 1;

    constructor(startingCash: number) {
        this.cash = startingCash;

        this.cups = 0;
        this.ice = 0;
        this.lemons = 0;
        this.sugar = 0;
    }

    public getCash(): number {
        return this.cash;
    }

    public getInventory(): {
        cups: number;
        ice: number;
        lemons: number;
        sugar: number;
    } {
        return {
            cups: this.cups,
            ice: this.ice,
            lemons: this.lemons,
            sugar: this.sugar
        };
    }

    public buySupplies(
        cups: number,
        ice: number,
        lemons: number,
        sugar: number,
        prices: {
            cups: number;
            ice: number;
            lemons: number;
            sugar: number;
        }
    ): boolean {
        const totalCost =
            cups * prices.cups +
            ice * prices.ice +
            lemons * prices.lemons +
            sugar * prices.sugar;

        if (totalCost > this.cash) {
            return false;
        }

        this.cash -= totalCost;

        this.cups += cups;
        this.ice += ice;
        this.lemons += lemons;
        this.sugar += sugar;

        return true;
    }

    public getMaxLemonadeCups(): number {
        return Math.min(
            Math.floor(this.cups / this.cupsPerLemonade),
            Math.floor(this.ice / this.icePerLemonade),
            Math.floor(this.lemons / this.lemonsPerLemonade),
            Math.floor(this.sugar / this.sugarPerLemonade)
        );
    }
}

