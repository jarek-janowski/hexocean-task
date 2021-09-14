import './Input.scss'

const Input = ({errorMessage, ...props}: any) => (
    <>
        <input {...props} />
        <span className="error-message">{errorMessage}</span>
    </>
);

export default Input;