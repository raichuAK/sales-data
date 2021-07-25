import BusinessService from '../service/business-service.mjs';
import {
  currencyFormatter,
  avgPriceListFormatter,
  makePercentFormatter,
  top5PerMonthFormatter,
} from '../routes/view-data.mjs';

describe('API testing', () => {
  test('should get getAvgPricePerList', async () => {
      const bs = new BusinessService();
      const avgPrice = await bs.getAvgPricePerList();
      const response = await avgPriceListFormatter(avgPrice);
      expect(response.length).toBe(3);
  });

  test('should get getMakePercent', async () => {
      const bs = new BusinessService();
  const avgPrice = await bs.getMakePercent();
  const response = await makePercentFormatter(avgPrice);
      expect(response.length).toBe(7);
  });

  test('should get getTop30Total', async () => {
     const bs = new BusinessService();
  const top30price = await bs.getTop30Total();
  const response = currencyFormatter(top30price);
      expect(response.length).toBe(7);
  });

  test('should get getTop5PerMonth', async () => {
     const bs = new BusinessService();
    const top5perMonth = await bs.getTop5PerMonth();
    const response = await top5PerMonthFormatter(top5perMonth);
    expect(response.length).toBe(6);
  });
});
