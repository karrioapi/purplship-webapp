import React, { useContext, useEffect, useState } from 'react';
import InputField from '@/components/generic/input-field';
import { NotificationType } from '@/library/types';
import ButtonField from '@/components/generic/button-field';
import SelectField from '@/components/generic/select-field';
import { APIReference } from '@/context/references-query';
import { UserConnections, UserConnectionType } from '@/context/user-connections-query';
import { SystemConnections, SystemConnectionType } from '@/context/system-connections-query';
import TrackerMutation from '@/context/tracker-mutation';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';

type Connection = UserConnectionType | SystemConnectionType;
interface TrackShipmentModalComponent {
    className?: string;
    onUpdate?: () => void;
}

const TrackShipmentModal: React.FC<TrackShipmentModalComponent> = TrackerMutation<TrackShipmentModalComponent>(
    ({ children, className, onUpdate, createTracker }) => {
        const { notify } = useContext(Notify);
        const { carriers } = useContext(APIReference);
        const { loading, setLoading } = useContext(Loading);
        const { user_connections, ...user } = useContext(UserConnections);
        const { system_connections, ...system } = useContext(SystemConnections);
        const [isActive, setIsActive] = useState<boolean>(false);
        const [key, setKey] = useState<string>(`tracker-${Date.now()}`);
        const [carrier, setCarrier] = useState<Connection>();
        const [trackingNumber, setTrackingNumber] = useState<string>();

        const close = (_?: React.MouseEvent) => {
            setCarrier(undefined);
            setTrackingNumber(undefined);
            setKey(`tracker-${Date.now()}`);
            setIsActive(false);
            onUpdate && onUpdate();
        };
        const create = async (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            setLoading(true);
            try {
                await createTracker(trackingNumber as string, carrier?.carrier_name as string, carrier?.test as boolean);
                notify({ type: NotificationType.success, message: 'Tracker successfully added!' });
                close();
            } catch (message) {
                notify({ type: NotificationType.error, message });
            }
            setLoading(false);
        };
        const updateCarrier = (carrierId: string) => {
            const all_carriers = [...(user_connections || []), ...(system_connections || [])];
            const carrier = all_carriers.find(carrier => carrier?.carrier_id === carrierId);
            setCarrier(carrier);
        };

        useEffect(() => { if (!user.loading) user.load(); }, []);
        useEffect(() => { if (!system.loading) system.load(); }, []);

        return (
            <Notifier>
                <button className={className} onClick={() => setIsActive(true)}>
                    {children}
                </button>

                <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
                    <div className="modal-background" onClick={close}></div>
                    {isActive && <form className="modal-card" onSubmit={create}>
                        <section className="modal-card-body">
                            <h3 className="subtitle is-3">Track a Shipment</h3>

                            <InputField label="Tracking Number" defaultValue={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} fieldClass="mt-6" required />

                            <SelectField label="Carrier" onChange={e => updateCarrier(e.target.value)} className="is-fullwidth" required>
                                <option value="">Select a carrier</option>

                                {[...(user_connections || []), ...(system_connections || [])]
                                    .filter(c => c.active)
                                    .map((carrier, index) => (
                                        <option key={index} value={carrier.carrier_id}>
                                            {`${(carriers as any)[carrier.carrier_name]} ${carrier.test ? '(Sandbox)' : ''}`}
                                        </option>
                                    ))}
                            </SelectField>

                            <div className="p-3 my-5"></div>
                            <ButtonField type="submit" 
                                className={`is-primary ${loading ? 'is-loading' : ''} m-0`}
                                fieldClass="form-floating-footer p-3"
                                controlClass="has-text-centered">
                                <span>Submit</span>
                            </ButtonField>
                        </section>
                    </form>}
                    
                    <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
                </div>
            </Notifier>
        )
    });

export default TrackShipmentModal;