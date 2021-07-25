import * as fs from 'fs';
import * as csv from 'fast-csv';

const numberRegex = /^[0-9]*$/;
const alphaNumericRegex = /^[A-Za-z0-9]+$/;

function isNotBlank(input) {
  return input.trim().length > 0;
}

function contactValidator(row) {
  return (
    isNotBlank(row.listing_id) &&
    row.listing_id.match(numberRegex) &&
    isNotBlank(row.contact_date) &&
    row.contact_date.match(numberRegex)
  );
}

function listingValidator(row) {
  return (
    isNotBlank(row.id) &&
    row.id.match(numberRegex) &&
    isNotBlank(row.price) &&
    row.price.match(numberRegex) &&
    isNotBlank(row.mileage) &&
    row.mileage.match(numberRegex) &&
    isNotBlank(row.make) &&
    row.make.match(alphaNumericRegex) &&
    isNotBlank(row.seller_type) &&
    row.seller_type.match(alphaNumericRegex)
  );
}

export async function readContacts() {
  //eslint-disable-next-line
  const fileBuffer = await fs.createReadStream(
    new URL('../data_loc/contacts.csv', import.meta.url),
  );
  const fileFormatted = await fileBuffer.pipe(
    csv.parse({ headers: true }).validate(contactValidator),
  );
  const textDecoder = new TextDecoder('utf-8');
  return new Promise(function (resolve, reject) {
    const results = [];
    fileFormatted.on('error', error => reject(error));
    fileFormatted.on('data', data => results.push(data));
    fileFormatted.on('end', () => resolve(results));
  });
}

export async function readListings() {
  //eslint-disable-next-line
  const fileBuffer = await fs.createReadStream(
    new URL('../data_loc/listings.csv', import.meta.url),
  );
  const fileFormatted = await fileBuffer.pipe(
    csv.parse({ headers: true }).validate(listingValidator),
  );
  fileFormatted.on('data-invalid', (row, rowNumber) =>
    console.debug(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`),
  );
  const textDecoder = new TextDecoder('utf-8');
  return new Promise(function (resolve, reject) {
    const results = [];
    fileFormatted.on('error', error => reject(error));
    fileFormatted.on('data', data => results.push(data));
    fileFormatted.on('end', () => resolve(results));
  });
}

async function test() {
  const res = await readContacts();
  console.log('Enteries read ', res);

  const res1 = await readListings();
  console.log('Enteries read ', res1);
}

// test();
