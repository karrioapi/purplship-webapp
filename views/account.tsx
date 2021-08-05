import React, { useContext } from 'react';
import { View } from '@/library/types';
import CloseAccountAction from '@/components/close-account-action';
import ProfileUpdateInput from '@/components/profile-update-input';
import Tabs from '@/components/generic/tabs';
import { FeatureFlags } from '@/context/feature-flags';
import OrganizationManagement from '@/components/sections/organization-management';

interface AccountView extends View { }

const Account: React.FC<AccountView> = () => {
  const { MULTI_ORGANIZATIONS } = useContext(FeatureFlags);

  return (
    <>

      <header className="px-2 pt-1 pb-4">
        <span className="title is-4">Account Settings</span>
      </header>


      <Tabs tabs={['Profile', 'Account']}>

        <div>

          <div className="columns py-6">
            <div className="column is-5 pr-6">
              <p className="subtitle is-6 py-1">Login</p>
              <p className="is-size-7 pr-6">Your email address is your identity on Purplship and is used to log in.</p>
            </div>

            <div className="column is-7">
              <ProfileUpdateInput label="Email Address" propertyKey="email" inputType="email" />
              <ProfileUpdateInput label="Name (Optional)" propertyKey="full_name" inputType="text" />

              <label className="label">Password</label>
              <div className="control">
                <a href="/password_change" className="button is-primary is-small">Change your password</a>
              </div>
            </div>
          </div>

        </div>

        <div>

          {MULTI_ORGANIZATIONS && <>

            <OrganizationManagement />

            <hr />

          </>}

          <div className="columns py-6">
            <div className="column is-5">
              <p className="subtitle is-6 py-1">Close Account</p>
              <p className="is-size-7">
                <strong>Warning:</strong> You will lose access to your Purplship services
              </p>
            </div>

            <div className="column is-5">
              <CloseAccountAction>
                <span>Close this account...</span>
              </CloseAccountAction>
            </div>
          </div>

        </div>

      </Tabs>

    </>
  );
}

export default Account;