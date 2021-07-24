import Cache from './app-cache.mjs';

async function sortByCount(input) {
  const sortArray = [];
  // eslint-disable-next-line
  for (const listingId in input) {
    sortArray.push([listingId, input[listingId].count]);
  }
  sortArray.sort((a, b) => b[1] - a[1]);
  return sortArray;
}

class BusinessService {
  async getAvgPricePerList() {
    const listingsData = await Cache.getListingsData();
    const resultMap = {
      private: {
        count: 0,
        total: 0,
        avg: 0,
      },
      dealer: {
        count: 0,
        total: 0,
        avg: 0,
      },
      other: {
        count: 0,
        total: 0,
        avg: 0,
      },
    };
    // eslint-disable-next-line
    for (const listing of listingsData) {
      const prevVal = resultMap[listing.seller_type];
      const newOccurenceCnt = prevVal.count + 1;
      const newTotal = prevVal.total + parseInt(listing.price, 10);
      const newAvg = newTotal / newOccurenceCnt;
      resultMap[listing.seller_type] = {
        count: newOccurenceCnt,
        total: newTotal,
        avg: newAvg,
      };
    }
    return resultMap;
  }

  async getMakePercent() {
    const listingsData = await Cache.getListingsData();
    const resultMap = {
    };
    const totalListing = listingsData.length;
    // eslint-disable-next-line
    for (const listing of listingsData) {
      const prevVal = resultMap[listing.make];

      if (!prevVal) {
        resultMap[listing.make] = {
          count: 1,
          percent: 1 / totalListing,
        };
      } else {
        const newOccurenceCnt = prevVal.count + 1;
        resultMap[listing.make] = {
          count: newOccurenceCnt,
          percent: (newOccurenceCnt / totalListing) * 100,
        };
      }
    }
    return resultMap;
  }

  async getTop30Total() {
    const contactsData = await Cache.getContactsData();
    const resultMap = { };
    const top30Count = contactsData.length * 0.3;
    // eslint-disable-next-line
    for (const contact of contactsData) {
      const prevVal = resultMap[contact.listing_id];

      if (!prevVal) {
        resultMap[contact.listing_id] = 1;
      } else {
        const newOccurenceCnt = prevVal + 1;
        resultMap[contact.listing_id] = newOccurenceCnt;
      }
    }
    const countSorted = await sortByCount(resultMap);
    const top30listings = []; let countTilltop30 = 0;
    // eslint-disable-next-line
    for (const listingCount of countSorted) {
      if (countTilltop30 < top30Count) {
        top30listings.push(listingCount[0]);
        countTilltop30 += listingCount[1];
      } else {
        break;
      }
    }
    let top30price = 0;
    const listingsData = await Cache.getListingsData();
    // eslint-disable-next-line
    for (const listingId of top30listings) {
    // eslint-disable-next-line
      for (const listing of listingsData) {
        if (listingId === listing.id) {
          top30price += parseInt(listing.price, 10);
          break;
        }
      }
    }
    return top30price / top30listings.length;
  }

  async getTop5PerMonth() {
    const contactsData = await Cache.getContactsData();
    const monYearMap = {};
    // eslint-disable-next-line
    for (const contact of contactsData) {
      const date = new Date(Number(contact.contact_date));
      const month = (date.getMonth() + 1) % 10 ? `0${(date.getMonth() + 1)}` : `${(date.getMonth() + 1)}`;
      const monYear = `${month}.${date.getFullYear()}`;
      const prevMonYearVal = monYearMap[monYear];
      if (!prevMonYearVal) {
        monYearMap[monYear] = {
          [contact.listing_id]: {
            count: 1,
          },
        };
      } else {
        const prevListingVal = prevMonYearVal[contact.listing_id];
        if (!prevListingVal) {
          monYearMap[monYear][contact.listing_id] = {
            count: 1,
          };
        } else {
          const newCount = prevListingVal.count + 1;
          monYearMap[monYear][contact.listing_id] = {
            count: newCount,
          };
        }
      }
    }
    const monYearResult = [];
    // eslint-disable-next-line
    for (const monYear in monYearMap) {
      const listingMap = monYearMap[monYear];
      // eslint-disable-next-line
      const sortArray = await sortByCount(listingMap);
      monYearResult.push([monYear, sortArray]);
    }
    monYearResult.sort((a, b) => a[0] - b[0]);
    return monYearResult;
  }
}

export default BusinessService;

async function test() {
  const bs = new BusinessService();
  let response = await bs.getAvgPricePerList();
  // console.log('getAvgPricePerList ', response);

  response = await bs.getMakePercent();
  // console.log('getMakePercent ', response);

  response = await bs.getTop30Total();
  // console.log('getTop30Total ', response);
  // eslint-disable-next-line
  response = await bs.getTop5PerMonth();
  // console.log('getTop5PerMonth ', JSON.stringify(response));
}
test();
