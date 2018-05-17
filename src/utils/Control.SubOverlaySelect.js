let L = require('leaflet');
L.Control.SubOverlaySelect = L.Control.extend({
  options: {
    position: 'topleft',
    title: 'Layers',
    overlays: {},
    subOverlays: {},
    onOverlayChange: {},
    selected: "",
    enableSwitcher: true,
    enableSubOverlay: true
  },
  onAdd: function (map) {
    let className = 'leaflet-control-sub-layer-select', container;
    container = L.DomUtil.create('div', 'leaflet-bar ' + className);
    this.dropDownContainer = L.DomUtil.create('div', 'sub-overlay ', container);
    this.switcherContainer = L.DomUtil.create('div', 'overlay-switcher', this.dropDownContainer);
    this.menuContainer = L.DomUtil.create('ul', 'sub-overlay-menu', this.dropDownContainer);
    this.currentGroup = this.options.overlays;
    if(this.options.enableSwitcher){
      this.currentGroup = this.options.overlays[this.options.selected];
      this._addSwitcher();
    }
    if(this.options.enableSubOverlay) {
      this._updateSubMenu();
    }
    return container;
  },

  _addSwitcher(){
    this.btns = Object.keys(this.options.overlays);
    for(let idx in this.btns){
      let className = "switch-btn ";
      if(this.options.selected === this.btns[idx]){
        className += "active-menu"
      }
      this._createSwitcher(this.btns[idx],  this.switcherContainer, this.toggleBtn, this, className);
    }
  },
  _updateSubMenu() {
    this.menuContainer.innerHTML = "";
    if(this.options.enableSwitcher){
      for(let overlay in this.currentGroup){
        this._createListItem(overlay, this.currentGroup[overlay]['color'], 'sub-overlay-menu-item', this.menuContainer)
      }
    }else {
      for(let overlay in this.currentGroup){
        console.log(overlay, "overa")
        this._createListItem(this.currentGroup[overlay].label, this.currentGroup[overlay].color, 'sub-overlay-menu-item', this.menuContainer)
      }
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
      L.DomEvent.off(document, overlayGroupChange, onOverlayGroupChange);
    });
  }
});

L.control.suboverlayselect = function(options) {
  return new L.Control.SubOverlaySelect(options);
};

