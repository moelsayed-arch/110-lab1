import { LemonadeStand } from "./lemonadeStand";

const stand = new LemonadeStand(20);

const prices = {
    cups: 0.05,
    ice: 0.02,
    lemons: 0.10,
    sugar: 0.03
};

console.log("Starting cash:", stand.getCash());

const purchaseSuccessful = stand.buySupplies(
    10,
    10,
    10,
    10,
    prices
);

console.log("Purchase successful:", purchaseSuccessful);
console.log("Remaining cash:", stand.getCash());
console.log("Inventory:", stand.getInventory());
console.log("Possible lemonades:", stand.getMaxLemonadeCups());

