import React, { useContext, useEffect, useState } from 'react';
import { View } from '@/library/types';
import StatusCode from '@/components/status-code-badge';
import Prism from 'prismjs';
import { formatDateTime, isNone, notEmptyJSON } from '@/library/helper';
import { Log } from '@/context/log-query';
import { Loading } from '@/components/loader';
import NavLink from '@/components/generic/navlink';

interface LogDetailsView extends View {
    logId?: string;
}

const LogDetails: React.FC<LogDetailsView> = ({ logId }) => {
    const { setLoading } = useContext(Loading);
    const { log, loading, loadLog } = useContext(Log);
    const [query_params, setQueryParams] = useState<string>();
    const [response, setResponse] = useState<string>();
    const [data, setData] = useState<string>();

    useEffect(() => { setLoading(loading); });
    useEffect(() => { if (isNone(log) && !isNone(loadLog) && !loading) loadLog(logId as string); }, []);
    useEffect(() => {
        if (log !== undefined) {
            setQueryParams(JSON.stringify(JSON.parse(log.query_params || '{}'), null, 2));
            setResponse(JSON.stringify(JSON.parse(log.response || '{}'), null, 2));
            setData(JSON.stringify(JSON.parse(log.data || '{}'), null, 2));
        }
    }, []);

    return (
        <>
            <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                <ul>
                    <li><NavLink to="/api_logs">Logs</NavLink></li>
                    <li className="is-active"><a href="#" aria-current="page">details</a></li>
                </ul>
            </nav>
            
            {log !== undefined && <div className="card">

                <div className="log-card-header px-5 pt-5 pb-3">
                    <p className="subtitle is-6">Request</p>
                    <p className="title is-4">{log.method} {log.path} <StatusCode code={log.status_code as number} /></p>
                </div>

                <div className="card-content py-3">
                    <div className="columns my-0">
                        <div className="column is-3 py-1">Date</div>
                        <div className="column is-8 py-1">{formatDateTime(log.requested_at)}</div>
                    </div>
                    <div className="columns my-0">
                        <div className="column is-3 py-1">IP Address</div>
                        <div className="column is-8 py-1">{log.host}</div>
                    </div>
                    <div className="columns my-0">
                        <div className="column is-3 py-1">Origin</div>
                        <div className="column is-8 py-1">{log.remote_addr}</div>
                    </div>
                </div>

            </div>}
            
            {notEmptyJSON(query_params) && query_params !== data  && <div className="card my-3">

                <div className="log-card-header px-5 pt-5 pb-3">
                    <p className="title is-4">Request query params</p>
                </div>

                <div className="card-content py-3">
                    <pre className={`language-json`}>
                        <code
                            className={`language-json`}
                            dangerouslySetInnerHTML={{
                                __html: Prism.highlight(query_params as string, Prism.languages.json, 'json'),
                            }}
                        />
                    </pre>
                </div>

            </div>}

            {notEmptyJSON(data) && <div className="card my-3">

                <div className="log-card-header px-5 pt-5 pb-3">
                    <p className="title is-4">Request {log?.method} body</p>
                </div>

                <div className="card-content py-3">
                    <pre className={`language-json`}>
                        <code
                            className={`language-json`}
                            dangerouslySetInnerHTML={{
                                __html: Prism.highlight(data as string, Prism.languages.json, 'json'),
                            }}
                        />
                    </pre>
                </div>

            </div>}

            {notEmptyJSON(response) && <div className="card my-3">

                <div className="log-card-header px-5 pt-5 pb-3">
                    <p className="title is-4">Response body</p>
                </div>

                <div className="card-content py-3">
                    <pre className={`language-json`}>
                        <code
                            className={`language-json`}
                            dangerouslySetInnerHTML={{
                                __html: Prism.highlight(response as string, Prism.languages.json, 'json'),
                            }}
                        />
                    </pre>
                </div>

            </div>}
        </>
    );
};

export default LogDetails;
