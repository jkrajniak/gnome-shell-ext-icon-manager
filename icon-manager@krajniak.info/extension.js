/*
 * gnome-shell-extension-icon-manager
 * 
 * Configure icons which appear on system system-icons
 *  
 * This file is part of gnome-shell-extension-icons
 *
 * This is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This file is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gnome-shell-ext-SkypeNotification  If not, see <http://www.gnu.org/licenses/>.
 *
 * 
 * Copyright (C) 2011
 * Author: Jakub Krajniak <jkrajniak@gmail.com>
 * 
 */

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;

const Panel = imports.ui.panel;
const StatusIconDispatcher = imports.ui.statusIconDispatcher;

const SETTINGS_SCHEMA = 'org.gnome.shell.extensions.icon-manager';
const SETTINGS_KEY_TOPBAR = 'top_bar';
const SETTINGS_KEY_TRAYBAR = "tray_bar"

function IconManager() {
        this._init();
}

IconManager.prototype = {
        _init: function() {
                
        }
}

function main() {

    StatusIconDispatcher.STANDARD_TRAY_ICON_IMPLEMENTATIONS['tomboy'] = 'tomboy';
    Panel.STANDARD_TRAY_ICON_SHELL_IMPLEMENTATION['a11y'] = '';
    Panel.STANDARD_TRAY_ICON_SHELL_IMPLEMENTATION['bluetooth'] = '';

}
