let L = require('leaflet');
L.Control.OverlaySelect = L.Control.extend({
  options: {
    position: 'topright',
    title: 'Layers',
    overlays: {},
    onOverlayChange: {}
  },
  onAdd: function (map) {
    let className = 'leaflet-control-layer-select', container, content = '';
    container = L.DomUtil.create('div', 'leaflet-bar');
    content = '<option value="">Layers</option>';
    className += 'layer-select';
    for(let overlay in this.options.overlays){
      content += `<option value="${overlay}">${overlay}</option>`
    }

    this._createSelect(this.options.title, className, content, container, this.selectLayer, this);
    return container;
  },

  _createSelect: function (title, className, content, container, fn, context) {
    this.select = L.DomUtil.create('select', className, container);
    this.select.innerHTML = content;

    L.DomEvent
      .addListener(this.select, 'change', L.DomEvent.stopPropagation)
      .addListener(this.select, 'change', L.DomEvent.preventDefault)
      .addListener(this.select, 'change', fn, context);

    return this.select;
  },
  onRemove: function (map) {
    // when removed
  },
  selectLayer: function (e) {
    let layerSelected = e.target.value;
    for(let key in this.options.overlays){
      if(key !== layerSelected){
        this.options.overlays[key].remove();
      }
    }
    if(layerSelected){
      this.options.overlays[layerSelected].addTo(this._map);
      this._map.setSelectedOverlayName(layerSelected);
    }
  }
});

L.Map.include({
  selectedOverlayLayerName: function () {
    return this._selectedOverlayLayerName || false;
  },

  setSelectedOverlayName: function(overlayName) {
    this._selectedOverlayLayerName = overlayName;
    console.log("Firing event");
    this.fire('overlayChange');
  },

  _onOverlayChange: function (e) {
    this.fire('overlayChange');
    console.log("Firing event");
  }
});

L.Map.mergeOptions({
  overlaySelectControl: false
});

L.Map.addInitHook(function () {
  if (this.options.overlaySelectControl) {
    this.overlaySelectControl = new L.Control.OverlaySelect(this.options.overlaySelectControl);
    this.addControl(this.overlaySelectControl);
  }
  let overlayChange = 'overlayChange';
  if (overlayChange) {
    var onOverlayChange = L.bind(this._onOverlayChange, this);

    this.whenReady(function () {
      L.DomEvent.on(document, overlayChange,onOverlayChange);
    });

    this.on('unload', function () {
      L.DomEvent.off(document, overlayChange, onOverlayChange);
    });
  }
});

L.control.overlayselect = function(options) {
  return new L.Control.OverlaySelect(options);
};

