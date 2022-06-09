import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["lat", "lng", "result"]

  search(event) {
    event.preventDefault()
    const lat = this.latTarget.value
    const lng = this.lngTarget.value

    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/museum.json?limit=10&type=poi&proximity=${lng},${lat}&access_token=pk.eyJ1IjoiY2hyaXN0b3BoZXJsZWZyYW5jb2lzMSIsImEiOiJjbDJ0YXpiYmEwMmhlM2JwMm9rcm04bzA5In0.i-cwURbOGjWi41u0M9BNzA`

    this.fetchUrl(mapboxUrl)

    this.emptyHtml()
  }

  fetchUrl(url) {
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      data.features.forEach((result) => {
        const museum = `<li>${result.place_name}</li>`
        this.resultTarget.insertAdjacentHTML("beforeend", museum)
      })
    })
  }

  emptyHtml() {
    this.resultTarget.innerHTML = ""
  }
}
