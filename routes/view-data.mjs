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
  return Number(value).toLocaleString('nl-NL', {minimumFractionDigits: 2});
}

export async function avgPriceListFormatter(input) {
  const output = [];
  for (let sellerType in input) {
    output.push({
      sellerType: sellerType,
      avg: currencyFormatter(Math.round(input[sellerType].avg))
    });
  }
  return output;
}

export async function makePercentFormatter(input) {
  let output = [];
  for (let make in input) {
    output.push({
      make: make,
      percent: input[make].percent
    });
  }
  output.sort((a, b) =>  b.percent - a.percent );
  output = output.map(elem => {
    return { 
      make: elem.make,
      percent: percentFormatter(Math.round(elem.percent))
    };
  });
  return output;
}

export async function top5PerMonthFormatter(input) {
  const listingsData = await Cache.getListingsData();
    const resultMap = [];
    for(let monYearMap of input) {
        let subArray = []; let ranking = 0;
          for(let contact of monYearMap[1]) {
            const listing = listingsData.find(elem => elem.id === contact[0]);
            if(listing) {
              ranking = ranking + 1;
              subArray.push([ ranking, contact[0], listing.make, currencyFormatter(Math.round(listing.price)), `${numberFormatter(listing.mileage)} KM`, contact[1] ]);
            } else {
              console.warn(`Listing ${contact[0]} not prsent in listings`);
            }
            if(ranking === 5 ) {
              break;
            }
          }
      resultMap.push([monYearMap[0], subArray]);
    }
  return resultMap;
}
