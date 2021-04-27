import { Customs, CustomsContentTypeEnum, CustomsIncotermEnum, Payment, PaymentCurrencyEnum, PaymentPaidByEnum, Shipment } from '@/api';
import React, { ChangeEvent, FormEvent, useContext, useReducer, useRef } from 'react';
import InputField from '@/components/generic/input-field';
import TextAreaField from '@/components/generic/textarea-field';
import CheckBoxField from '@/components/generic/checkbox-field';
import ButtonField from '@/components/generic/button-field';
import SelectField from '@/components/generic/select-field';
import { deepEqual, formatRef, isNone } from '@/library/helper';
import { Collection, CURRENCY_OPTIONS, NotificationType, PAYOR_OPTIONS } from '@/library/types';
import { UserData } from '@/components/data/user-query';
import { APIReference } from '../data/references-query';
import ShipmentMutation from '../data/shipment-mutation';
import { Notify } from '../notifier';


export const DEFAULT_CUSTOMS_CONTENT: Customs = {
    duty: undefined,
    certify: true,
    incoterm: CustomsIncotermEnum.Ddu,
    content_type: CustomsContentTypeEnum.Merchandise,
};
const DEFAULT_DUTY: Payment = {
    paid_by: PaymentPaidByEnum.Recipient,
    currency: PaymentCurrencyEnum.Usd
};

interface CustomsInfoFormComponent {
    value?: Customs;
    shipment?: Shipment;
    cannotOptOut?: boolean;
    update: (data: { changes?: Partial<Shipment>, refresh?: boolean }) => void;
}

function reducer(state: any, { name, value }: { name: string, value: string | boolean | object }) {
    switch (name) {
        case 'hasDuty':
            return { ...state, duty: value === true ? DEFAULT_DUTY : null };
        case 'optOut':
            return value === true ? null : { ...DEFAULT_CUSTOMS_CONTENT };
        default:
            return { ...state, [name]: value };
    }
}

