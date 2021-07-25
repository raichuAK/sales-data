import * as DataReader from '../datasource/data-reader.mjs';
import debugLog from '../lib/logger.utility.mjs';

class AppCache {
  
  constructor() {
    if (AppCache.instance) {
      AppCache.instance = this;
    }
    return AppCache.instance;
  }

  getContactsData() {
    if (!this.contactsData) {
      debugLog('contactsData Cache is empty');
      this.contactsData = DataReader.readContacts();
    }else {
      debugLog('contactsData Cache is warm');
    }
    return this.contactsData;
  }

  getListingsData() {
    if (!this.listingsData) {
      debugLog('listingsData Cache is empty');
      this.listingsData = DataReader.readListings();
    } else {
      debugLog('listingsData Cache is warm');
    }
    return this.listingsData;
  }
}
const Cache = new AppCache();

export default Cache;
