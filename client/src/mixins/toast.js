import Swal from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  methods: {
    sweetToast() {
      Swal.mixin({
        title: "Client added successfully",
        toast: true,
        type: "success",
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        icon: "success",

        onOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    },
  },
};
