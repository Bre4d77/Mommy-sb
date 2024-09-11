const { getExchangeRate } = require('@tamtamchik/exchanger');
const moment = require('moment');

// Expanded list of major currencies
const allowedCurrencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'PKR',
  'RUB', 'BRL', 'ZAR', 'NZD', 'SGD', 'HKD', 'KRW', 'MXN', 'NOK', 'SEK',
  'TRY', 'AED', 'SAR', 'PLN', 'THB', 'IDR', 'MYR', 'PHP', 'CZK', 'HUF'
];

module.exports = {
  name: 'convert',
  async execute(message, args, config) {
    if (args.length !== 3) {
      const reply = await message.channel.send(`
❌ Incorrect usage. Please use: \`p convert <amount> <from_currency> <to_currency>\`
Example: \`p convert 100 USD EUR\`
Allowed currencies: ${allowedCurrencies.join(', ')}
      `);
      setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
      return;
    }

    const amount = parseFloat(args[0]);
    const fromCurrency = args[1].toUpperCase();
    const toCurrency = args[2].toUpperCase();

    if (isNaN(amount)) {
      const reply = await message.channel.send('❌ Invalid amount. Please provide a number.');
      setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
      return;
    }

    if (!allowedCurrencies.includes(fromCurrency) || !allowedCurrencies.includes(toCurrency)) {
      const reply = await message.channel.send(`❌ Invalid currency. Allowed currencies are: ${allowedCurrencies.join(', ')}`);
      setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
      return;
    }

    try {
      const rate = await getExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = (amount * rate).toFixed(2);

      const reply = await message.channel.send(`
${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}
      `);
      setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
    } catch (error) {
      console.error('Error fetching exchange rate:', error.message);
      const reply = await message.channel.send(`
⚠️ Error fetching exchange rate. Please try again later.

If the issue persists, check the currency codes or command format.
      `);
      setTimeout(() => reply.delete(), 5000); // Delete after 5 seconds
    }
  },
};
