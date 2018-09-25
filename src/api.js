import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080/v1',
  json: true
})

export default {
  async execute (method, resource, data) {
    console.log('client')
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getPayments () {
    console.log('get payments')
    return axios.get('http://localhost:8080/v1/payments')
  },
  getPayment (id) {
    console.log('get payment')
    return this.execute('get', `/payments/${id}`)
  },
  createPayment (data) {
    console.log('create payment')
    var sampleData = '{"type": "Payment", "id": "8ee3a8d8-ca7b-4290-a52c-dd5b6165ec43", "version": 0, "organisation_id": "743d5b63-8e6f-432e-a8fa-c5d8d2ee5fcb", "amount": "100.21","beneficiary_party": {"account_name": "W Owens", "account_number": "31926819", "account_number_code": "BBAN", "address": "1 The Beneficiary Localtown SE2", "bank_id": "403000", "bank_id_code": "GBDSC", "name": "Wilfred Jeremiah Owens" },"charges_information": {"bearer_code": "SHAR","sender_charges_amount": "5.00","sender_charges_currency": "GBP","receiver_charges_amount": "1.00","receiver_charges_currency": "USD"},"currency": "GBP","debtor_party": {"account_name": "EJ Brown Black", "account_number": "GB29XABC10161234567801", "account_number_code": "IBAN", "address": "10 Debtor Crescent Sourcetown NE1", "bank_id": "203301", "bank_id_code": "GBDSC", "name": "Emelia Jane Brown" },"fx": { "contract_reference": "FX123","exchange_rate": "2.00000", "original_amount": "200.42", "original_currency": "USD"}, "payment_purpose": "Paying for goods/services", "payment_type": "Credit", "processing_date": "2017-01-18" }'

    return this.execute('post', '/payments', sampleData)
  },
  updatePayment (id, data) {
    console.log('update payment')
    return this.execute('put', `/payments/${id}`, data)
  },
  deletePayment (id) {
    console.log('delete payment')
    return this.execute('delete', `/payments/${id}`)
  }
}
