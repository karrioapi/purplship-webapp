import React, { useContext, useEffect } from 'react';
import { APIReference } from '@/context/references-query';
import { SystemConnectionType } from '@/context/system-connections-query';
import { isNone } from '@/library/helper';
import CopiableLink from '../copiable-link';

interface ConnectionDescriptionComponent {
    connection: SystemConnectionType;
}

const CAPABILITY_DETAILS: any = {
    "pickup": "Use this account can be used to schedule pickup",
    "rating": "Use this account to get our negotiated rates",
    "shipping": "Use this account to buy shipping labels",
    "tracking": "Use this account to track shipments",
};

const ConnectionDescription: React.FC<ConnectionDescriptionComponent> = ({ connection }) => {
    const { carrier_capabilities } = useContext(APIReference);
    const [raw_capabilities, setRawCapabilities] = React.useState<string[]>([]);

    useEffect(() => {
        if (isNone(carrier_capabilities)) return;

        setRawCapabilities((carrier_capabilities as any)[connection.carrier_id]);
    }, [carrier_capabilities]);

    return (
        <div className="content is-small">
            <ul>
                <li>
                    <span className="is-size-7 my-1 has-text-weight-semibold">carrier id: {connection.carrier_id}</span>
                </li>

                {connection.capabilities.map(capability => {
                    if (raw_capabilities.filter(raw_capability => raw_capability.includes(capability)).length > 0) {
                        return (
                            <li className="is-size-7 my-1 has-text-weight-semibold">{CAPABILITY_DETAILS[capability]}</li>
                        );
                    }

                    return <></>;
                })}

            </ul>
        </div>
    );
};

export default ConnectionDescription;
