const cron = require("node-cron");
const sendText = require("./sendText");
const { Investment } = require('../db/models');
const investmentTypes = require('./investmentTypes');

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

cron.schedule("0 * * * *", async () => {
  try {

    const investments = await Investment.findAll();

    for (const [type, data] of Object.entries(investmentTypes)) {

      const newRate = random(data.rates)

      if (!newRate) continue;

      await Investment.update(
        {
            dailyRate: newRate
        },
        {
            where: {type}
        }
      );

      await sendText (
        `${type} daily rate updated to ${newRate}`
      )
    }

    console.log("Daily investment rates updated");

  } catch (err) {
    console.error(err);
  }
});
