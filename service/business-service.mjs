import Cache from './app-cache.mjs';
import * as Utility from './service.utility.mjs';

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
    const resultMap = {};
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

  async getTop30Total(percent) {
    const contactsData = await Cache.getContactsData();
    const top30Count = contactsData.length * percent;
    
    const contactsCountMap = await Utility.contactsCountMap(contactsData);
    const countSorted = await Utility.sortByCount(contactsCountMap);
    const top30listings = await Utility.top30Filter(countSorted, top30Count);

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
    const monYearMap = await Utility.createMonthYearMap(contactsData);
    const monYearResult = await Utility.maptoSortedArray(monYearMap);
    return monYearResult;
  }
}

export default BusinessService;
