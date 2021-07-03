import React from 'react';
import OrganizationUpdateInput from '@/components/organization-update-input';

interface OrganizationManagementComponent { }

const OrganizationManagement: React.FC<OrganizationManagementComponent> = () => {
  return (
    <>

      <div className="columns py-6">
        <div className="column is-5 pr-6">
          <p className="subtitle is-6 py-1">Organization</p>
        </div>

        <div className="column is-7">

          <OrganizationUpdateInput label="name" propertyKey="name" inputType="text" />

        </div>
      </div>

    </>
  )
};

export default OrganizationManagement;