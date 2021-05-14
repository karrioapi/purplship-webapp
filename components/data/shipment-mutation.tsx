import { Customs, OperationResponse, Shipment, Address, ShipmentData, Parcel } from '@/api/index';
import { handleFailure } from '@/library/helper';
import { RestClient } from '@/library/rest';
import React, { useContext } from 'react';
import { LabelData } from '@/components/data/shipment-query';
import { CommodityType } from '@/library/types';
import { AppMode } from './app-mode';


export type ShipmentMutator<T> = T & {
  fetchRates: (shipment: Shipment | ShipmentData) => Promise<Shipment>;
  buyLabel: (shipment: Shipment) => Promise<Shipment>;
  voidLabel: (shipment: Shipment) => Promise<OperationResponse>;
  setOptions: (shipment_id: string, data: {}) => Promise<void>;
  addCustoms: (shipment_id: string, customs: Customs) => Promise<void>;
  discardCustoms: (id: string) => Promise<Shipment>;
  updateAddress: (address: Address) => Promise<Shipment>;
  updateCustoms: (customs: Customs) => Promise<Shipment>;
  updateParcel: (parcel: Parcel) => Promise<Shipment>;
  addCommodity: (customs_id: string, commodity: CommodityType) => Promise<void>;
  updateCommodity: (customs_id: string, commodity: CommodityType) => Promise<void>;
  discardCommodity: (customs_id: string, commodity_id: string) => Promise<Customs>;
}

const ShipmentMutation = <T extends {}>(Component: React.FC<ShipmentMutator<T>>) => (
  ({ children, ...props }: any) => {
    const purplship = useContext(RestClient);
    const { testMode } = useContext(AppMode);
    const { loadShipment, updateShipment, ...state } = useContext(LabelData);

    const fetchRates = async (shipment: Shipment | ShipmentData) => {
      return handleFailure((async () => {
        if ((shipment as Shipment).id !== undefined) {
          return purplship.shipments.rates({ id: (shipment as Shipment).id as string });
        } else {
          return purplship.shipments.create({ data: (shipment as ShipmentData), test: testMode });
        }
      })().then(r => { updateShipment(r); return r; }));
    };
    const buyLabel = async (shipment: Shipment) => handleFailure(
      purplship.shipments.purchase({
        data: {
          selected_rate_id: shipment.selected_rate_id as string,
          payment: shipment.payment,
          label_type: shipment.label_type as any
        },
        id: shipment.id as string
      })
    );
    const voidLabel = async (shipment: Shipment) => handleFailure(
      purplship.shipments.cancel({ id: shipment.id as string })
    );
    const setOptions = async (shipment_id: string, data: {}) => handleFailure(
      purplship.shipments
        .setOptions({ data, id: shipment_id })
        .then(r => { updateShipment(r); return r })
    );
    const addCustoms = async (shipment_id: string, customs: Customs) => handleFailure(
      purplship.shipments
        .addCustoms({ data: customs, id: shipment_id } as any)
        .then(r => { updateShipment(r); return r })
    );
    const discardCustoms = async (id: string) => handleFailure(
      purplship.customs
        .discard({ id })
        .then(() => loadShipment(state.shipment.id))
    );
    const updateAddress = async ({ id, ...data }: Address) => handleFailure(
      purplship.addresses
        .update({ id, data } as any)
        .then(() => loadShipment(state.shipment.id))
    );
    const updateCustoms = async ({ id, ...data }: Customs) => handleFailure(
      purplship.customs
        .update({ id, data } as any)
        .then(() => loadShipment(state.shipment.id))
    );
    const updateParcel = async ({ id, ...data }: Parcel) => handleFailure(
      purplship.parcels
        .update({ id, data } as any)
        .then(() => loadShipment(state.shipment.id))
    );
    const addCommodity = async (customs_id: string, commodity: CommodityType) => handleFailure(
      purplship.customs
        .addCommodity({ data: commodity, id: customs_id } as any)
        .then(() => loadShipment(state.shipment.id))
    );
    const updateCommodity = async (customs_id: string, commodity: CommodityType) => handleFailure(
      purplship.customs
        .update({ data: { commodities: [commodity] }, id: customs_id } as any)
        .then(() => loadShipment(state.shipment.id))
    );
    const discardCommodity = async (customs_id: string, commodity_id: string) => handleFailure(
      purplship.customs
        .discardCommodity({ id: customs_id, ck: commodity_id })
        .then(() => loadShipment(state.shipment.id))
    );

    return (
      <Component {...props}
        fetchRates={fetchRates}
        buyLabel={buyLabel}
        voidLabel={voidLabel}
        setOptions={setOptions}
        addCustoms={addCustoms}
        discardCustoms={discardCustoms}
        updateAddress={updateAddress}
        updateCustoms={updateCustoms}
        updateParcel={updateParcel}
        addCommodity={addCommodity}
        updateCommodity={updateCommodity}
        discardCommodity={discardCommodity}
      >
        {children}
      </Component>
    );
  }
);

export default ShipmentMutation;
