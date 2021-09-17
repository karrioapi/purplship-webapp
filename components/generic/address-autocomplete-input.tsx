import { Address } from '@/api/index';
import { initDebouncedPrediction, QueryAutocompletePrediction } from '@/library/autocomplete';
import React, {ChangeEvent, useContext, useEffect, useState, useRef } from 'react';
import { InputFieldComponent } from '@/components/generic/input-field';
import { FeatureFlags } from '@/context/feature-flags';
import { Subject } from 'rxjs/internal/Subject';

interface AddressAutocompleteInputComponent extends InputFieldComponent {
    onValueChange: (value: Partial<Address>) => void;
    defaultValue?: string;
    disableSuggestion?: boolean;
    country_code?: string;
    dropdownClass?: string;
}

const AddressAutocompleteInput: React.FC<AddressAutocompleteInputComponent> = ({ onValueChange, country_code, label, required, dropdownClass, className, fieldClass, controlClass, children, ...props }) => {
    const { ADDRESS_AUTO_COMPLETE } = useContext(FeatureFlags);
    const container = useRef<HTMLDivElement | null>(null);
    const [key] = useState<string>(`predictions_${Date.now()}`);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [predictions, setPredictions] = useState<QueryAutocompletePrediction[]>([]);
    const [predictor, initPredictor] = useState<ReturnType<typeof initDebouncedPrediction> | undefined>();

    const updater: Subject<Partial<Address>> = new Subject();
    updater.subscribe(address => onValueChange(address));

    const onClick = (e: React.MouseEvent<HTMLInputElement>) => e.currentTarget.select();
    const onChange = (e: ChangeEvent<any>) => {
        e.preventDefault();
        const inputValue: string = e.target.value || "";
        if (inputValue.length > 3) {
            predictor?.getPlacePredictions({ input: inputValue, country_code }, predictions => setPredictions(predictions));
        }
        updater.next({ address_line1: inputValue });
    };
    const onSelect = (prediction: QueryAutocompletePrediction) => {
        predictor?.formatPrediction(prediction, address => {
            updater.next(address);
            setIsActive(false);
        });
    };
    const onBodyClick = (e: MouseEvent) => {
        if (container.current !== null && !container.current.contains(e.target as Element)) {
            setIsActive(false);
            document.removeEventListener('click', onBodyClick);
        }
    };

    useEffect(() => {
        initPredictor(initDebouncedPrediction(ADDRESS_AUTO_COMPLETE));
    }, [ADDRESS_AUTO_COMPLETE]);
    useEffect(() => {
        if (isActive) document.addEventListener('click', onBodyClick);
    }, [isActive]);
    useEffect(() => {
        setIsActive(!!predictions.length);
    }, [predictions]);

    const content = (_: any) => (
        <div className={`field ${fieldClass}`} key={key} ref={container}>
            {label !== undefined && <label className="label is-capitalized" style={{ fontSize: ".8em" }}>
                {label}
                {required && <span className="icon is-small has-text-danger small-icon"><i className="fas fa-asterisk"></i></span>}
            </label>}
            <div className={`control ${controlClass}`}>
                <div className={`dropdown input is-fullwidth p-0 ${isActive ? 'is-active' : ''} ${dropdownClass}`}
                    style={{ border: 'none' }}
                    key={`dropdown-input-${key}`}>
                    <input onChange={onChange} onClick={onClick} autoComplete={ADDRESS_AUTO_COMPLETE?.is_enabled ? key : "on"} className="input is-fullwidth" required={required} {...props} />
                    <div className="dropdown-menu py-0" id={`dropdown-input-${key}`} role="menu" style={{ right: 0, left: 0 }}>
                        <div className="dropdown-content py-0">
                            <nav className="panel dropped-panel">
                                {(predictions || [])
                                    .map((prediction) => (
                                        <a key={`${prediction.id}-${Date.now()}`}
                                            onClick={() => onSelect(prediction)}
                                            className={`panel-block`}>
                                            <span>{prediction.description}</span>
                                        </a>
                                    ))
                                }
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return <>{content(predictions)}</>;
};

export default AddressAutocompleteInput;