import BusinessService from '../service/business-service.mjs';
import { readContacts, readListings } from '../datasource/data-reader.mjs';
import debugLog from '../lib/logger.utility.mjs';

async function businessService() {
  const bs = new BusinessService();
  let response = await bs.getAvgPricePerList();
  debugLog(`getAvgPricePerList  ${JSON.stringify(response)}`);

  response = await bs.getMakePercent();
  debugLog(`getMakePercent ${JSON.stringify(response)}`);

  response = await bs.getTop30Total(0.3);
  debugLog(`getTop30Total ${response}`);

  response = await bs.getTop5PerMonth();
  debugLog(`getTop5PerMonth ${JSON.stringify(response)}`);
}


async function reader() {
  const res = await readContacts();
  debugLog(`readContacts entries ${JSON.stringify(res)}`);

  const res1 = await readListings();
  debugLog(`readListings enteries ${JSON.stringify(res1)}` );
}

async function executeService() {
  let commandExecutor =  {
    service: businessService,
    reader: reader,
  };
  commandExecutor[process.argv[2]]();
}
executeService();