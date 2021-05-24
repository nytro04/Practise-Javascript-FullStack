<template>
  <div class="home">
    <!-- <create-client /> -->
    <navbar />

    <div class="container mt-lg-5">
      <!-- <div class="px-4 py-2 d-flex justify-content-between client-header">
        <h3>Clients</h3>
        <b-button
          v-b-modal.modal-lg.create-client
          variant="outline-dark"
          size="sm"
          >New Client</b-button
        >
      </div> -->
      <home />
    </div>
  </div>
</template>

<script>
// import CreateClient from "./components/CreateClient.vue";
import Navbar from "./components/layout/Navbar.vue";
import Home from "./views/Home.vue";

export default {
  components: { Navbar, Home },
};
</script>
