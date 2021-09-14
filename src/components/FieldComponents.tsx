import Input from './Input/Input'

export const nameInput = ({input, meta}: any) => {
    return(
    <Input {...input} maxlength="28" placeholder="ex. HexOcean pizza" type="text" errorMessage={meta.touched && meta.error}/>
    )
}

export const prepTimeInput = ({input, meta}: any) => {
    console.log(meta)
    return(
    <Input {...input} style={{color: !meta.dirty ? '#777' : 'black', letterSpacing: 1}} type="tel" errorMessage={meta.touched && meta.error}/>
    )
}

export const noOfSlicesInput = ({input, meta}: any) => {
    return(
    <Input {...input} placeholder="ex. 4" type="number" errorMessage={meta.touched && meta.error}/>
    )
}

export const diameterInput = ({input, meta}: any) => {
    return(
    <Input {...input} placeholder="ex. 33.4" type="number" step="any" maxlength="5" errorMessage={meta.touched && meta.error}/>
    )
}

export const spicinessScaleInput = ({input, meta}: any) => {
    return(
    <>
    <Input {...input} type="range" min="1" max="10" list="tickmarks" errorMessage={meta.touched && meta.error}/>
    <datalist id="tickmarks">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option value="7"></option>
        <option value="8"></option>
        <option value="9"></option>
        <option value="10"></option>
    </datalist>
    </>
    )
}

export const slicesOfBreadInput = ({input, meta}: any) => {
    return(
    <Input {...input} placeholder="ex. 3" type="number"  errorMessage={meta.touched && meta.error}/>
    )
}