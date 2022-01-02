import React from "react";

const Address = ({ handleSubmit, handleChange, setValues, values, PNP }) => {
  // destructing state
  const { address, city, country, phoneNo, postalCode } = values;
  
  /* console.log("this is values inside productform: ", values); */

  return (
    <form onSubmit={handleSubmit} className="pb-0 mb-0 m-4">
      <div className="form-group">
       {PNP === false ? (
         <>
       <label>Street Name</label>
        <input
          placeholder="number and street name"
          type="type"
          className="form-control mb-2"
          name="address"
          value={address}
          onChange={handleChange}
          autoFocus
          required
        />
        <label>city</label>
        <input
          placeholder="city"
          type="type"
          className="form-control mb-2 "
          name="city"
          value={city}
          onChange={handleChange}
          autoFocus
          required
        />
         <label>Zip Code</label>
        <input
          placeholder="post code"
          type="type"
          className="form-control mb-2 "
          name="postalCode"
          value={postalCode}
          onChange={handleChange}
          autoFocus
          required
        />
        <label>country</label>
        <input
          placeholder="country"
          type="type"
          className="form-control mb-2 "
          name="country"
          value={country}
          onChange={handleChange}
          autoFocus
          required
        />
        <label>Phone Number</label>
        <input
          placeholder="phoneNo"
          type="number"
          className="form-control mb-2 "
          name="phoneNo"
          value={phoneNo}
          onChange={handleChange}
          autoFocus
          required
        />
        </>): (  
          <> 
          <label>Phone Number</label>
          <input
            placeholder="phoneNo"
            type="number"
            className="form-control mb-2 "
            name="phoneNo"
            value={phoneNo}
            onChange={handleChange}
            autoFocus
            required
          /></>
       )} 
        <button className="btn btn-outline-primary btn-primary float-right mt-0">
          Save
        </button>
      </div>
    </form>
  );
};

export default Address;
