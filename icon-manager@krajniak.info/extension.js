/*
 * gnome-shell-ext-icon-manager
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
const Lang = imports.lang;

const Panel = imports.ui.panel;
const StatusIconDispatcher = imports.ui.statusIconDispatcher;

const SETTINGS_SCHEMA = 'org.gnome.shell.extensions.icon-manager';
const SETTINGS_REMOVE_TOPBAR = 'top-bar';
const SETTINGS_DESATURATION_FACTOR = 'desaturation-factor';

function IconManager() {
        this._init();
}

IconManager.prototype = {
        enable: function() { 
            this._refreshTopBar();
            return true;
            
        },
        disable: function() {

            // revert
            for(let i in removeTopBar) {
                name = removeTopBar[i];
                indicator = null;
                if(name in Panel.STANDARD_STATUS_AREA_SHELL_IMPLEMENTATION) {
                    indicator = new Panel.STANDARD_STATUS_AREA_SHELL_IMPLEMENTATION[name];
                }

                try {
                    Main.panel.addToStatusArea(name, indicator, Panel.STANDARD_STATUS_AREA_ORDER.indexOf(name));
                } catch(e) { }
            }
            
            return true;

        },

        _refreshTopBar: function() {
            this.disable();

            for(let i in removeTopBar) {
                name = removeTopBar[i];
                if(Main.panel._statusArea[name]) {
                   Main.panel._statusArea[name].destroy();
                } else {
                    if(!(name in StatusIconDispatcher.STANDARD_TRAY_ICON_IMPLEMENTATIONS)) {
                        StatusIconDispatcher.STANDARD_TRAY_ICON_IMPLEMENTATIONS[name] = name;
                    }
                }
            }
            
        },
        
        _init: function() {
            this._settings = new Gio.Settings({schema: SETTINGS_SCHEMA});
            this._updateConfig();

        },

        _updateConfig: function() {
            removeTopBar = this._settings.get_strv(SETTINGS_REMOVE_TOPBAR);
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
