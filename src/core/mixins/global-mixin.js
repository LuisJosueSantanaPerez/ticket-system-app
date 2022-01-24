// Libs
import Swal from "sweetalert2";
import moment from "moment";

export default {
  filters: {
    replaceTheNumeral: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.replace("#", "");
    },
  },
  data() {
    return {};
  },
  methods: {
    /**
     * Sweetalert
     * @param config
     * @returns {Promise<SweetAlertResult<Awaited<unknown>>>}
     */
    $swal({ config = {} }) {
      return Swal.fire(config);
    },
  },
};
