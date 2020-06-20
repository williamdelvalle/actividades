const fetch = require('node-fetch');

const token = 'authenticationToken=u0kocj0t6h8er3iiaep7i4813v';
const KOMET_API_URL = `https://api.kometsales.com/api`
const CARRIER_LIST_URL = `${KOMET_API_URL}/carrier.list?${token}`
const CUSTOMER_LIST_URL = `${KOMET_API_URL}/customer.list?${token}`
const PREBOOK_CREATE_URL = `${KOMET_API_URL}/prebook.create`

const Main = async () => {
  try {
    let res = await fetch(CARRIER_LIST_URL);
    let data = await res.json();
    let carrier = {}
    if (data.status && data.carriers.length > 0) {
      carrier = data.carriers[0];
      console.log(`Carrier: ${carrier.name}`);
    }
    
    res = await fetch(CUSTOMER_LIST_URL);
    data = await res.json();
    if (data.status && data.customers.length > 0) {
      const customer = data.customers[0];
      console.log(`Customer: ${customer.name}`);
  
      const dataPrebook = {
        authenticationToken: token,
        customerId: customer.id,
        customerCode: customer.code,
        customerDescription: customer.name,
        carrierId: carrier.id,
        carrierCode: carrier.code,
        carrierDescription: carrier.name,
        shipDate: new Date('2020-06-20'),
        prebookItems: []
      };

      const params = {
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(dataPrebook)
      };
      
      res = await fetch(PREBOOK_CREATE_URL, params);
      data = await res.json();
      console.log('data', data);
      if (data.status) {
        console.log(data.message);
        console.log('prebook', data);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

Main();
