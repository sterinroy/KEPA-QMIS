import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY_SUCCESS,
  ADD_SUBCATEGORY_SUCCESS,
} from "../actions/actionTypes";

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });
  try {
    const res = await fetch("/api/itemCategoryRoutes/categories");
    const data = await res.json();
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
  }
};
export const addCategory = (name, subcategory = "") => async (dispatch) => {
  try {
    const res = await fetch("/api/itemCategoryRoutes/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subcategory }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.data.error || "API error");

    dispatch(fetchCategories());
  } catch (err) {
    console.error("addCategory error:", err);
  }
};

// export const addCategory = (name) => async (dispatch) => {
//   try {
//     const res = await fetch("/api/itemCategoryRoutes/categories", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name }),
//     });
//     const data = await res.json();
//     dispatch({ type: ADD_CATEGORY_SUCCESS, payload: data.category });
//     dispatch(fetchCategories());
//   } catch (error) {
//     console.error("Add category failed:", error.message);
//   }
// };

export const addSubcategory = (categoryName, subcategory) => async (dispatch) => {
  try {
    const res = await fetch("/api/itemCategoryRoutes/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName, subcategory }),
    });
    const data = await res.json();
    dispatch({ type: ADD_SUBCATEGORY_SUCCESS, payload: data.data.category });
    dispatch(fetchCategories());
  } catch (error) {
    console.error("Add subcategory failed:", error.message);
  }
};

export const updateCategory = (oldName, name, subcategory) => async (dispatch) => {
  try {
    const res = await fetch("/api/itemCategoryRoutes/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldName, name, subcategory }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update failed");

    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: data.data.category });
    dispatch(fetchCategories());
  } catch (error) {
    console.error("Update category failed:", error.message);
  }
};

export const deleteCategory = (name) => async (dispatch) => {
  try {
    const res = await fetch("/api/itemCategoryRoutes/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.data.error || "Delete failed");

    dispatch(fetchCategories());
  } catch (error) {
    console.error("Delete category failed:", error.message);
  }
};
