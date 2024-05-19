## 1.Project Information
# Auto Test UI
 
A user-friendly UI project designed for API testing powerd by react firebase and csharp.
 
## Overview
 
API Testing UI is a tool created to simplify the process of testing APIs. It provides a graphical user interface for interacting with APIs and includes a powerful backend with algorithms to conduct comprehensive testing, ensuring both positive and negative test scenarios are covered.
 
## Table of Contents
 
- [Usage](#usage)
- [Features](#features)
 
## Usage
 
### Access Auto Test Application through the following link: [https://apiautotest.azurewebsites.net/] 
 
## Features
 
API Testing UI comes with the following features:
 
1. **Graphical User Interface:** User-friendly interface for easy interaction with APIs.
2. **Comprehensive Testing:** Backend algorithms ensure thorough testing, covering both positive and negative scenarios.
3. **Flexible Configuration:** Easily configure test scenarios and parameters through the UI.
4. **Detailed Reporting:** View detailed reports of API test results, including the ability to generate Excel sheets for further analysis.
 
## 1. Automated Testing of Post/Put API Call

**1. Input Configuration :**
The input for the automated testing process is a JSON object which is payload of your post/put api, where each field has a data type , a behavior directive (fix or random) and a value (try to keep it as positive for better payload generation). This JSON object serves as a template for generating test payloads for your api.

> [!IMPORTANT]
> "name of the field" : "data type, behaviour, value"

> [!CAUTION]
> all info of the field and field itself must be in double quotes

> [!TIP]
> Provide positive value of the field for better payload generation

Example Template:
```
{
  "createdTimestamp": "datetime,fix,2024-05-19T09:00:34.104Z",
  "updatedTimestamp": "datetime,fix,2024-05-19T09:00:34.104Z",
  "createdByGuid": "guid,fix,3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updatedByGuid": "guid,fix,3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "id": "int,fix,0",
  "code": "string,random,M10",
  "name": "string,random,Maleria",
  "description": "string,fix,Desc",
  "systemName": "string,random,Mal",
  "displayOrder": "int,fix,10",
  "version": "string,random,v1",
  "startDate": "datetime,fix,2024-05-19T09:00:34.104Z",
  "endDate": "datetime,fix,2024-06-19T09:00:34.104Z"
}

```

![image](https://github.com/Mohammad10091998/auto_test_ui/assets/110900901/ecec5722-a37b-4469-baf6-036aa419b0c8)



 
**url:**  The URL of the API endpoint to test.
 
**apiType::** Specify whether it's a "POST" or "PUT" request.
 
**payload::** Provide a JSON schemas with datatype, behaviour and positive values for all property
 
**headerPairs::** Specify the headers needed for the API request, such as "Authorization" and "Content-Type."
 

 **SAVE THE API AND CLICK ON GEAR ICON TO TEST YOUR API**


## 2. Manual Testing of Post/Put API Call
 
This feature enables users to do tailored testing of their Post/Put APIs  by providing multiple payload on which our application will test the api. Details include:

![image](https://github.com/Mohammad10091998/auto_test_ui/assets/110900901/7757a58d-8f85-47b8-8958-3fc1fc5dca37)


 
**url:**  The URL of the API endpoint to test.
 
**apiType:** Specify whether it's a "POST" or "PUT" request.
 
**payload pairs:** Provide an array of named JSON schemas on which we will test given api
 
**headerPairs:** Specify the headers needed for the API request, such as "Authorization" and "Content-Type."
 
## 3. Automated Testing of Get/Delete API Call with Query Parameters
 
Our backend algorithm creates a spectrum of test scenarios by dynamically generating values for each query parameter, ensuring a comprehensive assessment of API behavior.

> [!CAUTION]
> When providing url for get or delete api please removed query parameters.

```
https://lis-admin-api-dev.ashymeadow-d1f4bad8.westus.azurecontainerapps.io/ICD10Code
```
 
![image](https://github.com/Mohammad10091998/auto_test_ui/assets/110900901/fe14d438-987d-421d-be54-a754b9ff0057)

 
**url:**  The URL of the API endpoint to test.
 
**apiType:** Specify whether it's a "POST" or "PUT" request.
 
**params:** Provide an array of query parameters, each with a key and a single value.
 
**headers::** Specify the headers needed for the API request, such as "Authorization" and "Content-Type."
 
## 4. Manual Testing of Get/Delete API Call with Query Parameters
 
The Manual Testing feature in our API Testing UI enhances the testing capabilities for Get/Delete APIs by allowing users to provide multiple values for each query parameter. This empowers users to perform thorough and customized assessments of their APIs under diverse conditions.

> [!CAUTION]
> When providing url for get or delete api please removed query parameters.

```
https://lis-admin-api-dev.ashymeadow-d1f4bad8.westus.azurecontainerapps.io/ICD10Code
```

 ![image](https://github.com/Mohammad10091998/auto_test_ui/assets/110900901/d1ca1125-225d-46f3-b3f2-03ff85de8883)

 
**url:**  The URL of the API endpoint to test.
 
**apiType:** Specify whether it's a "POST" or "PUT" request.
 
**params:** Provide an array of query parameters, each with a key and a multiple value.
 
**headers::** Specify the headers needed for the API request, such as "Authorization" and "Content-Type."