const CustomsInfoForm: React.FC<CustomsInfoFormComponent> = ShipmentMutation<CustomsInfoFormComponent>(
    ({ value, shipment, cannotOptOut, update, children, updateCustoms, discardCustoms, addCustoms }) => {
        const { notify } = useContext(Notify);
        const { incoterms, customs_content_type } = useContext(APIReference);
        const [customs, dispatch] = useReducer(reducer, value, () => value);
        const form = useRef<any>(null);
        const handleChange = (event: React.ChangeEvent<any> & CustomEvent<{ name: keyof Customs, value: object }>) => {
            const target = event.target;
            const name = target.name;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            dispatch({ name, value });
        };
        const handleSubmit = async (e: FormEvent) => {
            e.preventDefault();
            try {
                if (customs.id !== undefined) {
                    await updateCustoms(customs);
                    update({ refresh: true });
                    notify({ type: NotificationType.success, message: 'Customs Declaration successfully updated!' });
                }
                else if (shipment?.id !== undefined) {
                    await addCustoms(shipment.id, customs);
                    update({ refresh: true });
                    notify({ type: NotificationType.success, message: 'Customs Declaration added updated!' });
                } else {
                    update({ changes: { customs } });
                    form.current?.dispatchEvent(
                        new CustomEvent('label-select-tab', { bubbles: true, detail: { nextTab: 'options' } })
                    );
                }
            } catch (err) {
                notify({ type: NotificationType.error, message: err });
            }
        };
        const applyOptOut = async (e: ChangeEvent<any>) => {
            e.preventDefault();
            try {
                if (!isNone(shipment?.id) && !isNone(shipment?.customs?.id)) {
                    await discardCustoms(shipment?.customs?.id as string);
                    notify({ type: NotificationType.success, message: 'Customs declaration discarded successfully!' });
                } else {
                    update({ changes: { customs: undefined } });
                }
            } catch (err) {
                notify({ type: NotificationType.error, message: err });
            }
        };

        return (
            <>
                {!cannotOptOut && <div className="columns is-multiline">
                    <CheckBoxField defaultChecked={isNone(customs)} onChange={handleChange} name="optOut" fieldClass="column mb-0 is-12 px-3 py-3 has-text-weight-semibold">
                        <span>Opt out of customs</span>
                    </CheckBoxField>
                </div>}

                {isNone(customs) && <div>
                    <ButtonField className="is-primary" fieldClass="has-text-centered mt-3" onClick={applyOptOut} disabled={isNone(value)}>
                        <span>Save</span>
                        <span className="icon is-small">
                            <i className="fas fa-chevron-right"></i>
                        </span>
                    </ButtonField>
                </div>}

                {!isNone(customs) && <form className="px-1 py-2" onSubmit={handleSubmit} ref={form}>

                    {React.Children.map(children, (child: any) => React.cloneElement(child, { ...child.props, customs, onChange: handleChange }))}

                    <div className="columns is-multiline mb-0">

                        <SelectField label="Content type" value={customs?.content_type} onChange={handleChange} name="content_type" className="is-fullwidth" fieldClass="column mb-0 is-6 px-2 py-1" required >
                            {customs_content_type && Object
                                .entries(customs_content_type as Collection)
                                .map(([code, name]) => (
                                    <option key={code} value={code}>{formatRef(name)}</option>
                                ))
                            }
                        </SelectField>

                        <SelectField label="incoterm" value={customs?.incoterm} onChange={handleChange} name="incoterm" className="is-fullwidth" fieldClass="column mb-0 is-6 px-2 py-1" required >
                            {incoterms && Object
                                .entries(incoterms as Collection)
                                .map(([code, name]) => (
                                    <option key={code} value={code}>{`${code} (${name})`}</option>
                                ))
                            }
                        </SelectField>

                        <InputField label="AES" defaultValue={customs?.aes} onChange={handleChange} name="aes" fieldClass="column mb-0 is-6 px-2 py-1" />

                        <InputField label="EEL / PFC" defaultValue={customs?.eel_pfc} onChange={handleChange} name="eel_pfc" fieldClass="column mb-0 is-6 px-2 py-1" />

                        <InputField label="certificate number" defaultValue={customs?.certificate_number} onChange={handleChange} name="certificate_number" fieldClass="column mb-0 is-6 px-2 py-1" />

                        <InputField label="invoice number" defaultValue={customs?.invoice} onChange={handleChange} name="invoice" fieldClass="column mb-0 is-6 px-2 py-1" />

                        <CheckBoxField defaultChecked={customs?.commercial_invoice} onChange={handleChange} name="commercial_invoice" fieldClass="column mb-0 is-12 px-2 py-2">
                            <span>Commercial Invoice</span>
                        </CheckBoxField>

                    </div>

                    <div className="columns is-multiline mb-0 pt-2">

                        <CheckBoxField defaultChecked={!isNone(customs?.duty)} onChange={handleChange} name="hasDuty" fieldClass="column mb-0 is-12 px-2 py-2">
                            <span>Duties</span>
                        </CheckBoxField>

                        <div className="columns column is-multiline mb-0 ml-6 my-1 px-2 py-0" style={{ borderLeft: "solid 2px #ddd", display: `${!isNone(customs?.duty) ? 'block' : 'none'}` }}>

                            <SelectField label="paid by" onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, paid_by: e.target.value } })} value={customs?.duty?.paid_by} name="paid_by" className="is-small is-fullwidth" fieldClass="column is-3 mb-0 px-1 py-2" required={!isNone(customs?.duty)}>
                                {PAYOR_OPTIONS.map(unit => <option key={unit} value={unit}>{formatRef(unit)}</option>)}
                            </SelectField>

                            <SelectField label="prefered currency" onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, currency: e.target.value } })} value={customs?.duty?.currency} name="currency" className="is-small is-fullwidth" fieldClass="column is-3 mb-0 px-1 py-2">
                                {CURRENCY_OPTIONS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                            </SelectField>

                            <InputField label="Declared value"  onChange={e => dispatch({ name: 'duty', value: { ...customs.duty, declared_value: e.target.value } })} defaultValue={customs?.duty?.declared_value} name="declared_value" type="number" min={0} step="any" className="is-small" fieldClass="column mb-0 is-3 px-1 py-2"/>

                        </div>

                    </div>

                    <div className="columns is-multiline mb-0 pt-2">

                        <TextAreaField label="content description" defaultValue={customs?.content_description} onChange={handleChange} name="content_description" fieldClass="column mb-0 is-12 px-2 py-2" placeholder="Content type description" />

                        <UserData.Consumer>
                            {({ user }) => (
                                <InputField label="Signed By" defaultValue={(customs?.signer || user?.full_name) as string} onChange={handleChange} name="signer" fieldClass="column mb-0 is-12 px-2 py-2" required={!cannotOptOut} />
                            )}
                        </UserData.Consumer>

                        <CheckBoxField defaultChecked={customs?.certify} onChange={handleChange} name="certify" fieldClass="column mb-0 is-12 px-2 py-2">
                            <span>I certify this customs declaration.</span>
                        </CheckBoxField>

                    </div>

                    <ButtonField type="submit" className="is-primary" fieldClass="has-text-centered mt-3" disabled={deepEqual(value, customs) && deepEqual(value?.duty, customs?.duty)}>
                        <span>{customs.id === undefined ? 'Continue' : 'Save'}</span>
                        {customs.id === undefined && <span className="icon is-small">
                            <i className="fas fa-chevron-right"></i>
                        </span>}
                    </ButtonField>

                </form>}
            </>
        )
    });

export default CustomsInfoForm;