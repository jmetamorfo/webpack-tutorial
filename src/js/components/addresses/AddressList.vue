<template>
  <section class="addresses-section">
    <div class="container">
      <h2 class="text-center">Nos adresses</h2>
      <h3>NICE • BEAUSOLEI</h3>
      <div class="row">
        <div class="col-12 col-md-4" v-for="address in addresses" :key="address.name">
          <div class="address-item">
            <img class="img-fluid inner-border" src="images/dummy/laura.jpeg">
            <div class="name">{{address.name}}</div>
            <div class="address" v-html="address.address"></div>
            <div class="phone">{{address.phone}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    data() {
      return {
        addresses: [
          {
            name: 'NICE LE PORT',
            address: '10 Bd. Carnot<br>06300 Nice<br>9h 22h - 7/7 Jours',
            phone: '04 93 89 83 91',
            link: '#',
          },
          {
            name: 'NICE CENTRE',
            address: '10 Bd. Carnot<br>06300 Nice<br>9h 22h - 7/7 Jours',
            phone: '04 93 89 83 91',
            link: '#',
          },
          {
            name: 'beausoleil',
            address: '10 Bd. Carnot<br>06300 Nice<br>9h 22h - 7/7 Jours',
            phone: '04 93 89 83 91',
            link: '#',
          }],
      };
    },
  };
</script>
