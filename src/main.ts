import { LemonadeStand } from "./lemonadeStand";

const stand = new LemonadeStand(20);

const temperature = 85;

const prices = {
    cups: 0.05,
    ice: 0.02,
    lemons: 0.10,
    sugar: 0.03
};

console.log("Welcome to Lemonade Stand!");
console.log(`Today's temperature: ${temperature}°F`);

console.log("\nSupply prices:");
console.log(`Cups: $${prices.cups.toFixed(2)}`);
console.log(`Ice: $${prices.ice.toFixed(2)}`);
console.log(`Lemons: $${prices.lemons.toFixed(2)}`);
console.log(`Sugar: $${prices.sugar.toFixed(2)}`);

console.log("\nBuying supplies...");

const purchaseSuccessful = stand.buySupplies(
    20,
    20,
    20,
    20,
    prices
);

if (!purchaseSuccessful) {
    console.log("Not enough money to buy supplies.");
} else {
    console.log("Supplies purchased.");

    const lemonadePrice = 1.00;
    const cupsWantedToSell = 15;

    const cupsSold = stand.sellLemonade(
        cupsWantedToSell,
        lemonadePrice
    );

    console.log(`\nCups sold: ${cupsSold}`);
    console.log("Remaining inventory:", stand.getInventory());
    console.log(`Cash balance: $${stand.getCash().toFixed(2)}`);
}

