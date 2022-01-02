import React from 'react';

const FormCategory = ({name, handleSubmit,setName, placeholder}) => {

    return (
        <form onSubmit={handleSubmit} className="pb-0 mb-0">
        <div className="form-group">
          <label>Name</label>
          <input
            placeholder={placeholder}
            type="type"
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <button className="btn btn-outline-primary btn-primary float-right mt-0">
            Save
          </button>
        </div>
      </form>
    )
}

export default FormCategory;