import { createInterface } from "readline";
import { LemonadeStand } from "./lemonadeStand";

const input = createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        input.question(question, resolve);
    });
}

function randomTemperature(): number {
    return Math.floor(Math.random() * 41) + 60;
}

function getDemand(temperature: number): number {
    if (temperature >= 90) {
        return 30;
    }

    if (temperature >= 80) {
        return 20;
    }

    if (temperature >= 70) {
        return 12;
    }

    return 5;
}
function generateSupplyPrices() {
    return {
        cups: Number((Math.random() * 0.06 + 0.03).toFixed(2)),
        ice: Number((Math.random() * 0.03 + 0.01).toFixed(2)),
        lemons: Number((Math.random() * 0.10 + 0.05).toFixed(2)),
        sugar: Number((Math.random() * 0.05 + 0.02).toFixed(2))
    };
}

async function main(): Promise<void> {
    const stand = new LemonadeStand(20);

    for (let day = 1; day <= 5; day++) {
        console.log(`\n========== DAY ${day} ==========`);

        const temperature = randomTemperature();

        console.log(`Today's temperature: ${temperature}°F`);

	const prices = generateSupplyPrices();

        console.log("\nSupply prices:");
        console.log(`Cups: $${prices.cups.toFixed(2)}`);
        console.log(`Ice: $${prices.ice.toFixed(2)}`);
        console.log(`Lemons: $${prices.lemons.toFixed(2)}`);
        console.log(`Sugar: $${prices.sugar.toFixed(2)}`);

        console.log(`\nCash available: $${stand.getCash().toFixed(2)}`);

        const cups = Number(await askQuestion("How many cups do you want to buy? "));
        const ice = Number(await askQuestion("How much ice do you want to buy? "));
        const lemons = Number(await askQuestion("How many lemons do you want to buy? "));
        const sugar = Number(await askQuestion("How much sugar do you want to buy? "));

        const purchaseSuccessful = stand.buySupplies(
            cups,
            ice,
            lemons,
            sugar,
            prices
        );

        if (!purchaseSuccessful) {
            console.log("You do not have enough money for those supplies.");
            console.log("You lose the day.");
            continue;
        }

        const lemonadePrice = Number(
            await askQuestion("How much will you charge per cup? $")
        );

	const potentialCustomers = getDemand(temperature);
	const cupsAvailable = stand.getMaxLemonadeCups();

	const priceFactor = Math.max(0, 1.2 - (lemonadePrice * 0.2));

	const customers = Math.floor(
    		potentialCustomers * priceFactor
	);

        const cupsSold = stand.sellLemonade(
            Math.min(customers, cupsAvailable),
            lemonadePrice
        );

        console.log("\n--- End of Day ---");
        console.log(`Customers who wanted lemonade: ${customers}`);
        console.log(`Cups sold: ${cupsSold}`);
        console.log("Remaining supplies:", stand.getInventory());
        console.log(`Cash balance: $${stand.getCash().toFixed(2)}`);
    }

    console.log("\n========== GAME OVER ==========");
    console.log(`Final cash: $${stand.getCash().toFixed(2)}`);

    input.close();
}

main();

