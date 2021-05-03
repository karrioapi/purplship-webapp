import { formatRef, isNone } from '@/library/helper';
import { APIError, NotificationType, RequestError } from '@/library/types';
import { Customs, Payment, PaymentCurrencyEnum, PaymentPaidByEnum, Shipment, ShipmentLabelTypeEnum } from '@/api';
import { useNavigate } from '@reach/router';
import React, { useContext, useState } from 'react';
import AddressDescription from '@/components/descriptions/address-description';
import CustomsInfoDescription from '@/components/descriptions/customs-info-description';
import OptionsDescription from '@/components/descriptions/options-description';
import ParcelDescription from '@/components/descriptions/parcel-description';
import ButtonField from '@/components/generic/button-field';
import InputField from '@/components/generic/input-field';
import ShipmentMutation from './data/shipment-mutation';
import { LabelData } from './data/shipment-query';
import { Notify } from './notifier';

interface LiveRatesComponent {
    update: (payload: {}, refresh?: boolean) => void;
}

const DEFAULT_PAYMENT: Partial<Payment> = { paid_by: PaymentPaidByEnum.Sender };

const LiveRates: React.FC<LiveRatesComponent> = ShipmentMutation<LiveRatesComponent>(({ update, fetchRates, buyLabel }) => {
    const navigate = useNavigate();
    const { notify } = useContext(Notify);
    const { shipment } = useContext(LabelData);
    const [loading, setLoading] = useState<boolean>(false);
    const [selected_rate_id, setSelectedRate] = useState<string | undefined>(shipment?.selected_rate_id || undefined);
    const [label_type, setLabelType] = useState<ShipmentLabelTypeEnum>(shipment?.label_type || ShipmentLabelTypeEnum.Pdf);
    const [payment, setPayment] = useState<Partial<Payment>>(DEFAULT_PAYMENT);

    const computeDisabled = (shipment: Shipment) => {
        return (
            shipment.recipient.address_line1 === undefined ||
            shipment.shipper.address_line1 === undefined ||
            shipment.parcels.length === 0 ||
            loading === true
        );
    };
    const updateRates = async () => {
        if (computeDisabled(shipment)) return;
        try {
            setLoading(true);
            let payload = { ...shipment };
            const response = await fetchRates(payload);
            if (payload.id === undefined) navigate('/buy_label/' + response.id);
            update(shipment, true);
            if ((shipment.messages || []).length > 0) {
                const error: APIError = {
                    error: {
                        code: "notes",
                        details: { messages: shipment.messages } as APIError['error']['details']
                    }
                };
                const message = new RequestError(error);

                notify({ type: NotificationType.warning, message });
            }
        } catch (err) {
            notify({ type: NotificationType.error, message: err });
        } finally {
            setLoading(false);
        }
    };
    const buyShipment = async () => {
        try {
            setLoading(true);
            let currency = (shipment.options || {} as any).currency || PaymentCurrencyEnum.Cad;
            await buyLabel({
                ...shipment,
                label_type: label_type,
                selected_rate_id: selected_rate_id as string,
                payment: { ...payment, currency }
            });
            update(shipment as Shipment);
            notify({ type: NotificationType.success, message: 'Label successfully purchased!' });
            navigate('/');
        } catch (err) {
            notify({ type: NotificationType.error, message: err });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="columns is-multiline">

                <div className="column is-12 pb-2">
                    <span className="title is-5">Shipment Details</span>

                    <button className={`button is-small is-outlined is-info is-pulled-right ${loading ? 'is-loading' : ''}`} onClick={updateRates} disabled={computeDisabled(shipment)}>
                        <span>Fetch Rates</span>
                    </button>
                </div>

                <div className="column is-12 py-1" style={shipment.shipper.address_line1 === undefined ? { display: 'none' } : {}}>

                    <p className="is-title is-size-6 my-2 has-text-weight-semibold">Shipper Address</p>
                    <AddressDescription address={shipment.shipper} />

                </div>

                <div className="column is-12 py-1" style={{ display: `${shipment.recipient.address_line1 === undefined ? 'none' : 'block'}` }}>

                    <p className="is-title is-size-6 my-2 has-text-weight-semibold">Recipient Address</p>
                    <AddressDescription address={shipment.recipient} />

                </div>

                <div className="column is-12 py-1" style={{ display: `${shipment.parcels.length == 0 ? 'none' : 'block'}` }}>

                    <p className="is-title is-size-6 my-2 has-text-weight-semibold">Parcel</p>
                    <ParcelDescription parcel={shipment.parcels[0]} />

                </div>

                <div className="column is-12 py-1" style={{ display: `${Object.values(shipment.options as object).length === 0 ? 'none' : 'block'}` }}>

                    <p className="is-title is-size-6 my-2 has-text-weight-semibold">Options</p>
                    <OptionsDescription options={shipment.options} />

                </div>

                <div className="column is-12 py-1" style={{ display: `${isNone(shipment.customs) ? 'none' : 'block'}` }}>

                    <p className="is-title is-size-6 my-2 has-text-weight-semibold">Customs Declaration</p>
                    <CustomsInfoDescription customs={(shipment.customs || {}) as Customs} />

                </div>

                <div className="column is-12 py-3" style={{ display: `${(shipment.rates || []).length === 0 ? 'none' : 'block'}` }}>

                    <h6 className="is-title is-size-6 mt-1 mb-4 has-text-weight-semibold">Live Rates</h6>

                    <ul className="menu-list py-2" style={{ maxHeight: "16em", overflowY: "auto", overflowX: "hidden" }}>
                        {shipment.rates?.map(rate => (
                            <li key={rate.id}>
                                <a className={`columns mb-0 ${rate.id === selected_rate_id ? 'has-text-grey-dark' : 'has-text-grey'}`} onClick={() => setSelectedRate(rate.id)}>

                                    <span className={`icon is-medium ${rate.id === selected_rate_id ? 'has-text-success' : ''}`}>
                                        {(rate.id === selected_rate_id) ? <i className="fas fa-check-square"></i> : <i className="fas fa-square"></i>}
                                    </span>

                                    <div className="is-size-7 has-text-weight-semibold">
                                        <h6 className="has-text-weight-bold">{formatRef(rate.service as string)}</h6>
                                        <span>{rate.total_charge} {rate.currency}</span>
                                        {!isNone(rate.transit_days) && <span> - {rate.transit_days} Transit days</span>}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>


                </div>

                <div className="column is-12 py-3" style={{ display: `${(shipment.rates || []).length === 0 ? 'none' : 'block'}` }}>

                    <h6 className="is-title is-size-6 mt-1 mb-4 has-text-weight-semibold">Select your label type</h6>
                    <div className="control">
                        <label className="radio">
                            <input className="mr-1" type="radio" name="label_type" defaultChecked={label_type === ShipmentLabelTypeEnum.Pdf} onChange={() => setLabelType(ShipmentLabelTypeEnum.Pdf)} />
                            <span className="is-size-6 has-text-weight-bold">{ShipmentLabelTypeEnum.Pdf}</span>
                        </label>
                        <label className="radio">
                            <input className="mr-1" type="radio" name="label_type" defaultChecked={label_type === ShipmentLabelTypeEnum.Zpl} onChange={() => setLabelType(ShipmentLabelTypeEnum.Zpl)} />
                            <span className="is-size-6 has-text-weight-bold">{ShipmentLabelTypeEnum.Zpl}</span>
                        </label>
                    </div>

                </div>

                <div className="column is-12 py-3" style={{ display: `${(shipment.rates || []).length === 0 ? 'none' : 'block'}` }}>

                    <h6 className="is-title is-size-6 mt-1 mb-4 has-text-weight-semibold">Shipment Paid By</h6>

                    <div className="control">
                        <label className="radio">
                            <input className="mr-1" type="radio" name="paid_by" defaultChecked={payment.paid_by === PaymentPaidByEnum.Sender} onChange={() => setPayment({ paid_by: PaymentPaidByEnum.Sender })} />
                            <span className="is-size-6 has-text-weight-bold">{formatRef(PaymentPaidByEnum.Sender.toString())}</span>
                        </label>
                        <label className="radio">
                            <input className="mr-1" type="radio" name="paid_by" defaultChecked={payment.paid_by === PaymentPaidByEnum.Recipient} onChange={() => setPayment({ ...payment, paid_by: PaymentPaidByEnum.Recipient })} />
                            <span className="is-size-6 has-text-weight-bold">{formatRef(PaymentPaidByEnum.Recipient.toString())}</span>
                        </label>
                        <label className="radio">
                            <input className="mr-1" type="radio" name="paid_by" defaultChecked={payment.paid_by === PaymentPaidByEnum.ThirdParty} onChange={() => setPayment({ ...payment, paid_by: PaymentPaidByEnum.ThirdParty })} />
                            <span className="is-size-6 has-text-weight-bold">{formatRef(PaymentPaidByEnum.ThirdParty.toString())}</span>
                        </label>
                    </div>

                    {(payment.paid_by !== PaymentPaidByEnum.Sender) && <div className="columns ml-3 my-1 px-2 py-0" style={{ borderLeft: "solid 2px #ddd" }}>
                        <InputField label="account number" defaultValue={payment?.account_number as string} onChange={e => setPayment({ ...payment, account_number: e.target.value })} fieldClass="column"/>
                    </div>}

                </div>

            </div>

            <ButtonField
                onClick={buyShipment}
                fieldClass="has-text-centered mt-3"
                className={`is-medium is-success ${loading ? 'is-loading' : ''}`}
                style={(shipment.rates || []).length === 0 ? { display: 'none' } : {}}
                disabled={(shipment.rates || []).filter(r => r.id === selected_rate_id).length === 0}>
                <span>Buy</span>
            </ButtonField>

        </div>
    )
});

export default LiveRates;