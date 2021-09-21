import { Operation, TrackingStatus } from '@/api/index';
import { handleFailure } from '@/library/helper';
import { RestClient } from '@/context/rest';
import React, { useContext } from 'react';
import { CreateCarrierNameEnum } from '@/api/apis/TrackersApi';


type TrackerMutator<T> = T & {
  createTracker: (tracking_number: string, carrier_name: string, test: boolean) => Promise<TrackingStatus>;
  removeTracker: (id: string) => Promise<Operation>;
}

const TrackerMutation = <T extends {}>(Component: React.FC<TrackerMutator<T>>) => (
  ({ children, ...props }: any) => {
    const purplship = useContext(RestClient);

    const createTracker = async (tracking_number: string, carrier_name: string, test: boolean) => handleFailure(
      purplship.trackers.create({ carrierName: carrier_name as CreateCarrierNameEnum, trackingNumber: tracking_number, test })
    );
    const removeTracker = async (idOrTrackingNumber: string) => handleFailure(
      purplship.trackers.remove({ idOrTrackingNumber })
    );

    return (
      <Component {...props}
        createTracker={createTracker}
        removeTracker={removeTracker}
      >
        {children}
      </Component>
    );
  }
);

export default TrackerMutation;
