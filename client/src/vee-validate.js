import { required, email, numeric } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("email", {
  ...email,
  message: "This field must be a valid email",
});

extend("numeric", {
  ...numeric,
  message: "This field may only contain numeric characters",
});
