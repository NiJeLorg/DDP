let L = require('leaflet');
L.Control.OverlaySelect = L.Control.extend({
  options: {
    position: 'topright',
    title: 'Layers',
    overlays: {},
    onOverlayChange: {}
  },
  onAdd: function (map) {
    let className = 'leaflet-control-layer-select', container;
    container = L.DomUtil.create('div', 'leaflet-bar ' + className);
    let dropDownContainer = L.DomUtil.create('div', 'dropdown ', container);
    let button = L.DomUtil.create('button', 'dropbtn', dropDownContainer);
    button.innerHTML = 'LAYERS';
    let menuContainer = L.DomUtil.create('div', 'dropdown-content', dropDownContainer);
    for(let overlay in this.options.overlays){
     this._createLink(overlay, 'overlay-menu-item', menuContainer, this.overlaySelected, this)
    }

    return container;
  },

  _createLink(title, className, container, fn, context) {
    this.link = L.DomUtil.create('a', className, container);
    this.link.innerHTML = title;
    L.DomEvent
      .addListener(this.link, 'click', L.DomEvent.stopPropagation)
      .addListener(this.link, 'click', L.DomEvent.preventDefault)
      .addListener(this.link, 'click', fn, context);
    this.link.setAttribute("data-overlay", title);
    return this.link
  },

  onRemove: function (map) {
    // when removed
  },

  overlaySelected: function (e) {
    this.updateActiveSelection();
    let layerSelected = e.target.getAttribute('data-overlay');
    e.target.classList.add("active-overlay-menu");
    if(layerSelected){
      this._map.setSelectedOverlayName(layerSelected);
    }
  },

  updateActiveSelection: function() {
    let activeMenu = document.getElementsByClassName("active-overlay-menu");
    for(let element of activeMenu) {
      element.classList.remove("active-overlay-menu");
    }
  }
});

L.Map.include({
  selectedOverlayLayerName: function () {
    return this._selectedOverlayLayerName || false;
  },

  setSelectedOverlayName: function(overlayName) {
    this._selectedOverlayLayerName = overlayName;
    this.fire('overlayChange');
  },

  _onOverlayChange: function (e) {
    this.fire('overlayChange');
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
    const onOverlayChange = L.bind(this._onOverlayChange, this);

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

