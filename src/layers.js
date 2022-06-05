let layers = [
    // {id: 1, src: ""}
];

// forma, kad sudelioti json objekta.
// ir kai bus surinkta forma, i layerius detis.
export function addLayer(id, src) {
    let newLayer = {
        id,
        src,
        isSelected: false,
        steps: [] // { type: "color-fill", options: { color: "#ececec"} }
    };

    layers.push(newLayer);
    return newLayer;
}

export function getLayers() {
    return layers;
}