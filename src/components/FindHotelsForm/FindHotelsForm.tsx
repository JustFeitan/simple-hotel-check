import { yupResolver } from "@hookform/resolvers/yup";
import { addDays, addYears, format } from "date-fns";
import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { CitiesData } from "../../data/CitiesData";
import { formatDateWithFnsFormat } from "../../helpers/dateHelpers/formatDateWithFnsFormat";
import { getCheckOutDate } from "../../helpers/dateHelpers/getCheckOutDate";
import { useActions } from "../../hooks/redux";
import { FindHotelsRequest } from "../../models/hotels";
import { findHotelsActions } from "../../store/reducers/hotelsSlice";
import Autocomplete from "../UI/Autocomplete/Autocomplete";
import Form from "../UI/Form/Form";
import Input from "../UI/Input/Input";
import Button from "../UI/buttons/Button/Button";
import "./FindHotelsForm.scss";

interface FindHotelsFormState {
    checkInDate: string;
    location: string;
    daysOfStay: number;
}

const today = new Date();
const findHotelsFormSchema = yup.object().shape({
    location: yup
        .string()
        .matches(/^([^0-9]*)$/, "Неверный формат")
        .required("Введите название города"),
    daysOfStay: yup
        .number()
        .typeError("Введите количество дней проживания")
        .min(1, "Неверное количество дней")
        .max(31, "Нельзя забранировать больше чем на месяц"),
    checkInDate: yup
        .date()
        .typeError("Укажите дату заселения")
        .min(addDays(today, -1), "Укажите корректную дату заселения")
        .max(addYears(today, 1), "Укажите корректную дату заселения"),
});

const FindHotelsForm: FC = () => {
    const { getHotelsByLocationAndDates } = useActions(findHotelsActions);
    //Form validation
    const {
        register,
        control,
        setValue,
        formState: { errors, defaultValues },
        handleSubmit,
    } = useForm<FindHotelsFormState>({
        mode: "onBlur",
        defaultValues: {
            location: "Москва",
            checkInDate: format(today, "yyyy-MM-dd"),
            daysOfStay: 1,
        },
        resolver: yupResolver(findHotelsFormSchema),
    });

    //Make request with default data
    useEffect(() => {
        const checkOutDate = getCheckOutDate(defaultValues!.checkInDate!, defaultValues!.daysOfStay!);
        const findHotelsRequest: FindHotelsRequest = {
            location: defaultValues!.location!,
            checkInDate: formatDateWithFnsFormat(defaultValues!.checkInDate!, "yyyy-MM-dd"),
            checkOutDate: checkOutDate!,
        };
        getHotelsByLocationAndDates(findHotelsRequest);
    }, []);

    const onFindHotelsSubmit: SubmitHandler<FindHotelsFormState> = async (findHotelsFields) => {
        const { checkInDate, location, daysOfStay } = findHotelsFields;
        const checkOutDate = getCheckOutDate(checkInDate, daysOfStay);
        const findHotelsRequest: FindHotelsRequest = {
            location: location,
            checkInDate: formatDateWithFnsFormat(checkInDate, "yyyy-MM-dd"),
            checkOutDate: checkOutDate!,
        };
        getHotelsByLocationAndDates(findHotelsRequest);
    };
    return (
        <Form className="find-hotels-form" onSubmit={handleSubmit(onFindHotelsSubmit)}>
            <Autocomplete
                label="Локация"
                name="location"
                setValue={setValue}
                error={!!errors.location}
                helperText={errors.location?.message}
                control={control}
                suggestions={CitiesData}
                onSelectSuggestion={(res) => console.log(res)}
            />
            <Input
                type="date"
                error={!!errors.checkInDate}
                helperText={errors.checkInDate?.message}
                {...register("checkInDate")}
                label="Дата заселения"
                min={format(today, "yyyy-MM-dd")}
                max={format(addYears(today, 1), "yyyy-MM-dd")}
            />
            <Input
                error={!!errors.daysOfStay}
                helperText={errors.daysOfStay?.message}
                {...register("daysOfStay")}
                label="Количество дней"
            />
            <Button fullWidth height={50}>
                Найти
            </Button>
        </Form>
    );
};

export default FindHotelsForm;
