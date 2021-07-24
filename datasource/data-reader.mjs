import * as fs from 'fs';
import * as csv from 'fast-csv';


const numberRegex = /^[0-9]*$/;
const alphaNumericRegex = /^[A-Za-z0-9]+$/;

export async function readContacts() {
    const fileBuffer = await fs.createReadStream(new URL( '../data_loc/contacts.csv', import.meta.url));
    const fileFormatted = await fileBuffer.pipe(csv.parse({ headers: true })
                                                .validate(row => row.listing_id.match(numberRegex) && row.contact_date.match(numberRegex))
                                                );
    // Using the transform function from the formatting stream
    const textDecoder = new TextDecoder('utf-8');
    return new Promise(function(resolve, reject) {
      const results = [];
      fileFormatted.on('error', (error) => reject(error));
      fileFormatted.on('data', (data) => results.push(data));
      fileFormatted.on('end', () => resolve(results));
    });
}

export async function readListings() {
  const fileBuffer = await fs.createReadStream(new URL( '../data_loc/listings.csv', import.meta.url));
    const fileFormatted = await fileBuffer.pipe(csv.parse({ headers: true })
      .validate(row => row.id.match(numberRegex) && row.price.match(numberRegex) && row.mileage.match(numberRegex) && row.make.match(alphaNumericRegex) && row.seller_type.match(alphaNumericRegex))
      );
      fileFormatted.on('data-invalid', (row, rowNumber) =>
        console.warn(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`),
      );
    // Using the transform function from the formatting stream
    const textDecoder = new TextDecoder('utf-8');
    return new Promise(function(resolve, reject) {
      const results = [];
      fileFormatted.on('error', (error) => reject(error));
      fileFormatted.on('data', (data) => results.push(data));
      fileFormatted.on('end', () => resolve(results));
    });
}

async function test() {
  const res = await readContacts();
  console.log('Enteries read ', res);

  const res1 = await readListings();
  console.log('Enteries read ', res1);
} 

// call();