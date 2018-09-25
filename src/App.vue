<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">My Vue App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/payments-manager">Payments Manager</b-nav-item>
          <div>
            <b-btn type="button" variant="success" v-on:click="createPayment">Create Payment</b-btn>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  <div class="container-fluid mt-4">
    <h1 class="h1">Payments Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in payments.data" :key="payment.id">
              <td>{{ payment.id }}</td>
              <td>{{ payment.amount }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populatePaymentToEdit(payment)">Edit</a> -
                <a href="#" @click.prevent="deletePayment(payment.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Payment ID#' + model.id : 'Update Payment')">
          <form @submit.prevent="savePayment">
            <b-form-group label="Amount">
              <b-form-textarea rows="4" v-model="model.amount"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Payment</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
  </div>
  
</template>


<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      payments: [],
      model: {}
    }
  },
  async created () {
    this.refreshPayments()
  },
  methods: {
    async refreshPayments () {
      this.loading = true
      this.payments = await api.getPayments()
      this.loading = false
    },
    async populatePaymentToEdit (payment) {
      this.model = Object.assign({}, payment)
    },
    async savePayment () {
      await api.updatePayment(this.model.id, this.model)
      this.model = {} // reset form
      this.loading = true
      this.payments = await api.getPayments()
      this.loading = false
    },
    async deletePayment (id) {
      if (confirm('Are you sure you want to delete this payment?')) {
        // if we are editing a payment we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deletePayment(id)
        this.loading = true
        this.payments = await api.getPayments()
        this.loading = false
      }
    },
    async createPayment () {
      await api.createPayment()
      this.model = {} // reset form
      this.loading = true
      this.payments = await api.getPayments()
      this.loading = false
    }
  }
}
</script>