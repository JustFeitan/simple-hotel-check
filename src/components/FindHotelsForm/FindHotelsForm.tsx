import React, {FC, useEffect} from 'react';
import Form from "../UI/Form/Form";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Autocomplete from "../UI/Autocomplete/Autocomplete";
import {CitiesData} from "../../data/CitiesData";
import './FindHotelsForm.scss'
import {FindHotelsRequest} from "../../models/hotels/FindHotelsRequest";
import {useCheckOutDate} from "../../hooks/useCheckOutDate";
import {formatDateToInputValue} from "../../helpers/dateHelpers/formatDateToInputValue";
import {plusOneYear} from "../../helpers/dateHelpers/plusOneYear";
import {formatDateWithFnsFormat} from "../../helpers/dateHelpers/formatDateWithFnsFormat";
import {addDays} from "date-fns";


interface FindHotelsFormState {
    checkInDate: string;
    location: string;
    daysOfStay: number;
}

const findHotelsFormSchema = yup.object().shape({
    location: yup
        .string()
        .matches(/^([^0-9]*)$/, 'Неверный формат')
        .required('Введите название города'),
    daysOfStay: yup
        .number()
        .typeError('Введите количество дней проживания')
        .min(1, 'Неверная количество дней')
        .max(31, 'Нельзя забранировать больше чем на месяц'),
    checkInDate: yup
        .date()
        .typeError('Укажите дату заселения')
})

interface FindHotelsFormProps {
    onSubmitForm: (findHotelRequest: FindHotelsRequest) => void;
}

const FindHotelsForm: FC<FindHotelsFormProps> = ({onSubmitForm}) => {
    const today = new Date();
    //Form validation
    const {
        register,
        control,
        setValue,
        formState: {errors, defaultValues},
        handleSubmit
    } = useForm<FindHotelsFormState>({
        defaultValues: {
            location: 'Москва',
            checkInDate: today.toISOString().slice(0, 10),
            daysOfStay: 1,
        },
        mode: 'onBlur',
        resolver: yupResolver(findHotelsFormSchema)
    })

    //Make request with default data
    const checkOutDate = useCheckOutDate(defaultValues?.checkInDate ?? '')
    useEffect(() => {
        const findHotelsRequest: FindHotelsRequest = {
            location: defaultValues!.location!,
            checkInDate: defaultValues!.checkInDate!,
            checkOutDate: checkOutDate,
        }
        onSubmitForm(findHotelsRequest)
    }, [])

    const onFindHotelsSubmit: SubmitHandler<FindHotelsFormState> = async (findHotelsFields) => {
        const {checkInDate,daysOfStay,location} = findHotelsFields;
        const checkOutDate = addDays(Date.parse(checkInDate), daysOfStay);

        const findHotelsRequest: FindHotelsRequest = {
            location: location,
            checkInDate: formatDateWithFnsFormat(checkInDate, 'yyyy-MM-dd'),
            checkOutDate: formatDateWithFnsFormat(checkOutDate, 'yyyy-MM-dd'),
        }
        onSubmitForm(findHotelsRequest)
    }
    return (
        <Form className='find-hotels-form' onSubmit={handleSubmit(onFindHotelsSubmit)}>
            <Autocomplete
                label='Локация'
                name='location'
                setValue={setValue}
                error={!!errors.location}
                helperText={errors.location?.message}
                control={control}
                suggestions={CitiesData}
                onSelectSuggestion={(res => console.log(res))}
            />
            <Input
                type='date'
                error={!!errors.checkInDate}
                helperText={errors.checkInDate?.message}
                {...register('checkInDate')}
                label='Дата заселения'
                min={formatDateToInputValue(today)}
                max={formatDateToInputValue(plusOneYear(today))}
            />
            <Input
                error={!!errors.daysOfStay}
                helperText={errors.daysOfStay?.message}
                {...register('daysOfStay')}
                label='Количество дней'
            />
            <Button fullWidth height={50}>
                Найти
            </Button>
        </Form>
    );
};

export default FindHotelsForm;
