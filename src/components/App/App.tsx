import { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import AddDishForm from '../AddDishForm/AddDishForm';
import Modal from '../Modal/Modal';

import './App.scss';

const reducers = combineReducers({form: formReducer})
const store = createStore(reducers);

function App() {

  const [responseData, setResponseData] = useState({} as any);
  const [showModal, setShowModal] = useState(false);
  const [responseStatus, setResposneStatus] = useState(NaN);

  const [name, setName] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [noOfSlices, setNoOfSlices] = useState('');
  const [diameter, setDiameter] = useState('');
  const [spicinessScale, setSpicinessScale] = useState('');
  const [slicesOfBread, setSlicesOfBread] = useState('');
  const [type, setType] = useState('');

  const dishSpecificOptions = [
    {
      no_of_slices : parseInt(noOfSlices),
      diameter: parseFloat(diameter)
    },
    {
      
      spiciness_scale: parseInt(spicinessScale)
    },
    {
      
      slices_of_bread: parseInt(slicesOfBread)
    }
  ]

  const handleAddDishSubmit = () => {
    setShowModal(true);
    fetch(`https://frosty-wood-6558.getsandbox.com:443/dishes`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        preparation_time: prepTime,
        type: type,
        ...dishSpecificOptions[type==='pizza' ? 0 : type==='soup' ? 1 : 2]
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((res)=> {
      setResposneStatus(res.status)
      if(res.status !== 200){
        return
      }
      return res.json();
    })
    .then((data) => {
      setResponseData(data);
      setType('');
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  } 
  const handlePrepTimeInputChange = (value: any) => {
    setPrepTime(value)
  } 
  const handleNoOfSliceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoOfSlices(e.target.value)
  } 
  const handleDiameterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiameter(e.target.value)
  } 
  const handleSpicinessScaleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpicinessScale(e.target.value)
  } 
  const handleSlicesOfBreadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlicesOfBread(e.target.value)
  } 
  const handleTypeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
  }
  const handleCloseModal = () => {
    setShowModal(false);
    setResposneStatus(NaN);
  }


  return (
    <Provider store={store}>
      <div className="app">
        <h1>Add new dish</h1>
        <AddDishForm
        // @ts-ignore
          onNameInputChange={handleNameInputChange}
          onPrepTimeInputChange={handlePrepTimeInputChange}
          onNoOfSlicesInputChange={handleNoOfSliceInputChange}
          onDiameterInputChange={handleDiameterInputChange}
          onSpicinessScaleInputChange={handleSpicinessScaleInputChange}
          onSlicesOfBreadInputChange={handleSlicesOfBreadInputChange}
          onTypeSelectChange={handleTypeSelectChange}
          name={name}
          prepTime={prepTime}
          noOfSlices={noOfSlices}
          diameter={diameter}
          spicinessScale={spicinessScale}
          slicesOfBread={slicesOfBread}
          type={type}
          onSubmit={handleAddDishSubmit}
        />
        {showModal && <Modal responseData={responseData} closeModal={handleCloseModal} responseStatus={responseStatus}/>}
      </div>
    </Provider>
  );
}

export default App
