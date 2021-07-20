import React, { useContext, useEffect } from 'react';
import { View } from '@/library/types';
import ParcelDescription from '@/components/descriptions/parcel-description';
import ParcelEditModal from '@/components/parcel-edit-modal';
import DeleteItemModal from '@/components/delete-item-modal';
import { ParcelTemplates } from '@/context/parcel-templates-query';
import TemplateMutation from '@/context/template-mutation';
import { isNone } from '@/library/helper';
import { Loading } from '@/components/loader';

interface ParcelsView extends View { }

const ParcelsPage: React.FC<ParcelsView> = TemplateMutation<ParcelsView>(({ deleteTemplate }) => {
  const { setLoading } = useContext(Loading);
  const { loading, templates, previous, next, load, loadMore, refetch } = useContext(ParcelTemplates);

  const refresh = () => refetch && refetch();
  const remove = (id: string) => async () => {
    await deleteTemplate(id);
    refresh();
  };

  useEffect(() => { !loading && load() }, []);
  useEffect(() => { setLoading(loading); });

  return (
    <>

      <header className="px-2 pt-1 pb-4">
        <span className="subtitle is-4">Parcels</span>
        <ParcelEditModal className="button is-success is-pulled-right" onUpdate={refresh}>
          <span>New Parcel</span>
        </ParcelEditModal>
      </header>

      {(templates?.length > 0) && <div className="table-container">
        <table className="table is-fullwidth">

          <tbody className="templates-table">
            <tr>
              <td className="has-text-weight-bold" colSpan={2}>Parcel Templates</td>
              <td className="action"></td>
            </tr>

            {templates.map((template) => (

              <tr key={`${template.id}-${Date.now()}`}>
                <td className="template">
                  <p className="is-subtitle is-size-6 my-1 has-text-weight-semibold">{template.label}</p>
                  <ParcelDescription parcel={template.parcel} />
                </td>
                <td className="default is-vcentered">
                  {template.is_default && <span className="is-size-7 has-text-weight-semibold">
                    <span className="icon has-text-success"><i className="fas fa-check"></i></span> Default shipping parcel
                  </span>}
                </td>
                <td className="action is-vcentered">
                  <div className="buttons is-centered">
                    <ParcelEditModal className="button is-white" parcelTemplate={template} onUpdate={refresh}>
                      <span className="icon is-small">
                        <i className="fas fa-pen"></i>
                      </span>
                    </ParcelEditModal>
                    <DeleteItemModal label="Parcel Template" identifier={template.id as string} onConfirm={remove(template.id)}>
                      <span className="icon is-small">
                        <i className="fas fa-trash"></i>
                      </span>
                    </DeleteItemModal>
                  </div>
                </td>
              </tr>

            ))}
          </tbody>

        </table>

        <footer className="px-2 py-2 is-vcentered">
          <span className="is-size-7 has-text-weight-semibold">{templates.length} results</span>

          <div className="buttons has-addons is-centered is-pulled-right">
            <button className="button is-small" onClick={() => loadMore(previous)} disabled={isNone(previous)}>
              <span>Previous</span>
            </button>
            <button className="button is-small" onClick={() => loadMore(next)} disabled={isNone(next)}>
              <span>Next</span>
            </button>
          </div>
        </footer>
        
      </div>}

      {(!loading && templates?.length == 0) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>No parcel has been added yet.</p>
          <p>Use the <strong>New Parcel</strong> button above to add</p>
        </div>

      </div>}

    </>
  );
});

export default ParcelsPage;