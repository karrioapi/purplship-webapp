import { NotificationType } from '@/library/types';
import React, { useContext, useState } from 'react';
import { Notify } from '@/components/notifier';
import OrganizationMutation from '@/context/organization-mutation';
import { Organizations, OrganizationType } from '@/context/organizations-query';

interface OrganizationUpdateInputComponent {
    label: string;
    inputType: string;
    propertyKey: keyof OrganizationType;
}

const OrganizationUpdateInput: React.FC<OrganizationUpdateInputComponent> = OrganizationMutation<OrganizationUpdateInputComponent>(
    ({ label, inputType, propertyKey, updateOrganization }) => {
        const { organization, load } = useContext(Organizations);
        const { notify } = useContext(Notify);
        const [key, setKey] = useState<string>(`${propertyKey}-${Date.now()}`);
        const [originalValue, _] = useState<string>(((organization || {}) as any)[propertyKey] || "");
        const [propertyValue, setPropertyValue] = useState<string>("");
        const [hasChanged, setHasChanged] = useState<boolean>(false);

        const cancel = (e: React.MouseEvent) => {
            e.preventDefault();
            setPropertyValue(originalValue);
            setHasChanged(false);
            setKey(`${propertyKey}-${Date.now()}`);
        };
        const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            try {
                await updateOrganization({ id: organization.id, [propertyKey]: propertyValue });
                load();
                setHasChanged(false);
                notify({
                    type: NotificationType.success, message: `${propertyValue} updated successfully!`
                });
            } catch (error) {
                notify({ type: NotificationType.error, message: error });
            }
        };
        const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPropertyValue(e.target.value);
            setHasChanged(e.target.value !== (organization as any)[propertyKey]);
        };

        return (
            <form className="field" onSubmit={handleSubmit} key={key}>
                <label className="label">{label}</label>
                <div className="control">
                    <input
                        className="input is-small mr-1"
                        onChange={handleOnChange}
                        defaultValue={((organization || {}) as any)[propertyKey] || ""}
                        type={inputType}
                        style={{ maxWidth: "60%" }}
                        disabled={!organization?.user?.is_admin}
                        required 
                        />

                    <input className="button is-success is-small mr-1" type="submit" value="Save"
                        style={{ visibility: (hasChanged ? "visible" : "hidden") }} />
                    <button className="button is-small"
                        onClick={cancel}
                        hidden={!hasChanged}
                        disabled={!organization?.user?.is_admin}
                        style={{ visibility: (hasChanged ? "visible" : "hidden") }}>
                        <span>Cancel</span>
                    </button>
                </div>
            </form>
        )
    });

export default OrganizationUpdateInput;