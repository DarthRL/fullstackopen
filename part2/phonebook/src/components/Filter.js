const Filter = ({ text, filter, handleOnChange }) => (
    <div>
      {text}<input value={filter} onChange={handleOnChange} />
    </div>
  )
export default Filter