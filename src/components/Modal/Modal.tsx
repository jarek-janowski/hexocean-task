import './Modal.scss'
import spinner from '../../spinner.svg'

interface ModalProps {
    responseData: {
        name: string,
        type: string,
        preparation_time: string,
        no_of_slices: number,
        diameter: number,
        spiciness_scale: number,
        slices_of_bread: number
    },
    closeModal: () => void,
    responseStatus: number
}
 
const Modal: React.FC<ModalProps> = ({responseData, closeModal, responseStatus}) => {
    
    const {
        name, 
        preparation_time, 
        type, 
        no_of_slices, 
        diameter, 
        spiciness_scale, 
        slices_of_bread
    } = responseData || {}

    const somethigWentWrong = 
    <div>
        <h4>Error nr <span>--{responseStatus}--</span></h4>
        <p>Try Again</p>
    </div>

    const dishSuccessfullyAded = 
        <div>
            <h4>Dish name: <span>{name}</span></h4>
            <p>Preparation Time: <span>{preparation_time}</span></p>
            <p>Type: <span>{type}</span></p>
            {type==='pizza' &&
            <> 
            <p>Number of Slices: <span>{no_of_slices}</span></p>
            <p>Diameter: <span>{diameter}</span></p>
            </>
            }
            {type==='soup' &&
            <> 
            <p>Spiciness scale (1-10): <span>{spiciness_scale}</span></p>
            </>
            }
            {type==='sandwich' &&
            <> 
            <p>Slices of Bread: <span>{slices_of_bread}</span></p>
            </>
            }
        </div>

    return ( 
        <div className="modal">
            <div className="modal__content">
                {!responseStatus && 
                <div>
                    <p>Waiting for response from server..</p>
                    <img className="modal__loading" src={spinner} alt="loading animation" />
                </div>
                }
                {responseStatus ?
                <> 
                <div className="modal__header">
                    <h3 className="modal__title">{responseStatus === 200 ? 'Dish successfully added' : 'Something went wrong'}</h3>
                </div>
                <section className="modal__body">
                    <div>
                        {responseStatus !== 200 
                        ?somethigWentWrong
                        :dishSuccessfullyAded 
                        }
                    </div>
                </section>
                <div className="modal__footer">
                    <button onClick={() => closeModal()} className="modal__button">OK</button>
                </div>
                </>: null}
            </div>
        </div>
     );
}
 
export default Modal;