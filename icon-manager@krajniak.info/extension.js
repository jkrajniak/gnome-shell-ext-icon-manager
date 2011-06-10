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

const Panel = imports.ui.panel;
const StatusIconDispatcher = imports.ui.statusIconDispatcher;

const SETTINGS_SCHEMA = 'org.gnome.shell.extensions.icon-manager';
const SETTINGS_KEY_TOPBAR = 'top-bar';

function IconManager() {
        this._init();
}

IconManager.prototype = {
        _init: function() {
                this._settings = new Gio.Settings({schema: SETTINGS_SCHEMA});
                this.topBar =  this._settings.get_strv(SETTINGS_KEY_TOPBAR);
                
                // remove icons from top bar
                for(let idx in this.topBar) {
                        // remove from top bar
                        if(this.topBar[idx] in Panel.STANDARD_TRAY_ICON_SHELL_IMPLEMENTATION) {
                                Panel.STANDARD_TRAY_ICON_SHELL_IMPLEMENTATION[this.topBar[idx]] = '';
                        } else { // put in top bar
                                StatusIconDispatcher.STANDARD_TRAY_ICON_IMPLEMENTATIONS[this.topBar[idx]] = this.topBar[idx];
                        }
                }
        }
}

function main() {
    iconManager = new IconManager();
}
