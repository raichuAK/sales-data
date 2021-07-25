export async function sortByCount(input) {
  const sortArray = [];
  // eslint-disable-next-line
  for (const listingId in input) {
    sortArray.push([listingId, input[listingId].count]);
  }
  sortArray.sort((a, b) => b[1] - a[1]);
  return sortArray;
}

export async function createMonthYearMap(contactsData) {
  const monYearMap = {};
  // eslint-disable-next-line
  for (const contact of contactsData) {
    const date = new Date(Number(contact.contact_date));
    const month = (date.getMonth() + 1) % 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
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
  return monYearMap;
}

export async function maptoSortedArray(monYearMap) {
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
