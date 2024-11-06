import Vue from "vue";

function notify(message, icon = 'success') {
  return Vue.swal({
    icon: icon,
    text: message
  });
}

function confirm(message, title = "Confirmación!", type = "warning") {
  return Vue.swal({
    icon: type,
    title: title,
    text: message,
    type: type,
    showCancelButton: true,
    confirmButtonColor: "#cf4a7b",
    confirmButtonText: "Aceptar",
    focusCancel: true
  });
}

export const notification = {
  notify,
  confirm,
};
