import React, { useContext, useEffect } from 'react';
import { NotificationType, View } from '@/library/types';
import WebhookEditModal, { WebhookEditContext } from '@/components/webhook-edit-modal';
import WebhookTestModal from '@/components/webhook-test-modal';
import { Webhooks } from '@/context/webhooks-query';
import WebhookMutation from '@/context/webhook-mutation';
import { Loading } from '@/components/loader';
import ModeIndicator from '@/components/mode-indicator';
import { Notify } from '@/components/notifier';
import { Webhook } from '@/api/index';
import ConfirmModal, { ConfirmModalContext } from '@/components/confirm-modal';


interface WebhooksView extends View { }

const WebhooksPage: React.FC<WebhooksView> = WebhookMutation<WebhooksView>(({ removeWebhook, updateWebhook }) => {
  const { notify } = useContext(Notify)
  const { setLoading } = useContext(Loading);
  const { loading, results, load, refetch } = useContext(Webhooks);

  const update = async () => refetch && await refetch();
  const remove = (id: string) => async () => {
    await removeWebhook(id);
    update();
  };
  const toggle = ({ disabled, id }: Webhook) => async () => {
    try {
      const data = { id, disabled: !disabled };
      await updateWebhook({ id, ...data });
      notify({
        type: NotificationType.success,
        message: `webhook ${disabled ? 'activated' : 'deactivated'}!`
      });
      update();
    } catch (message) {
      notify({ type: NotificationType.error, message });
    }
  };

  useEffect(() => { !loading && load(); }, []);
  useEffect(() => { setLoading(loading); });

  return (
    <WebhookEditModal>
      <ConfirmModal>
        <ConfirmModalContext.Consumer>{({ confirmDeletion }) => <>
          <WebhookEditContext.Consumer>{({ editWebhook }) => <>
            <ModeIndicator />

            <header className="px-2 pt-1 pb-4">
              <span className="title is-4">Endpoints</span>
              <button className="button is-default is-pulled-right" onClick={() => editWebhook({ onConfirm: update })}>
                <span className="icon"><i className="fas fa-plus"></i></span>
                <span>Add endpoint</span>
              </button>
            </header>

            {(results.length > 0) && <div className="table-container">
              <table className="table is-fullwidth">

                <tbody>
                  <tr>
                    <td className="url is-size-7">URL</td>
                    <td className="mode is-size-7">MODE</td>
                    <td className="last_event is-size-7">LAST EVENT</td>
                    <td className="action"></td>
                  </tr>

                  {results.map(webhook => (
                    <tr key={webhook.id}>
                      <td>
                        <span className="is-subtitle is-size-7 has-text-weight-semibold has-text-grey">{webhook.url}</span>
                      </td>
                      <td className="mode is-vcentered">
                        <span className={`tag ${webhook.test_mode ? 'is-warning' : 'is-success'} is-centered`}>
                          {webhook.test_mode ? 'test' : 'live'}
                        </span>
                      </td>
                      <td>
                        <span className="is-subtitle is-size-7 has-text-weight-semibold has-text-grey">
                          {webhook.last_event_at || "No recent event"}
                        </span>
                      </td>
                      <td className="action is-vcentered">
                        <div className="buttons is-centered">
                          <button className="button is-white" onClick={toggle(webhook)}>
                            <span className={`icon is-medium ${webhook.disabled ? 'has-text-grey' : 'has-text-success'}`}>
                              <i className={`fas fa-${webhook.disabled ? 'toggle-off' : 'toggle-on'} fa-lg`}></i>
                            </span>
                          </button>
                          <WebhookTestModal className="button is-white" webhook={webhook}>
                            <span className="icon is-small">
                              <i className="fas fa-flask"></i>
                            </span>
                          </WebhookTestModal>
                          <button className="button is-white" onClick={() => editWebhook({
                            webhook: webhook,
                            onConfirm: update,
                          })}>
                            <span className="icon is-small">
                              <i className="fas fa-pen"></i>
                            </span>
                          </button>
                          <button className="button is-white" onClick={() => confirmDeletion({
                            label: "Webhook endpoint",
                            identifier: webhook.id as string,
                            onConfirm: remove(webhook.id as string),
                          })}>
                            <span className="icon is-small">
                              <i className="fas fa-trash"></i>
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            </div>}

            {(!loading && results.length == 0) && <div className="card my-6">

              <div className="card-content has-text-centered">
                <p>No webhooks added yet.</p>
                <p>Use the <strong>Add Enpoint</strong> button above to add</p>
              </div>

            </div>}

          </>}</WebhookEditContext.Consumer>
        </>}</ConfirmModalContext.Consumer>
      </ConfirmModal>
    </WebhookEditModal>
  );
});


export default WebhooksPage;