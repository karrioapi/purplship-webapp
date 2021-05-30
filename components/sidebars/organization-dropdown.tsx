import { Organizations, OrganizationType } from '@/context/organizations-query';
import { TokenData } from '@/context/token-query';
import { getCookie, isNone } from '@/library/helper';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Loading } from '@/components/loader';
import { AppMode } from '@/context/app-mode';

const OrganizationDropdown: React.FC = () => {
    const btn = useRef<HTMLButtonElement>(null);
    const { basePath } = useContext(AppMode);
    const { authenticateOrg, token } = useContext(TokenData);
    const { organizations, load, loading } = useContext(Organizations);
    const { setLoading } = useContext(Loading)
    const [active, setActive] = useState<boolean>(false);
    const [selected, setSelected] = useState<OrganizationType>();

    const handleOnClick = (e: React.MouseEvent) => {
        if (!active) {
            setActive(true);
            document.addEventListener('click', onBodyClick);
        }
        e.stopPropagation();
    };
    const onBodyClick = (e: MouseEvent) => {
        if (e.target !== btn.current) {
            setActive(false);
            document.removeEventListener('click', onBodyClick);
        }
    };
    const select = (org: OrganizationType) => async (e: any) => {
        if (!active) {
            setActive(true);
            document.addEventListener('click', onBodyClick);
        }
        e.stopPropagation();

        if (org.id === selected?.id) return;
        setLoading(true);
        setSelected(org);
        await authenticateOrg(org.id, org.token);
        setTimeout(() => location.pathname = basePath, 1000);
    };

    useEffect(() => { (!loading && load) && load(); }, []);
    useEffect(() => {
        if ((organizations || []).length > 0) {
            const currentOrgId = getCookie("org_id");
            const current = organizations.find(org => org.id === currentOrgId)
            !isNone(current) && setSelected(current);
        }
    }, [organizations]);
    useEffect(() => {
        if ((organizations || []).length > 0 && selected !== undefined && token !== undefined && selected?.token !== token.key) {
            load();
        }
    }, [token, organizations]);

    return (
        <>
            {((organizations || []).length > 0) && <div className={`dropdown ${active ? 'is-active' : ''}`}>
                <div className="dropdown-trigger">
                    <button className="button is-light" aria-haspopup="true" aria-controls="dropdown-menu" onClick={handleOnClick} ref={btn}>
                        <i className="fas fa-store"></i>
                        <span className="px-3">{selected?.name}</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {(organizations || []).map(org => (
                            <a key={org.id} className={`dropdown-item ${(org.id === selected?.id) ? 'is-active' : ''}`} onClick={select(org)}>
                                <i className="fas fa-store"></i>
                                <span className="px-2">{org.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>}

            {(!loading && (organizations || []).length === 0) && <img src="/static/branding/logo.svg" width="80" />}
        </>
    );
};

export default OrganizationDropdown;