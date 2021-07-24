import * as DataReader from '../datasource/data-reader.mjs';

class AppCache {
  constructor() {
    if (AppCache.instance) {
      AppCache.instance = this;
    }
    return AppCache.instance;
  }

  getContactsData() {
    if (!this.contactsData) {
      this.contactsData = DataReader.readContacts();
    }
    return this.contactsData;
  }

  getListingsData() {
    if (!this.listingsData) {
      console.warn('Cache is empty');
      this.listingsData = DataReader.readListings();
    }
    return this.listingsData;
  }
}
const Cache = new AppCache();

export default Cache;
