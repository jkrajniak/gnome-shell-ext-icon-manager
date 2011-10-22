/*
 * gnome-shell-extension-icon-manager
 * 
 * Configure icons which appear on system system-icons
 * Copyright (C) 2011 Jakub Krajniak <jkrajniak@gmail.com>  
 *
 * This is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This file is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gnome-shell-ext-icon-manager If not, see <http://www.gnu.org/licenses/>.
 *
 * 
 */

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const Clutter = imports.gi.Clutter;

const Panel = imports.ui.panel;
const StatusIconDispatcher = imports.ui.statusIconDispatcher;

const SETTINGS_SCHEMA = 'org.gnome.shell.extensions.icon-manager';
const SETTINGS_REMOVE_TOPBAR = 'remove-from-top-bar';
const SETTINGS_ADD_TOPBAR = 'add-to-top-bar';

function IconManager() {
        this._init();
}

IconManager.prototype = {
        enable: function() {
            
            // prepare array with elements to remove
            var removeTopBarElements = [];
            //global.log(removeTopBar);
            for(let i in removeTopBar) {
                if(Main.panel._statusArea[removeTopBar[i]]){
                   Main.panel._statusArea[removeTopBar[i]].destroy();
                }
            }

            // add elements
             

            return true;
            
        },
        disable: function() {

            // revert
            for(let i in removeTopBar) {
                name = removeTopBar[i];
                indicator = null;
                if(name in Panel.STANDARD_STATUS_AREA_SHELL_IMPLEMENTATION) {
                    indicator = new Panel.STANDARD_STATUS_AREA_SHELL_IMPLEMENTATION[name];
                } else {
                    global.log(">>" + name);
                }
                try {
                    Main.panel.addToStatusArea(name, indicator, Panel.STANDARD_STATUS_AREA_ORDER.indexOf(name));
                } catch(e) {
                   global.log("+++ "+name); 
                }
            }
            
            return true;

        },
        
        _init: function() {
                this._settings = new Gio.Settings({schema: SETTINGS_SCHEMA});

                removeTopBar =  this._settings.get_strv(SETTINGS_REMOVE_TOPBAR);
                addTopBar = this._settings.get_strv(SETTINGS_ADD_TOPBAR);
                
                /*
                for(let idx in this.removeTopBar) {
                    if(this.topBar[idx] in Panel.STANDARD_STATUS_AREA_SHELL_IMPLEMENTATION) {
                            Panel.STANDARD_STATUS_AREA_SHELL_IMPLEMENTATION[this.removeTopBar[idx]] = '';
                    }
                }

                for(let idx in this.addTopBar) { // put in top bar
                    StatusIconDispatcher.STANDARD_TRAY_ICON_IMPLEMENTATIONS[this.addTopBar[idx]] = this.addTopBar[idx];
                               
                }
                */

        }
}

function init() {
    iconManager = new IconManager();
    iconManager._init();
}

function enable() {
    return iconManager.enable();
}

function disable() {
    return iconManager.disable();
}
