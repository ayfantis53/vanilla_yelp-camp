mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
        container: 'show_map',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: campground.geometry.coordinates,
        zoom: 9
    });

    const marker = new mapboxgl.Marker({
        color: "#f9844a",
        draggable: true
        }).setLngLat(campground.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({offset: 25})
                .setHTML(
                    `<h3 style="color: black">${campground.location}</h3>`
                )
        )
    .addTo(map);