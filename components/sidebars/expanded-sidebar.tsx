import React, { useContext, useRef } from 'react';
import NavLink from '@/components/generic/navlink';
import { AppMode } from '@/components/data/app-mode';

interface ExpandedSidebarComponent { }

const ExpandedSidebar: React.FC<ExpandedSidebarComponent> = () => {
    const { testMode, switchMode } = useContext(AppMode);
    const sidebar = useRef<HTMLDivElement>(null);
    const dismiss = (e: React.MouseEvent) => {
        e.preventDefault();
        sidebar.current?.classList.remove('is-mobile-active');
    };

    return (
        <div className="plex-sidebar" ref={sidebar}>
            <div className="sidebar-header">
                <img src="/static/branding/logo.svg" alt="Purplship" width="80" />
                <button className="menu-icon v-5 is-open mobile-item is-block mobile-sidebar-trigger" onClick={dismiss}>
                    <span></span>
                </button>
            </div>
            <div className="sidebar-menu has-slimscroll py-6" style={{ height: "calc(100% - 60px)" }}>
                <NavLink to="/">
                    <span>Shipments</span>
                </NavLink>

                <NavLink to="/trackers">
                    <span>Trackers</span>
                </NavLink>

                <NavLink to="/configurations/carriers">
                    <span>Carriers</span>
                </NavLink>

                <NavLink to="/configurations/addresses">
                    <span>Addresses</span>
                </NavLink>

                <NavLink to="/configurations/parcels">
                    <span>Parcels</span>
                </NavLink>

                <NavLink to="/configurations/customs_infos">
                    <span>Customs</span>
                </NavLink>


                <div className="menu-item menu-label my-0">
                    <span>Developers</span>
                </div>

                <NavLink className="menu-item ml-6" to="/settings/api">
                    <span>API</span>
                </NavLink>

                {/* <NavLink className="menu-item ml-6" to="/settings/webhooks">
                    <span>Webhooks</span>
                </NavLink> */}

                <NavLink className="menu-item ml-6" to="/api_logs">
                    <span>Logs</span>
                </NavLink>

                {testMode ?
                    <a className="menu-item mode-menu-item" onClick={switchMode}>
                        <i className="fas fa-toggle-on"></i>
                        <span className="mode-menu-item">Viewing test data</span>
                    </a>
                    :
                    <a className="menu-item has-text-grey" onClick={switchMode}>
                        <i className="fas fa-toggle-off"></i>
                        <span>View test data</span>
                    </a>
                }

                <NavLink className="menu-item bottom-menu-item" to="/settings/account">
                    <i className="fas fa-cog"></i>
                    <span>Account Settings</span>
                </NavLink>
            </div>
        </div>
    );
}

export default ExpandedSidebar;
