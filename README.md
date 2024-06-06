# Auto Test 
 
API testing web app powerd by **react**, **firebase** and **.net core web api**.
 
## Overview
 
API Testing UI is a tool created to simplify the process of testing APIs. It provides a graphical user interface for interacting with APIs and includes a powerful backend with algorithms to conduct comprehensive testing, ensuring both positive and negative test scenarios are covered.
 
## Table of Contents
 
- [Usage](#usage)
- [Features](#features)
- [Configurations](#configurations)
 
## Usage
 
### Access Auto Test Application through the following link: [https://auto-test-nine.vercel.app/home] 

## Features

### API Testing UI comes with the following features:

1. **User Friendly Interface:** 
   - User-friendly interface for easy interaction with APIs.

2. **Comprehensive Testing:** 
   - Backend algorithms ensure extensive testing, covering both positive and negative scenarios.
   - Includes features for both automated and manual testing.
   - Supports testing for Post, Put, Get, and Delete API operations.

3. **Collaborative Testing:** 
   - Users can share collections with others, allowing multiple users to work simultaneously on the same collections.
   - Once a collection is shared, other users can either accept or decline it.
   - If one user adds an api to the shared collection, it will be visible to all other collaborators
   - If one user deletes the collection, it remains visible to other collaborators.

4. **Flexible Configuration:** 
   - Easily configure test scenarios and parameters through the UI.
   - For manual testing, you only need to provide your payload or parameters as it is, but for automated testing of your post and put API, you have to configure each property of your payload for better test payload generation.

5. **Detailed Reporting:** 
   - View detailed reports of API test results.
   -  Generate Excel sheets for further analysis, with the option to filter specific result sets.

 ## Configurations
 
## 1. Automated Testing of Post/Put API Call

**1. Input Configuration :**
The input for the automated testing process is a JSON object which is payload of your post/put api, where each field has a data type , a behavior directive (fix or random) and a value (try to keep it as positive for better payload generation). This JSON object serves as a template for generating test payloads for your api.

> [!IMPORTANT]
> "name of the field" : "dataType,behaviour,value" : 
>  AVOID SPACE ANYWHERE WHILE CONFIGURING (EXCEPT IN THE VALUE)

> **behaviour types are -> 1.fix   2. random** 

> [!CAUTION]
> all info of the field and field itself must be in double quotes

> [!TIP]
> Provide positive value of the field for better payload generation

## All supporting data types
#### int 
#### long
#### double
#### float
#### decimal
#### bool
#### datetime
#### guid
#### char
#### string

> [!NOTE]
> If data type you want is not in the above list, use the closest one

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

![image](https://github.com/Mohammad10091998/auto_test_ui/assets/110900901/dfaa62e5-eafa-49fe-8d42-95accb83150b)




 
**url:**  The URL of the API endpoint to test.
 
**apiType::** Specify whether it's a "POST" or "PUT" request.
 
**payload::** Provide a JSON schemas with datatype, behaviour and positive values for all property
 
**headerPairs::** Specify the headers needed for the API request, such as "Authorization" and "Content-Type."
 

 **SAVE THE API AND CLICK ON GEAR ICON TO TEST YOUR API**


## 2. Manual Testing of Post/Put API Call
 
This feature enables users to do tailored testing of their Post/Put APIs  by providing multiple payload on which our application will test the api. Details include:

![image](https://github.com/Mohammad10091998/auto_test_ui/assets/110900901/3dd8fe96-d3fc-4d55-9fc9-a09bea1be5d3)



 
**url:**  The URL of the API endpoint to test.
 
**apiType:** Specify whether it's a "POST" or "PUT" request.
 
**payload pairs:** Provide an array of named JSON schemas on which we will test given api
 
**headerPairs:** Specify the headers needed for the API request, such as "Authorization" and "Content-Type."
 
## 3. Automated Testing of Get/Delete API Call with Query Parameters
 
Our backend algorithm creates a spectrum of test scenarios by dynamically generating values for each query parameter, ensuring a comprehensive assessment of API behavior.

> [!CAUTION]
> When providing url for get or delete api please removed query parameters from the url.

```
example url : https://admin/buyorder
```
 
![image](https://github.com/Mohammad10091998/auto_test_ui/assets/110900901/3305a779-cf20-401e-8e39-cf135cc8da56)


 
**url:**  The URL of the API endpoint to test.
 
**apiType:** Specify whether it's a "POST" or "PUT" request.
 
**params:** Provide an array of query parameters, each with a key and a single value (**value must be positve case for better testing of api**).
 
**headers::** Specify the headers needed for the API request, such as "Authorization" and "Content-Type."
 
## 4. Manual Testing of Get/Delete API Call with Query Parameters
 
The Manual Testing feature in our API Testing UI enhances the testing capabilities for Get/Delete APIs by allowing users to provide multiple values for each query parameter. This empowers users to perform thorough and customized assessments of their APIs under diverse conditions.

> [!CAUTION]
> When providing url for get or delete api please removed query parameters from the url.

```
example url : https://admin.azurecontainerapps/buyorder
```

![image](https://github.com/Mohammad10091998/auto_test_ui/assets/110900901/e79267f2-d9ce-415a-a42d-08f822a7522b)


 
**url:**  The URL of the API endpoint to test.
 
**apiType:** Specify whether it's a "POST" or "PUT" request.
 
**params:** Provide an array of query parameters, each with a key and a multiple value.
 
**headers::** Specify the headers needed for the API request, such as "Authorization" and "Content-Type."

