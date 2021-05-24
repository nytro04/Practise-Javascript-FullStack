<template>
  <div>
    <edit-provider :provider="providerPrepopulate" />
    <b-modal
      id="create-client"
      ref="create-client"
      size=""
      title="New Client"
      ok-title="Add Client"
      ok-variant="outline-dark"
      @ok="handleOk"
      @show="resetModal"
      @hidden="resetModal"
    >
      <ValidationObserver
        tag="form"
        id="clientForm"
        ref="clientForm"
        @submit.stop.prevent="onSubmit"
      >
        <!-- <b-form @submit.prevent="handleSubmit(onSubmit)"> -->
        <ValidationProvider
          rules="required"
          ref="clientsName"
          name="Name"
          v-slot="{ valid, errors }"
        >
          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            id="name"
            label="Name"
            label-for="name"
          >
            <b-form-input
              id="name"
              ref="name"
              v-model.trim="form.name"
              :state="validState('clientsName')"
              required
              aria-describedby="name-feedback"
            ></b-form-input>

            <b-form-invalid-feedback id="name-feedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
          rules="required|email"
          ref="clientsEmail"
          name="Email"
          v-slot="{ valid, errors }"
        >
          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            id="email"
            label="Email"
            label-for="email"
          >
            <b-form-input
              id="email"
              ref="email"
              v-model.trim="form.email"
              :state="validState('clientsEmail')"
              required
              aria-describedby="name-feedback"
            ></b-form-input>

            <b-form-invalid-feedback id="name-feedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <!-- can add regex for specific number format eg. USA :rules="{ regex:/^[2-9]\d{2}[2-9]\d{2}\d{4}$/ }" -->
        <ValidationProvider
          rules="required"
          ref="clientsPhone"
          name="Phone"
          v-slot="{ valid, errors }"
        >
          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            id="phone"
            label="Phone"
            label-for="phone"
          >
            <b-form-input
              id="phone"
              ref="phone"
              v-model="form.phone"
              :state="validState('clientsPhone')"
              required
              aria-describedby="name-feedback"
            ></b-form-input>

            <b-form-invalid-feedback id="name-feedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
          rules="required"
          ref="clientsProvider"
          name="Phone"
          v-slot="{ valid, errors }"
        >
          <b-form-row class="mb-5">
            <b-col>
              <b-form-group
                label-cols="4"
                id="providers"
                label="Providers:"
                label-for="providers"
              >
                <b-form-input id="providers" required></b-form-input>
                <!-- v-model="form.providers" -->
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-dropdown
                  id="ddown2"
                  text="Add Providers"
                  variant="outline-dark"
                >
                  <div
                    v-for="provider in providers"
                    :key="`provider_${provider._id}`"
                    class="bg-white dropdown-item text-body providers"
                  >
                    <b-form-checkbox
                      v-model="selected"
                      :state="validState('clientsProvider')"
                      name="providers"
                      :value="provider._id"
                      required
                    >
                      {{ provider.name }}
                    </b-form-checkbox>
                    <!-- @click="editProvider(provider)" -->
                    <b-icon
                      v-b-modal.modal-lg.edit-provider
                      @click="getName(provider.name)"
                      icon="pencil-square"
                      class="pointer-event"
                    ></b-icon>
                    <b-icon
                      @click="deleteProvider(provider._id)"
                      icon="trash-fill"
                      class="pointer-event"
                    ></b-icon>
                  </div>
                </b-dropdown>
              </b-form-group>
            </b-col>
            <b-form-invalid-feedback id="providers-feedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-row>
        </ValidationProvider>

        <template v-slot:modal-footer="{ ok }" class="">
          <b-button
            type="reset"
            @click="cancel()"
            variant="outline-dark"
            class="mr-2"
            >Cancel</b-button
          >

          <b-button size="" variant="outline-dark" @click="ok()"
            >Add Client</b-button
          >
        </template>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import EditProvider from "./EditProvider.vue";

export default {
  // mixins: [validationMixin],
  components: {
    ValidationObserver,
    ValidationProvider,
    EditProvider,
  },
  data() {
    return {
      form: {
        email: "",
        name: "",
        phone: "",
        providers: [],
      },

      show: true,
      // providers: [],
      selected: [],
      providerPrepopulate: {},
    };
  },

  mounted() {
    // this.fetchProviders();
    // this.providers();
  },

  computed: {
    ...mapGetters({
      providers: "providers/fetchProviders",
    }),
  },

  methods: {
    ...mapActions({
      deleteProviderStore: "providers/deleteProvider",
    }),
    validState(ref) {
      if (this.$refs[ref] !== undefined && this.$refs[ref].classes.dirty) {
        if (this.$refs[ref].classes.valid) return true;
        else return false;
      } else return null;
    },
    cancel() {
      this.$refs["create-client"].hide();
    },
    // ok() {
    //   this.handleOk();
    // },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();

      this.onSubmit();
    },
    async onSubmit() {
      try {
        const invalid = await this.$refs.clientForm.validate();

        if (!invalid) {
          for (let i in this.$refs) {
            if (i.includes("clients")) {
              this.$refs[i].flags.dirty = true;
            }
          }
        } else {
          console.log(this.selected);

          this.form.providers = this.selected;

          const res = await axios.post("clients", this.form);
          if (res.data) {
            // this.$emit("createdClient");

            const newProvider = {
              ...res.data.data.client,
              providers: res.data.data.client.providers.map((item) =>
                this.findProviders(item)
              ),
            };

            this.$emit("createdClient", newProvider);
            this.$toast("Client successfully created");
            this.$refs["create-client"].hide();
            this.resetModal();
          }
        }
      } catch (error) {
        console.log(error);
        this.$toast(error.response.message, "error");
      }
    },
    // cancel() {
    //   this.show = false;
    // },
    resetModal() {
      for (let key in this.form) {
        if (Object.getOwnPropertyDescriptor(this.form, key)) {
          this.form[key] = "";
        }
      }
      // requestAnimationFrame(() => {
      //   this.$refs.clientForm.reset();
      // });
    },

    // async fetchProviders() {
    //   try {
    //     const res = await axios.get("providers");

    //     this.providers = res.data.data.providers;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    async deleteProvider(id) {
      try {
        const confirmDelete = await this.$confirm();

        if (confirmDelete) {
          const res = await axios.delete(
            `http://localhost:8888/api/v1/providers/${id}`
          );

          if (res.status === 204) {
            this.$toast("Provided successfully deleted");
            this.deleteProviderStore(id);

            // this.providers = this.providers.filter(
            //   (provider) => provider._id !== id
            // );
          }
        }
      } catch (error) {
        console.log(error, "delete errro");
        this.$toast(error.response.message, "error");
      }
    },

    findProviders(id) {
      const provider = this.providers.find((item) => item._id === id);
      return provider;
    },

    getName(provider) {
      console.log(provider);
      this.providerPrepopulate = provider;
    },
  },

  // watch: {
  //   providerPrepopulate(){

  //   }
  // }
};
</script>

<style lang="scss" scoped>
.providers {
  display: flex !important;
  justify-content: space-between;
  width: 15rem !important;
}
</style>
