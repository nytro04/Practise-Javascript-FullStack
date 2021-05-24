<template>
  <div>
    <b-modal
      id="edit-provider"
      ref="edit-provider"
      title="Edit Provider"
      ok-title="Save Provider"
      ok-variant="outline-dark"
      @ok="handleOk"
      @show="resetModal"
      @hidden="resetModal"
    >
      <ValidationObserver
        tag="form"
        id="providerForm"
        ref="providerForm"
        @submit.stop.prevent="onSubmit"
      >
        <!-- <b-form @submit.prevent="handleSubmit(onSubmit)"> -->
        <ValidationProvider
          rules="required"
          ref="providersName"
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
              :state="validState('providersName')"
              required
              aria-describedby="name-feedback"
            ></b-form-input>

            <b-form-invalid-feedback id="name-feedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <template #modal-footer="{ ok, cancel }" class="">
          <b-button
            type="reset"
            @click="cancel()"
            variant="outline-dark"
            class="mr-2"
            >Cancel</b-button
          >

          <b-button size="" variant="outline-dark" @click="ok()"
            >Save Provider</b-button
          >
        </template>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

import axios from "axios";
import { mapActions } from "vuex";

export default {
  // mixins: [validationMixin],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    provider: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        name: "",
      },
    };
  },

  created() {
    this.form.name = this.provider;
  },

  methods: {
    ...mapActions({
      setProvider: "providers/setProvider",
    }),
    validState(ref) {
      if (this.$refs[ref] !== undefined && this.$refs[ref].classes.dirty) {
        if (this.$refs[ref].classes.valid) return true;
        else return false;
      } else return null;
    },
    cancel() {
      this.$refs["edit-provider"].hide();
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
        const invalid = await this.$refs.providerForm.validate();

        if (!invalid) {
          for (let i in this.$refs) {
            if (i.includes("providers")) {
              this.$refs[i].flags.dirty = true;
            }
          }
        } else {
          // pass provider id in submit and add to route like below
          // const res = await axios.patch(`providers/${id}`, this.form);
          const res = await axios.patch(`providers`, this.form);
          if (res.data) {
            // add store update
            // this.setProvider(res.data.data.provider);

            this.$toast("Provider successfully updated");
            this.$refs["edit-provider"].hide();

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
      //   this.$refs.providerForm.reset();
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.providers {
  display: flex !important;
  justify-content: space-between;
  width: 15rem !important;
}
</style>
