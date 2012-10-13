// -*- mode: js2; indent-tabs-mode: nil; js2-basic-offset: 4 - 

const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const SETTINGS_SCHEMA = 'org.gnome.shell.extensions.icon-manager';
const SETTINGS_KEY = 'top-bar';
const SETTINGS_SATURATION = 'desaturation-factor';

// from: js/ui/statusIconDispatcher.js
const TRAY_ICONS = [
    'bluetooth', 'volume', 'network', 'battery', 'a11y', 'keyboard', 'input-method'
]

const _settings = new Gio.Settings({schema: SETTINGS_SCHEMA});

function init() {
}

let updateSettings;

function buildPrefsWidget() {

    let mainBox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, margin: 20 });

    let grid = new Gtk.Grid({ row_spacing: 1, column_spacing: 1 });
    let infoLabel = new Gtk.Label({ use_markup: true, margin: 10, label: 'Topbar icons' });
    let inputText = new Gtk.Entry();
    
    let saturationFactor = _settings.get_double(SETTINGS_SATURATION);

    removeTopBar = _settings.get_strv(SETTINGS_KEY);

    // convert to object
    _removeTopBar = {};
    removeTopBar.map(function(s) { _removeTopBar[s] = false } );
    
    otherIcons = removeTopBar.slice();
    showOnTopBar = {};
    
    let i_grid = 0;

    for(var i in TRAY_ICONS) {
        let icon = new Gtk.Label();
        icon.set_label(TRAY_ICONS[i]);
        grid.attach(icon, 1, i+1, 1, 1);
        
        let active = true;
        if(TRAY_ICONS[i] in _removeTopBar) {
            active = false;
            otherIcons.splice(otherIcons.indexOf(TRAY_ICONS[i]), 1);
            showOnTopBar[TRAY_ICONS[i]] = false;
        }
        let key = TRAY_ICONS[i];

        let checkbox = new Gtk.Switch({'active': active});
        checkbox.connect('notify::active', function() {
            showOnTopBar[key] = checkbox.get_active();
            updateSettings();
        })

        grid.attach(checkbox, 0, i+1, 1, 1);
        i_grid = i+1;
    }
    
    grid.attach(infoLabel, 0,0,1,1);
    grid.attach(new Gtk.Label({'label': 'Other'}), 0, i_grid+1, 1, 1);

    inputText.set_text(otherIcons.join(','));
    inputText.connect('changed', function() {
        otherIcons = inputText.get_text().split(',');
        otherIcons.map(function(s) { return s.trim(); });
        updateSettings();
    })

    grid.attach(inputText, 1, i_grid+1, 2, 1);

    grid.attach(new Gtk.Label(
        {'label': 'Set list of icon names which should be move to the top-bar from status bar (separate by comma). e.g. skype, tomboy', 
         'wrap': true 
        }), 0, i_grid+2, 2, 3);

    /** collect all settings and update dconf settings 
     *  save only that one which has false in _removeTopBar
     * */
    updateSettings = function() {
        _iconSet = otherIcons.slice();
        for(var i in showOnTopBar) {
          if(showOnTopBar[i] == false) {
            _iconSet.push(i);
          }
        }

        for(var j in _iconSet) { window.log(_iconSet[j]); };
        _settings.set_strv(SETTINGS_KEY, _iconSet);
    }
    
    /** saturation effect */
    let saturationEffect = Gtk.SpinButton.new_with_range(0.0, 1.0, 0.01);
    saturationEffect.set_value(saturationFactor);
    grid.attach(saturationEffect, 1, i_grid+5, 2, 1);
    grid.attach(new Gtk.Label({'label': 'Desaturation'}), 0, i_grid+5, 1, 1);

    saturationEffect.connect('value_changed', function() {
        _settings.set_double(SETTINGS_SATURATION, saturationEffect.get_value());
    });

    /** pack all */
    mainBox.add(grid);
    mainBox.show_all();
    return mainBox;
}
