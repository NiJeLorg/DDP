let L = require('leaflet');
L.Control.SubOverlaySelect = L.Control.extend({
  options: {
    position: 'topleft',
    title: 'Layers',
    overlays: {},
    subOverlays: {},
    onOverlayChange: {},
    selected: ""
  },
  onAdd: function (map) {
    let className = 'leaflet-control-sub-layer-select', container;
    container = L.DomUtil.create('div', 'leaflet-bar ' + className);
    let dropDownContainer = L.DomUtil.create('div', 'sub-overlay ', container);
    let switcherContainer = L.DomUtil.create('div', 'overlay-switcher', dropDownContainer);
    this.menuContainer = L.DomUtil.create('ul', 'sub-overlay-menu', dropDownContainer);
    this.currentGroup = this.options.overlays[this.options.selected];
    this._updateSubMenu();
    this.btns = Object.keys(this.options.overlays);
    for(let idx in this.btns){
      let className = "switch-btn ";
      if(this.options.selected === this.btns[idx]){
        className += "active-menu"
      }
      this._createSwitcher(this.btns[idx],  switcherContainer, this.toggleBtn, this, className);
    }
    return container;
  },

  _updateSubMenu() {
    this.menuContainer.innerHTML = "";
    for(let overlay in this.currentGroup){
      this._createListItem(overlay, this.currentGroup[overlay], 'sub-overlay-menu-item', this.menuContainer)
    }
  },
  _createListItem(title, color, className, container) {
    this.listItem = L.DomUtil.create('li', className, container);
    this.listItem.innerHTML = `<span class="dot" style="background-color: ${color}"></span>${title}`;
    this.listItem.setAttribute("data-overlay", title);
    return this.listItem
  },
  _createSwitcher(title, container, fn, context, className){
    var btn = L.DomUtil.create('a', className, container);
    btn.innerHTML = title;
    L.DomEvent
      .addListener(btn, 'click', L.DomEvent.stopPropagation)
      .addListener(btn, 'click', L.DomEvent.preventDefault)
      .addListener(btn, 'click', fn, context);
    btn.setAttribute("data-menu", title);

  },
  onRemove: function (map) {
    // when removed
  },

  toggleBtn: function (e) {
    console.log("CLICKED", e.target.getAttribute('data-menu'));
    let overlayGroupSelected = e.target.getAttribute('data-menu');
    this.toggleActiveBtn(e);
    if(overlayGroupSelected){
      this.currentGroup = this.options.overlays[overlayGroupSelected];
      this._map.setSelectedOverlayGroupName(overlayGroupSelected);
      this._updateSubMenu();
    }
  },
  toggleActiveBtn: function(element) {
    let activeMenu = document.getElementsByClassName("active-menu");
    for(let element of activeMenu) {
      element.classList.remove("active-menu");
    }
    element.target.classList.add("active-menu");
  }

});

L.Map.include({
  selectedOverlayGroupName: function () {
    return this._selectedOverlayGroupName || false;
  },

  setSelectedOverlayGroupName: function(overlayGroup) {
    this._selectedOverlayGroupName = overlayGroup;
    this.fire('overlayGroupChange');
  },

  _onOverlayGroupChange: function (e) {
    this.fire('overlayGroupChange');
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
  let overlayGroupChange = 'overlayGroupChange';
  if (overlayGroupChange) {
    const onOverlayGroupChange = L.bind(this._onOverlayGroupChange, this);

    this.whenReady(function () {
      L.DomEvent.on(document, overlayGroupChange,onOverlayGroupChange);
    });

    this.on('unload', function () {
      L.DomEvent.off(document, overlayGroupChange, overlayGroupChange);
    });
  }
});

L.control.suboverlayselect = function(options) {
  return new L.Control.SubOverlaySelect(options);
};

