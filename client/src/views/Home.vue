<template>
  <div class="home">
    <!-- <create-client @createdClient="forceRerender" :key="createKey" /> -->
    <create-client @createdClient="createdClient" />
    <create-provider />

    <edit-client @updatedClient="updatedClient" :clientId="clientId" />
    <div class="px-4 py-2 d-flex justify-content-between client-header">
      <h3>Clients</h3>
      <div>
        <b-button
          v-b-modal.modal-lg.create-provider
          variant="outline-dark"
          size="sm"
          class="mr-5"
          >New Provider
        </b-button>
        <b-button
          v-b-modal.modal-lg.create-client
          variant="outline-dark"
          size="sm"
          >New Client
        </b-button>
      </div>
    </div>
    <div
      v-if="loading"
      class="py-5 flex-column d-flex justify-content-center align-items-center"
    >
      <b-icon icon="three-dots" animation="cylon" font-scale="4"></b-icon>
      <span class="mt-4">Loading Clients...</span>
    </div>
    <div v-else>
      <table class="table table-hover table-bordered">
        <thead class="">
          <!-- <tr class="" v-for="(filed, index) in fields" :key="index"> -->
          <tr class="">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Providers</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>

            <td class="">
              <span v-for="provider in item.providers" :key="provider.id">
                <span class="mx-2">{{ provider.name }},</span>
              </span>
            </td>
            <td>
              <span class="mr-4"
                ><b-button
                  variant="warning"
                  v-b-modal.modal-lg.edit-client
                  @click="setId(item._id)"
                  >Edit<b-icon
                    class="ml-1"
                    icon="pencil-square"
                  ></b-icon></b-button
              ></span>
              <span
                ><b-button @click="deleteClient(item._id)" variant="danger"
                  >Delete<b-icon class="ml-1" icon="trash-fill"></b-icon>
                </b-button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import CreateClient from "../components/CreateClient.vue";
import CreateProvider from "../components/CreateProvider.vue";
import EditClient from "../components/EditClient.vue";
import { mapActions } from "vuex";

// import { BIcon, BIconArrowUp, BIconArrowDown } from "bootstrap-vue";

export default {
  name: "Home",
  components: { CreateClient, EditClient, CreateProvider },
  data() {
    return {
      fields: ["name", "email", "phone", "providers", "action"],
      items: [],
      loading: false,
      clientId: "",
      createKey: 0,
    };
  },

  created() {
    this.fetchClients();
    this.fetchProviders();
  },

  methods: {
    ...mapActions({
      setProviders: "providers/setProviders",
    }),
    setId(id) {
      this.clientId = id;
    },
    forceRerender() {
      this.createKey++;
    },
    createdClient(newClient) {
      this.items = [...this.items, newClient];
    },
    updatedClient(client) {
      // const oldClient = this.items.find((item) => item.id === client.id);
      this.items = this.items.filter((item) => item._id !== client._id);
      this.items = [...this.items, client];
    },
    async fetchClients() {
      try {
        this.loading = true;
        const res = await axios.get("clients");
        this.loading = false;
        this.items = res.data.data.clients;
      } catch (error) {
        console.log(error, "error");
        this.$toast(error.response.message, "error");
      }
    },

    async deleteClient(id) {
      try {
        const confirmDelete = await this.$confirm();
        if (confirmDelete) {
          const res = await axios.delete(`clients/${id}`);

          if (res.status === 204) {
            this.$toast("Client successfully deleted");

            this.items = this.items.filter((item) => item._id !== id);
          }
        }
      } catch (error) {
        console.log(error);
        this.$toast(error.response.message, "error");
      }
    },

    async fetchProviders() {
      try {
        const res = await axios.get("providers");

        this.setProviders(res.data.data.providers);
      } catch (error) {
        console.log(error);
        this.$toast(error.response.message, "error");
      }
    },
  },
  watch: {
    clientId(id) {
      this.setId(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .client-header {
    background-color: rgb(230, 235, 240);
  }

  h3 {
    color: rgb(43, 95, 127);
    box-sizing: bo;
  }
}
</style>
