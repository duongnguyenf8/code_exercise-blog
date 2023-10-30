/* eslint-disable no-undef */
export function accessToast(msg) {
  Toastify({
    text: msg,
    duration: 5000,
    destination: "",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "blueviolet",
      borderRadius: "10px",
      color: "#fff",
      width: "fit-content",
    },
  }).showToast();
}

export function failedToast(msg) {
  Toastify({
    text: msg,
    duration: 5000,
    destination: "",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "orange",
      borderRadius: "10px",
      color: "#fff",
    },
  }).showToast();
}
