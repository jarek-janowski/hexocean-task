import { useState } from 'react';
import {reduxForm, Field, GenericField } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';
import { createTextMask } from 'redux-form-input-masks';
import './AddDishForm.scss';
import {nameInput, 
    prepTimeInput, 
    noOfSlicesInput, 
    diameterInput, 
    spicinessScaleInput, 
    slicesOfBreadInput
} from '../FieldComponents';
import { required, minLength6 } from '../FieldValidation'

interface AddDishFormProps {
    onNameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onPrepTimeInputChange: (value: any) => void,
    onNoOfSlicesInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onDiameterInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSpicinessScaleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSlicesOfBreadInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onTypeSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    name: string,
    prepTime: string,
    noOfSlices: number,
    diameter: number,
    spicinessScale: number,
    slicesOfBread: number,
    type: string,
    handleSubmit: () => void,
    onSubmit: () => void,
    valid: boolean,
    reset: () => void
}

const AddDishForm: React.FC<AddDishFormProps> = ({
    onNameInputChange,
    onPrepTimeInputChange,
    onNoOfSlicesInputChange,
    onDiameterInputChange,
    onSpicinessScaleInputChange,
    onSlicesOfBreadInputChange,
    onTypeSelectChange,
    name,
    prepTime,
    noOfSlices,
    diameter,
    spicinessScale,
    slicesOfBread,
    type,
    handleSubmit,
    valid,
    reset,
}) => {

    //reset select after submit by changing key which force re-render
    const [resetSelect, setResetSelect] = useState('')

    const handleSubmitt = (e: any) => {
        e.preventDefault();
        handleSubmit();
        setResetSelect(uuidv4())
        reset();
    }

    //redux-form-input-mask fro prepTime field
    const prepTimeMask = createTextMask({
        pattern: '99:99:99',
        onChange: (value: any) => {
            onPrepTimeInputChange(value.match(/.{1,2}/g)?.join(":"))
        }
    })

    //prevet ts error redux-form with createTextMask
    const FieldCustom = Field as new () => GenericField<any>;

    return (
        <form className="add-dish-form" onSubmit={handleSubmitt} key={resetSelect}>
            <label>Dish Name
                <Field name="name" value={name} onChange={onNameInputChange} component={nameInput} validate={required}/>
            </label>
            <label>Preparation Time
                <FieldCustom name="prepTime" value={prepTime} component={prepTimeInput} validate={[required, minLength6]} {...prepTimeMask} />
            </label>
            <select onChange={onTypeSelectChange}>
                <option value="">--Select dish type--</option>
                <option value="pizza">pizza</option>
                <option value="soup">soup</option>
                <option value="sandwich">sandwich</option>
            </select>
            {type === "pizza" && 
            <>
                <label>Number Of Slices
                    <Field name="no of slices" value={noOfSlices} onChange={onNoOfSlicesInputChange} component={noOfSlicesInput} validate={required}/>
                </label>
                <label>Diameter
                    <Field name="diameter" value={diameter} onChange={onDiameterInputChange} component={diameterInput} validate={required}/>
                </label>
            </>
            }
            {type === "soup" &&
            <label>Spiciness Scale (1-10)
                <Field name="spiciness scale" value={spicinessScale} onChange={onSpicinessScaleInputChange} component={spicinessScaleInput} validate={required}/> 
            </label>
            }
            {type === "sandwich" &&
            <label>Slices of Bread
                <Field name="slices of bread" value={slicesOfBread} onChange={onSlicesOfBreadInputChange} component={slicesOfBreadInput} validate={required}/> 
            </label> 
            }
            {type && <button disabled={!valid}>Submit</button>}
        </form>
    )
}

export default reduxForm({
form: 'add-dish-form',
})(AddDishForm as any);
