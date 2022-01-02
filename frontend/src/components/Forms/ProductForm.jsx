import React from "react";
import TextField from "@mui/material/TextField";
import { Select } from "antd";
const { Option } = Select;

const ProductForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleSubcategory,
  subOptions,
  showSub,
}) => {
  // destructing state
  const {
    title,
    description,
    price,
    category,
    // categories will be listed for the user to choose
    categories,
    subcategories,
    shipping,
    quantity,
    images,
    colors,
    brand,
    color,
  } = values;
 /*  console.log("this is values inside productform: ", values); */

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          placeholder="Name"
          type="type"
          className="form-control mb-2"
          name="title"
          value={title}
          onChange={handleChange}
          autoFocus
          required
        />
        <label>Price</label>
        <input
          placeholder="Price"
          type="number"
          className="form-control mb-2 "
          name="price"
          value={price}
          onChange={handleChange}
          autoFocus
          required
        />
        <div className="form-group">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            onChange={handleChange}
          >
            <option>Please select one</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <label>Measurement type</label>
          <select
            name="measurement"
            className="form-control"
            onChange={handleChange}
          >
            <option>Please select one</option>
            <option value="kg">kg</option>
            <option value="liter"> liter</option>
            <option value="item"> item</option>
            <option value="bag">bag</option>
            <option value="bottle">bottle</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            placeholder="Quantity"
            type="number"
            className="form-control mb-2 "
            name="quantity"
            value={quantity}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
      {/*   <div className="form-group">
          <label>Colors</label>
          <select
            name="color"
            value={color}
            className="form-control"
            onChange={handleChange}
          >
            <option>Please select one</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div> */}
        <div className="form-group">
          <label>Brand</label>
          <input
            placeholder="Brand"
            type="text"
            className="form-control mb-2 "
            name="brand"
            value={brand}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleSubcategory}
          >
            <option>Please select</option>
            {categories
              .sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
              })
              .map((item, i) => (   
                <option key={i} value={item._id} >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
       { showSub && (<div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={subcategories}
          onChange={(value) => setValues({ ...values, subcategories: value })}
        >
          {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
        </Select>
      </div>)}
        <br/>
        <div className="form-group">
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={3}
            defaultValue="Default Value"
            variant="filled"
            type="text"
            className="form-control mb-1 "
            name="description"
            value={description}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
       
        <br />
        <button className="btn btn-primary btn-outline-info float-right mt-5 mb-10">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
