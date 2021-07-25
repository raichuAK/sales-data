import BusinessService from '../service/business-service.mjs';
import debugLog from '../lib/logger.utility.mjs';

async function test() {
  const bs = new BusinessService();
  let response = await bs.getAvgPricePerList();
  debugLog('getAvgPricePerList ', response);

  response = await bs.getMakePercent();
  debugLog('getMakePercent ', response);

  response = await bs.getTop30Total();
  debugLog('getTop30Total ', response);
  
  response = await bs.getTop5PerMonth();
  debugLog('getTop5PerMonth ', JSON.stringify(response));
}
test();