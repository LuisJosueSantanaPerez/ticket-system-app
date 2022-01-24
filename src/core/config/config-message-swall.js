const configMessage = {
  success: {
    config: {
      icon: "success",
      text: "Successful transaction",
      timer: 1500,
    },
  },
  update: {
    config: {
      icon: "success",
      title: "Updated record",
      text: "successful removal",
      timer: 1500,
    },
  },
  confirm_edit: {
    config: {
      title: "Are You sure",
      text: "you want to edit this record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes edit it",
    },
  },
  confirm_delete: {
    config: {
      title: "Are You sure",
      text: "you won t be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes delete it",
    },
  },
  confirm_cancel: {
    config: {
      title: "Are You sure",
      text: "you want to cancel the transaction",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes cancel it",
    },
  },
  success_delete: {
    config: {
      icon: "success",
      title: "Delete",
      text: "successful removal",
      timer: 1500,
    },
  },
  error: {
    config: {
      icon: "error",
      title: "Oops...",
      text: "An internal server error occurred",
    },
  },
  error_delete_credentials: {
    config: {
      icon: "error",
      title: "Oops...",
      text: "you cannot delete your own credentials",
    },
  },
  auth_error_credentials: {
    config: {
      icon: "error",
      title: "Oops...",
      text: "check if your email and password are correct, if not, please contact support and your company will be happy to assist you.",
      timer: 4000,
    },
  },
  delete_auth_credentials: {
    config: {
      icon: "error",
      title: "Oops...",
      text: "sorry you are trying to delete your own user",
      timer: 4000,
    },
  },
};

export default configMessage;
