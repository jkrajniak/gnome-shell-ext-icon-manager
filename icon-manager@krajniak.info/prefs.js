// -*- mode: js2; indent-tabs-mode: nil; js2-basic-offset: 4 - 

const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const SETTINGS_SCHEMA = 'org.gnome.shell.extensions.icon-manager';
const SETTINGS_KEY = 'top-bar';

// from: js/ui/statusIconDispatcher.js
const TRAY_ICONS = [
    'bluetooth', 'volume', 'network', 'battery', 'a11y', 'keyboard', 'input-method'
]

const _settings = new Gio.Settings({schema: SETTINGS_SCHEMA});

function init() {
}


function buildPrefsWidget() {
    let mainBox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, margin: 20 });

    let grid = new Gtk.Grid({ row_spacing: 1, column_spacing: 1 });
    let infoLabel = new Gtk.Label({ use_markup: true, margin: 10, label: 'Topbar icons' });
    
    removeTopBar = _settings.get_strv(SETTINGS_KEY);
    _removeTopBar = {};
    removeTopBar.map(function(s) { _removeTopBar[s] = s } );
    
    otherIcons = new Array(removeTopBar);
    
    window.log(otherIcons[0][2]);

    let i_grid = 0;
    for(var i in TRAY_ICONS) {
        let icon = new Gtk.Label();
        icon.set_label(TRAY_ICONS[i]);
        grid.attach(icon, 1, i+1, 1, 1);
        
        let active = false;
        if(TRAY_ICONS[i] in _removeTopBar) {
            active = true;
            window.log(TRAY_ICONS[i]);
            window.log(otherIcons[0].indexOf(TRAY_ICONS[i]));
            if(otherIcons[0].indexOf(TRAY_ICONS[i]) !== -1){
                 
                otherIcons[0].splice(otherIcons[0].indexOf(TRAY_ICONS[i]), 1);
            }
        }

        let checkbox = new Gtk.Switch({'active': active});
        grid.attach(checkbox, 0, i+1, 1, 1);
        i_grid = i+1;
    }
    
    grid.attach(infoLabel, 0,0,1,1);
    grid.attach(new Gtk.Label({'label': 'Other'}), 0, i_grid+1, 1, 1);

    let inputText = new Gtk.Entry();
    inputText.set_text(otherIcons.join(', '));
    grid.attach(inputText, 1, i_grid+1, 2, 1);

    grid.attach(new Gtk.Label(
        {'label': 'Set list of icon names which should be move to the top-bar from status bar (separate by comma). e.g. skype, tomboy', 
         'wrap': true 
        }), 0, i_grid+2, 2, 3);
    
    let saturationEffect = new Gtk.Entry();
    grid.attach(saturationEffect, 1, i_grid+5, 2, 1);
    grid.attach(new Gtk.Label({'label': 'Desaturation'}), 0, i_grid+5, 1, 1);

    mainBox.add(grid);

    mainBox.show_all();
    return mainBox;
}
