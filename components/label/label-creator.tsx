import { APIError, NotificationType, RequestError, View } from '@/library/types';
import { useNavigate } from '@reach/router';
import React, { useContext, useEffect, useState } from 'react';
import CustomsInfoForm from '@/components/form-parts/customs-info-form';
import AddressForm from '@/components/form-parts/address-form';
import ShipmentOptions from '@/components/form-parts/shipment-options';
import ParcelForm from '@/components/form-parts/parcel-form';
import LiveRates from '@/components/live-rates';
import Tabs from '@/components/generic/tabs';
import { Shipment, ShipmentStatusEnum } from '@/api/index';
import { isNone } from '@/library/helper';
import { APIReference } from '@/components/data/references-query';
import { LabelData, } from '@/components/data/shipment-query';
import { DefaultTemplatesData } from '@/components/data/default-templates-query';
import { Notify } from '@/components/notifier';
import NavLink from '@/components/generic/navlink';
import { AppMode } from '@/components/data/app-mode';
import ModeIndicator from '@/components/mode-indicator';


interface LabelCreatorComponent extends View {
    id?: string;
}

const LabelCreator: React.FC<LabelCreatorComponent> = ({ id }) => {
    const navigate = useNavigate();
    const { notify } = useContext(Notify);
    const { basePath } = useContext(AppMode);
    const { countries } = useContext(APIReference);
    const { shipment, loading, loadShipment, updateShipment } = useContext(LabelData);
    const { default_address, ...template } = useContext(DefaultTemplatesData);
    const tabs = ["shipper", "recipient", "parcel", "customs info", "options"];
    const [ready, setReady] = useState<boolean>(false);
    const [ckey, setKey] = useState<string>(`${id}-${Date.now()}`);

    const update = ({ changes, refresh }: { changes?: Partial<Shipment>, refresh?: boolean | undefined }) => {
        if (!isNone(changes)) updateShipment(changes as Partial<Shipment>);
        if (refresh) setKey(`${id}-${Date.now()}`);
    };

    useEffect(() => {
        if (!loading && shipment?.id !== id) {
            loadShipment(id)
                .then(({ status, messages }) => {
                    if (isNone(status) || status === ShipmentStatusEnum.Created) {
                        setKey(`${id}-${Date.now()}`);
                        if ((messages || []).length > 0) {
                            const error: APIError = {
                                error: { code: "notes", details: { messages } as APIError['error']['details'] }
                            };
                            const message = new RequestError(error);

                            notify({ type: NotificationType.warning, message });
                        }
                    } else {
                        notify({ type: NotificationType.info, message: 'Label already purchased!' });
                        navigate(basePath);
                    }
                });
        }
    }, []);
    useEffect(() => { if (!isNone(countries)) setReady(true); }, [countries, default_address !== undefined]);
    useEffect(() => { if (!template.loading) template.load(); }, []);

    return (
        <>
            <ModeIndicator />
            <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                <ul>
                    <li><NavLink to="/">Shipments</NavLink></li>
                    <li className="is-active"><a href="#" aria-current="page">Create Label</a></li>
                </ul>
            </nav>

            {ready && <div className="columns px-2 pb-6">
                <div className="column is-7 px-0" style={{ minHeight: '850px' }}>

                    <div className="card px-3 py-3" style={{ overflow: 'visible' }}>
                        <Tabs tabs={tabs} disabled={filterDisabled(tabs, shipment)} eventKey="label-select-tab" style={{ overflowY: 'auto', minHeight: '100%', maxHeight: '75vh' }}>

                            <AddressForm key={`${ckey}-shipper`} value={shipment.shipper} default_value={default_address} shipment={shipment} update={update} name="shipper" />

                            <AddressForm key={`${ckey}-recipient`} value={shipment.recipient} shipment={shipment} update={update} name="recipient" />

                            <ParcelForm key={`${ckey}-parcel`} value={shipment.parcels[0]} shipment={shipment} update={update} />

                            <CustomsInfoForm key={`${ckey}-customs`} value={shipment.customs} shipment={shipment} update={update} />

                            <ShipmentOptions key={`${ckey}-options`} shipment={shipment} update={update} />

                        </Tabs>
                    </div>

                </div>
                <div className="column is-5 pb-6">

                    <div className="card px-3 py-3">
                        <LiveRates key={ckey} update={update} />
                    </div>

                </div>
            </div>}

            {!ready && <div className="card my-6">

                <div className="card-content has-text-centered">
                    <span className="icon has-text-info is-large">
                        <i className="fas fa-spinner fa-pulse"></i>
                    </span>
                </div>

            </div>}

        </>
    )
};



function filterDisabled(tabs: string[], shipment: Shipment) {
    return tabs.reduce((disabled: string[], value: string) => {
        const is_local = shipment?.shipper.country_code === shipment?.recipient.country_code;

        // Disable tab if >>>
        if (
            // is 'recipient' AND 'shipment.shipper' hasn't been defined yet
            (value === "recipient" && shipment.shipper.address_line1 === undefined)

            || // OR

            // is 'parcel' AND 'shipment.recipient' hasn't been defined yet
            (value === "parcel" && shipment.recipient.address_line1 === undefined)

            || // OR

            // is 'customs info' AND local shipment
            (value === "customs info" && is_local)

            || // OR

            // is 'customs info' AND 'shipment.parcels' is empty
            (value === "customs info" && shipment.parcels.length == 0)

            || // OR

            // is 'options' AND 'shipment.parcels' is empty
            (value === "options" && shipment.parcels.length == 0)
        ) {
            return disabled.concat(value);
        }

        return disabled;
    }, []);
};

export default LabelCreator;