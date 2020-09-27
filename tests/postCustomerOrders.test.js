const request = require('supertest')
const server = require('../server')

describe('Post Endpoints', () => {
    it('Customer with id = 4 (probably a Colombian chef) has gone and made a purchase of 12 dolphins and 4 truffles || should return 200', () => {
        request(server)
            .post('/postCustomerOrders', [
                {
                    "customerId": 4,
                    "orderDetails": [{
                        "inventory": "dolphin",
                        "quantity": 5
                    },
                    {
                        "inventory": "truffles",
                        "quantity": 4
                    }
                    ]
                }
            ])
            .set('Authorization', 'TW9uZXk0TWVOb3Q0dQ==')
            .expect(200);
    });

    it('Customer with id = 1 (probably Dan Bilzerian’s long-lost cousin) has bought 1 helicopter, 5 AK47s, 3 cocaines || should return 200', () => {
        request(server)
            .post('/postCustomerOrders', [
                {
                    "customerId": 1,
                    "orderDetails": [{
                        "inventory": "helicopter",
                        "quantity": 1
                    },
                    {
                        "inventory": "AK47",
                        "quantity": 5
                    },
                    {
                        "inventory": "cocaine",
                        "quantity": 3
                    }
                    ]
                }
            ])
            .set('Authorization', 'TW9uZXk0TWVOb3Q0dQ==')
            .expect(200);
    });

    it(`# For this year, we are adding a new item to our menu, it’s hand_sanitizer. 
    # It’ll be supplied by the same exact supplier as toilet_paper. 
    # We’ll order 500, with a 10.00 price tag. Color will be green, hex: #302.`, () => {
        request(server)
            .post('/postCustomerOrders', {
                "item": "hand_sanitizer",
                "details": {
                    "price": "10.00",
                    "amount": 500,
                    "last_purchased": "09/27/2020",
                    "color": "green",
                    "color_hex": "#302"
                },
                "supplier_details": {
                    "country": "Indonesia",
                    "country_code": "ID",
                    "currency": "Rupiah",
                    "contact": {
                        "phone": "771-667-3249",
                        "email": "cchiversf@kickstarter.com"
                    }
                }
            })
            .set('Authorization', 'TW9uZXk0TWVOb3Q0dQ==')
            .expect(200);
    });

});