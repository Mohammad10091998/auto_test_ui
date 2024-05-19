import * as Yup from "yup";

const headerValidation = (value) => {
  if (!value || value.length === 0) {
    return true;
  }

  for (let i = 0; i < value.length; i++) {
    const item = value[i];

    if (
      (!item.key || item.key.trim() === "") &&
      (!item.value || item.value.trim() === "")
    ) {
      return false;
    }
  }

  return true;
};

const customGetDeleteParamValidation = (value) => {
  if (!value || value.length === 0) {
    return true;
  }
  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    if (
      !item.key ||
      (item.key.trim() === "" && !item.values && item.values.length === 0)
    ) {
      return false;
    }
    for (let j = 0; j < item.values.length; j++) {
      const paramVal = item.values[j];
      if (!paramVal || paramVal.trim() === "") {
        return false;
      }
    }
  }

  return true;
};

const customPostPutValidation = (value) => {
  if (!value || value.length === 0) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    const item = value[i];

    if (
      !item.key ||
      item.key.trim() === "" ||
      !item.value ||
      item.value.trim() === ""
    ) {
      return false;
    }

    try {
      const parsedValue = JSON.parse(item.value);
      if (typeof parsedValue !== "object" || parsedValue === null) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  return true;
};

const systemGetDeleteValidation = (value) => {
  if (!value || value.length === 0) {
    return false;
  }

  for (let i = 0; i < value.length; i++) {
    const item = value[i];

    if (
      !item.key ||
      item.key.trim() === "" ||
      !item.value ||
      item.value.trim() === ""
    ) {
      return false;
    }
  }

  return true;
};

const systemPostPutValidation = (value) => {
  try {
    const parsedValue = JSON.parse(value);
    if (typeof parsedValue !== "object" || parsedValue === null) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const customGetDeleteSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  url: Yup.string().required("URL is required"),
  paramsPairs: Yup.array()
    .of(Yup.object().shape({}))
    .test(
      "param-validation",
      "Don not save empty param key and values",
      customGetDeleteParamValidation
    ),
  headerPairs: Yup.array()
    .of(Yup.object().shape({}))
    .test("header-validation", "Do not save empty headers", headerValidation),
});

export const customPostPutSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  url: Yup.string().required("URL is required"),
  payloadPairs: Yup.array()
    .of(Yup.object().shape({}))
    .test(
      "payload-validation",
      "Don not save empty payload name or value or enter invalid json",
      customPostPutValidation
    ),
  headerPairs: Yup.array()
    .of(Yup.object().shape({}))
    .test("header-validation", "Do not save empty headers", headerValidation),
});

export const systemGetDeleteSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  url: Yup.string().required("URL is required"),
  paramPairs: Yup.array()
    .of(Yup.object().shape({}))
    .test(
      "param-validation",
      "Don not save empty param key and values",
      systemGetDeleteValidation
    ),
  headerPairs: Yup.array()
    .of(Yup.object().shape({}))
    .test("header-validation", "Do not save empty headers", headerValidation),
});

export const systemPostPutSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  url: Yup.string().required("URL is required"),
  payload: Yup.string()
    .required("payload is required")
    .test(
      "payload-validation",
      "Provide valid json payload",
      systemPostPutValidation
    ),
  headerPairs: Yup.array()
    .of(Yup.object().shape({}))
    .test("header-validation", "Do not save empty headers", headerValidation),
});
