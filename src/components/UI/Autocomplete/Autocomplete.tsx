import React, { ChangeEvent, FC, useState } from "react";
import { Controller } from "react-hook-form";

import Input, { InputProps } from "../Input/Input";
import "./Autocomplete.scss";

interface AutocompleteInputProps extends InputProps {
    name?: string;
    control?: any;
    setValue?: any;
    defaultValue?: string;
    suggestions: string[];
    onSelectSuggestion?: (selectedValue: string) => void;
}

const AutocompleteInput: FC<AutocompleteInputProps> = ({
    name,
    control,
    defaultValue,
    suggestions,
    onSelectSuggestion,
    ref,
    setValue,
    ...props
}) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
        onChange(event);
        setFilteredSuggestions(
            suggestions.filter((suggestion) => suggestion.toLowerCase().includes(event.target.value.toLowerCase()))
        );
    };

    const handleSelectSuggestion = (selectedValue: string) => {
        setValue("location", selectedValue);
        setFilteredSuggestions([]);
        if (onSelectSuggestion) {
            onSelectSuggestion(selectedValue);
        }
    };

    const handleInputBlur = (event: ChangeEvent<HTMLInputElement>, onBlur: (...event: any[]) => void) => {
        setTimeout(() => {
            onBlur(event);
            setFilteredSuggestions([]);
        }, 100);
    };

    if (name && control) {
        return (
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ?? ""}
                render={({ field: { onChange, name, value, onBlur } }) => (
                    <div className="autocomplete-container">
                        <Input
                            name={name}
                            {...props}
                            value={value}
                            onChange={(event) => handleInputChange(event, onChange)}
                            onBlur={(event) => handleInputBlur(event, onBlur)}
                        />
                        {!!filteredSuggestions.length && (
                            <ul>
                                {filteredSuggestions.map((suggestion) => (
                                    <li key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            />
        );
    } else {
        return null;
        // <div className='autocomplete-container'>
        //     <Input type="text" {...props} value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} />
        //     {
        //         !!filteredSuggestions.length &&
        //         <ul>
        //             {filteredSuggestions.map((suggestion) => (
        //                 <li key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}>
        //                     {suggestion}
        //                 </li>
        //             ))}
        //         </ul>
        //     }
        // </div>
    }
};

export default AutocompleteInput;
