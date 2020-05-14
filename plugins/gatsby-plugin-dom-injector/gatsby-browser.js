exports.onRouteUpdate = function (context, options) {
  const div = document.createElement("div")
  const time = new Date().toISOString()

  div.innerHTML = time

  const body = document.querySelector("body")
  body.appendChild(div)
}
