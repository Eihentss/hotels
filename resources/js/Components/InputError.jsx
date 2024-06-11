export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <h1 {...props} className={'text-1xl text-red-800 ' + className}>
            {message}
        </h1>
    ) : null;
}
