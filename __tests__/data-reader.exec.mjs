import { readContacts, readListings } from '../datasource/data-reader.mjs';
import debugLog from '../lib/logger.utility.mjs';


async function test() {
  const res = await readContacts();
  debugLog('Enteries read ', res);

  const res1 = await readListings();
  debugLog('Enteries read ', res1);
}
test();