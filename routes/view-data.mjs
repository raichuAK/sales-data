import Cache from '../service/app-cache.mjs';

export function currencyFormatter(amount) {
  const formatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  });
  const amountFormat = formatter.format(amount);
  return `${amountFormat.split(',')[0]},-`;
}

function percentFormatter(value) {
  return `${value}%`;
}

function numberFormatter(value) {
  return Number(value).toLocaleString('nl-NL', { minimumFractionDigits: 2 });
}

export async function avgPriceListFormatter(input) {
  const output = [];
  // eslint-disable-next-line
  for (const sellerType in input) {
    output.push({
      sellerType,
      avg: currencyFormatter(Math.round(input[sellerType].avg)),
    });
  }
  return output;
}

export async function makePercentFormatter(input) {
  let output = [];
  // eslint-disable-next-line
  for (const make in input) {
    output.push({
      make,
      percent: input[make].percent,
    });
  }
  output.sort((a, b) => b.percent - a.percent);
  output = output.map(elem => ({
    make: elem.make,
    percent: percentFormatter(Math.round(elem.percent)),
  }));
  return output;
}

export async function top5PerMonthFormatter(input) {
  const listingsData = await Cache.getListingsData();
  const resultMap = [];
  // eslint-disable-next-line
  for (const monYearMap of input) {
    const subArray = [];
    let ranking = 0;
    // eslint-disable-next-line
    for (const contact of monYearMap[1]) {
      const listing = listingsData.find(elem => elem.id === contact[0]);
      if (listing) {
        ranking += 1;
        subArray.push([
          ranking,
          contact[0],
          listing.make,
          currencyFormatter(Math.round(listing.price)),
          `${numberFormatter(listing.mileage)} KM`,
          contact[1],
        ]);
      } else {
        console.debug(`Listing ${contact[0]} not prsent in listings`);
      }
      if (ranking === 5) {
        break;
      }
    }
    resultMap.push([monYearMap[0], subArray]);
  }
  return resultMap;
}
