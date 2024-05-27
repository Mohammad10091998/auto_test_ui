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

const systemPostPutValidation = (value) => {
  try {
    const parsedValue = JSON.parse(value);
    if (typeof parsedValue !== "object" || parsedValue === null) {
      return "Parsed value is not an object.";
    }
    validateObject(parsedValue);
    return true;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return `Invalid JSON format: ${error.message}`;
    } else {
      return `Validation error: ${error.message}`;
    }
  }
};

const validDataTypes = [
  "int",
  "long",
  "double",
  "float",
  "decimal",
  "bool",
  "datetime",
  "guid",
  "char",
  "string",
];

const validateValueFormat = (key, value) => {
  const valueStr = String(value);
  const parts = valueStr.split(",");
  if (parts.length < 3) {
    throw new Error(`Value of key "${key}" must contain at least two commas.`);
  }
  const [dataType, typeSpecifier] = parts;
  if (!validDataTypes.includes(dataType.trim())) {
    throw new Error(
      `Invalid data type "${dataType}" for key "${key}". Must be one of: ${validDataTypes.join(
        ", "
      )}.`
    );
  }
  if (typeSpecifier.trim() !== "fix" && typeSpecifier.trim() !== "random") {
    throw new Error(
      `Value of key "${key}" must contain either "fix" or "random" as the second part.`
    );
  }
};

const validateObject = (obj, path = "") => {
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = path ? `${path}.${key}` : key;
    if (typeof key !== "string") {
      throw new Error(`Key "${fullPath}" must be a string.`);
    }
    if (typeof value === "object" && value !== null) {
      validateObject(value, fullPath);
    } else {
      validateValueFormat(fullPath, value);
    }
  }
};


export const systemPostPutSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  url: Yup.string().required("URL is required"),
  payload: Yup.string()
    .required("Payload is required")
    .test(
      "payload-validation",
      function (value) {
        const validationResult = systemPostPutValidation(value);
        if (validationResult === true) {
          return true;
        } else {
          return this.createError({ message: validationResult });
        }
      }
    ),
  headerPairs: Yup.array()
    .of(Yup.object().shape({}))
    .test("header-validation", "Do not save empty headers", headerValidation),
});
