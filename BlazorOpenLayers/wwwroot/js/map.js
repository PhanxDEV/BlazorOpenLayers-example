window.initMap = (mapDivId) => {
    try {
        const map = new ol.Map({
            target: mapDivId,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                new ol.layer.Vector({
                    source: new ol.source.Vector()
                }),
            ],
            view: new ol.View({
                center: [0, 0],
                zoom: 2,
            }),
        });

        map.on("click", e => {
            const [x, y] = e.coordinate;
            window.SimpleMap.invokeMethodAsync("OnMapClicked", x, y);
        });

        map.on("moveend", e => {
            const [x1, y1, x2, y2] = e.map.getView().getViewStateAndExtent().extent;
            window.SimpleMap.invokeMethodAsync("OnMapExtentChanged", x1, y1, x2, y2);
        });

        window.map = map;
    } catch (e) {
        console.log(e);
    }
}

window.addPoint = (x, y) => {
    try {
        const source = window.map.getAllLayers()[1].getSource();
        const f = new ol.Feature({
            geometry: new ol.geom.Point([x, y])
        });

        const fill = new ol.style.Fill({
            color: "red",
        });

        const stroke = new ol.style.Stroke({
            color: 'red',
            width: 1.25,
        });

        f.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: 15
            }),
            fill: fill,
            stroke: stroke,
        }));
        source.addFeature(f);
    } catch (e) {
        console.log(e);
    }
}

window.registerClass = (name, dotNetObj) => {
    window[name] = dotNetObj;
}