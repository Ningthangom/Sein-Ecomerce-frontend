import React from "react";
import TextField from "@mui/material/TextField";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = ({
    handleSubmit,
    handleChange,
    setValues,
    values,
    handleCatagoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
  handleCancel
}) => {
  // destructing state
   // destructure
   const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
    colors,
    brands,
    color,
    brand,
  } = values;
 /*  console.log("this is values inside ProductUpdateForm: ", values); */

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

     {/*  <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div> */}

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        <label>measurement type</label>
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
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select
          value={color}
          name="color"
          className="form-control"
          onChange={handleChange}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

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
          onChange={handleCatagoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          <option>{category ? category.name : "Please select"}</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>
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
      <button className="btn btn-outline-info float-right mt-5 mb-10">Update</button>
      <button className="btn btn-outline-info float-right mt-5 mb-10" onClick={handleCancel}>cancel</button>
    </form>
  );
};

export default ProductUpdateForm;
