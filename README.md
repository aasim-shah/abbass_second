
# API Documentation

### Register User

- **Name:** register_user
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/user/register](#)
  - **Body:**
   ```json
    {
      "firstName": "jhon",
      "lastName": "deo",
      "email": "jhondoe@gmail.com",
      "phone": "123-456-78908",
      "password": "Password@123",
      "dob": "1990-01-01"
    }
   ```
  

### User Login

- **Name:** /api/user/login
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/user/login](#)
  - **Body:**
   ```json
    {
      "email": "jhondoe@gmail.com",
      "password": "Password@123 "
    }
   ```

### Continue with Google

- **Name:** continue_with_GOOGLE
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/user/continue_with_google](#)
  - **Body:**
   ```json
    {
      "fullname": "Jhon Doe",
      "email": "jhondoe@gmail.com",
      "phoneNumber": "2342342342",
      "photoURL": "/uploads/profile_pic.png"
    }
   ```

### Delete User Account

- **Name:** /api/user/delete_user
- **Request:**
  - **Method:** DELETE
  - **URL:** [{{base url}}/api/user/delete_user](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```


## Get User  Details

### User Details by ID

- **Name:** user_details_by_id
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** GET
  - **URL:** [{{base url}}/api/user/getUserById/:user_id](#)
  - **Headers:**
  
  - **URL Parameters:**
   ```json
    {
      "user_id": "User_id"
    }
   ```

### Get User from Token

- **Name:** /api/user/getUserFromToken
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** GET
  - **URL:** [{{base url}}/api/user/getUserFromToken](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```

### Check Business in User Wishlist

- **Name:** check_business_in_user_wishlist
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** GET
  - **URL:** [{{base url}}/api/user/check_businesses_wishlist/:business_id](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```
  - **URL Parameters:**
   ```json
    {
      "business_id": ""
    }
   ```

### Get User Wishlist (All)

- **Name:** get_user_wishlist_all
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** GET
  - **URL:** [{{base url}}/api/user/businesses_wishlist](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```

### Add to Recently Viewed

- **Name:** add_to_recentlyViewed
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/user/add_to_recentlyViewed/:business_id](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```
  - **URL Parameters:**
   ```json
    {
      "business_id": "business_id"
    }
   ```

### Get Recently Viewed Business

- **Name:** get_recentlyViewed_business
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/user/get_recentlyViewed](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```

### Get User Businesses

- **Name:** get_user_businesses
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/user/get/businessess](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```


## Update User

### Change Password

- **Name:** api/user/changePassword -- old->new
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** PUT
  - **URL:** [{{base url}}/api/user/changePassword](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```
  - **Body:**
   ```json
    {
      "oldPassword": "Password@123",
      "newPassword": "Password@12345"
    }
   ```

### Update User by ID

- **Name:** /api/user/update_user/:user_id
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** PUT
  - **URL:** [{{base url}}/api/user/update_user/](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```
  - **Body:**
   ```formdata
    [
      {
        "key": "firstName",
        "value": "jhon",
        "type": "text"
      },
      {
        "key": "profileImage",
        "type": "file",
        "src": "/C:/Users/Blue Tuch/Pictures/Screenshots/Screenshot (1).png"
      },
      {
        "key": "lastName",
        "value": "deo",
        "type": "text"
      },
      {
        "key": "phone",
        "value": "2312141231",
        "type": "text"
      }
    ]
   ```

## Forget Password

### Check Email and Send OTP

- **Name:** check_email and send_otp
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/user/forget_password/check_user/:user_email](#)
  - **URL Parameters:**
   ```json
    {
      "user_email": ""
    }
   ```

### Forget Password - Validate OTP

- **Name:** forget_password/validate_otp
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/user/forget_password/validate_otp](#)
  - **Body:**
   ```json
    {
      "id": "user_id",
      "OTPCODE": "6631"
    }
   ```

### OTP Validated - Request Change Password

- **Name:** otp_validated_now_request_change_password
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/user/forget_password/request_change_password](#)
  - **Body:**
   ```json
    {
      "reset_password_token": "jwt_token",
      "newPassword": "Password@123"
    }
   ```



## Report User by ID

- **Name:** report_user_by_id
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/user/report_user/:report_user_id](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```
  - **Body:**
   ```json
    {
      "text": "some feedback about the reported user",
      "reportOption": "Fraud"
    }
   ```

## Request Customer Support

- **Name:** request customer support
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/user/needs_support](#)
  - **Headers:**
   ```json
    {
      "Authorization": "jwt_token"
    }
   ```
  - **Body:**
   ```formdata
    [
      {
        "key": "name",
        "value": "jhon doe",
        "type": "text"
      },
      {
        "key": "email",
        "value": "jhondoe@gmail.com",
        "type": "text"
      },
      {
        "key": "type",
        "value": "technical",
        "type": "text"
      },
      {
        "key": "issue",
        "value": "hkjhk",
        "type": "text"
      },
      {
        "key": "files",
        "type": "file",
        "src": [
          "/C:/Users/Blue Tuch/Pictures/Screenshots/Screenshot (1).png",
          "/C:/Users/Blue Tuch/Pictures/Screenshots/Screenshot (2).png"
        ]
      }
    ]
   ```



# Business API Documentation

## Create Business

- **Name:** api/business/create
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** POST
  - **URL:** [{{base url}}/api/business/create](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }
    ```
  - **Body:**
    ```json
    {
      "name": "business name",
      "foundationYear": "2010",
      "numberOfOwners": "2",
      "numberOfEmployes": "50",
      "businessDescription": "A leading tech company providing innovative solutions.",
      "images": ["/uploads/1701251549788_Screenshot 2023-03-30 234851.png"],
      "attached_files": ["/uploads/1701251549790_Screenshot 2023-03-19 012240.png", "/uploads/1701251549792_Screenshot 2023-03-30 234851.png"],
      "advantages": ["Cutting-edge technology", "Experienced team"],
      "salePrice": 1000000,
      "financialDetails": [
        { "financialYear": "2022", "revenue": 500000 },
        { "financialYear": "2021", "revenue": 400000 }
      ],
      "country": "USA",
      "city": "San Francisco",
      "address": "123 Main Street",
      "zipcode": "12345",
      "industry": "6566cb3494c27a06a7f99ed5",
      "status": "active",
      "createdBy": "6566e42f96ecdfeed4bbb6d0"
    }
    ```


## Get All Businesses

- **Name:** api/business --get_all
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/business](#)


## Add or Remove Business to Wishlist

- **Name:** add_or_remove_business_to_wishlist
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** GET
  - **URL:** [{{base url}}/api/user/toggle_wishlist/:business_id/REMOVE](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }
    ```
  - **URL Parameters:**
    ```json
    {
      "business_id": ""
    }
    ```


## Get Business Details by ID

- **Name:** get_business_details_by_id
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/business/details/:business_id](#)
  - **URL Parameters:**
    ```json
    {
      "business_id": ""
    }
    ```


## Recently Added Business

- **Name:** recently_added business
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/business/recently_added](#)


## Search Businesses by Title or Description

- **Name:** search --by-titleOrDesc
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/business/search?query=business title](#)
  - **Query Parameters:**
    ```json
    {
      "query": "business title"
    }
    ```


## Filter Businesses by Category ID

- **Name:** filterByCategory/:category_id
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/business/filterByCategory/:category_id](#)
  - **URL Parameters:**
    ```json
    {
      "category_id": ""
    }
    ```


# Broker API Documentation

## Switch to Broker

- **Name:** switch_to_broker
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** POST
  - **URL:** [{{base url}}/api/broker/switch_to_broker](#)
  - **Headers:**
    ```json
    {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzQ0NTIwNWRkYzM3ZjZhYzQxMDZiYyIsImlhdCI6MTcwMjEyMDc4OSwiZXhwIjoxNzAyMjA3MTg5fQ.EmO1zWl1719t90-XUybymMe5CDSUKvd_gIXeRRhkMDI"
    }
    ```
  - **Body:**
    ```json
    {
      "firstName": "Johnxx",
      "lastName" : "doexx",
      "accountStatus": "active",
      "experience": "Senior Broker",
      "education": "Bachelor's in Finance",
      "certificates": ["Certified Broker", "Series 7"],
      "description": "Experienced broker specializing in investment strategies.",
      "website": "http://www.johndoe.com",
      "designation": "Certified Financial Planner",
      "servingArea": {
        "country": "United States",
        "state": "New York",
        "city": "New York City",
        "zipcode": "10001"
      },
      "industries_served": [], 
      "experties": {
        "profession": "Financial Services",
        "yearOfExperience": 10,
        "services_offered": ["Investment Advisory", "Portfolio Management"]
      }
    }
    ```


## Get Brokers List

- **Name:** get_brokers_list
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/broker](#)


## Get Broker by ID

- **Name:** get_broker_by_id
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** GET
  - **URL:** [{{base url}}/api/broker/info/:broker_id](#)
  - **URL Parameters:**
    ```json
    {
      "broker_id": ""
    }
    ```


# Category API Documentation

## Get All Categories

- **Name:** /api/category -- get all categories
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/category](#)


## Create Subcategory

- **Name:** api/category/create_subCategory
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/category/create_subCategory](#)
  - **Body:**
    ```json
    {
      "title": "Laptops",
      "category": "5fc8a1c1b7f5cd2f9eaf207f",
      "icon": "laptop_icon.png",
      "backgroundcolor": "#e74c3c",
      "childSubCategories": [
        "5fc8a1c1b7f5cd2f9eaf2089",
        "5fc8a1c1b7f5cd2f9eaf2090"
      ]
    }
    ```


## Create Category

- **Name:** api/category/create_category
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/category/create_category](#)
  - **Body:**
    ```json
    {
      "title": "Home dsfsdfs",
      "icon": "homedecor_icon.png",
      "backgroundcolor": "#2ecc71",
      "subCategories": [
        "5fc8a1c1b7f5cd2f9eaf2085",
        "5fc8a1c1b7f5cd2f9eaf2086"
      ]
    }
    ```


## Create Child Subcategory

- **Name:** api/category/create_childSubcategory
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/category/create_childSubcategory](#)
  - **Body:**
    ```json
    {
      "title": "keypad phones",
      "category": "6566cb3494c27a06a7f99ed5",
      "subCategory": "6566cc46e7c33a8d7d360abf",
      "icon": "smartphone_icon.png",
      "backgroundcolor": "#3498db"
    }
    ```

# Admin API Documentation

## Change user Account Status

- **Name:** api/user/change-account-status
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** PUT
  - **URL:** [{{base url}}/api/admin/change_account_status/:user_id](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }
    ```
  - **Body:**
    ```json
    {
      "status" : "active"
    }
    ```
  - **URL Parameters:**
    ```json
    {
      "user_id": ""
    }
    ```


## Delete User by ID

- **Name:** deleteuser_by_id
- **Request:**
  - **Auth Type:** No Authentication
  - **Method:** GET
  - **URL:** [{{base url}}/api/admin/deleteUser/:user_id](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }
    ```
  - **URL Parameters:**
    ```json
    {
      "user_id": ""
    }
    ```


# Privacy and Terms API Documentation

## Get Privacy and Terms

- **Name:** get_privacy_and_terms
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/privacy_and_terms/](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }
    ```


## Create Privacy or Terms

- **Name:** create - privacyOrTerms
- **Request:**
  - **Method:** POST
  - **URL:** [{{base url}}/api/privacy_and_terms/create](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }
    ```
  - **Body:**
    ```json
    {
      "title": "Privacy Policy",
      "priority": 1,
      "description": "This is a sample privacy policy document.",
      "version": "1.0",
      "privacyFor": "BOTH",
      "type": "PRIVACY",
      "points": [
        {
          "title": "Introduction",
          "description": "Brief introduction to the privacy policy.",
          "list": [
            {
              "title": "Data Collection",
              "icon": "📊"
            },
            {
              "title": "Data Processing",
              "icon": "⚙️"
            }
          ]
        },
        {
          "title": "User Rights",
          "description": "Explanation of user rights regarding their data.",
          "list": [
            {
              "title": "Access",
              "icon": "🔐"
            },
            {
              "title": "Rectification",
              "icon": "🔄"
            }
          ]
        },
        {
          "title": "Introduction"
        }
      ]
    }
    ```


## Agree to Privacy

- **Name:** agree-to-privacy
- **Request:**
  - **Method:** PUT
  - **URL:** [{{base url}}/api/privacy_and_terms/agree_to_policy](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }
    ```
  - **Body:**
    ```json
    {
      "version" : "1.1.1.2"
    }
    ```


## Delete Privacy by ID

- **Name:** delete-privacy-by-id
- **Request:**
  - **Method:** DELETE
  - **URL:** [{{base url}}/api/privacy_and_terms/deleteOne/:privacy_id](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }
  - **URL Parameters:**
    ```json
    {
      "privacy_id": ""
    }
    ```


## Check User for Privacy and Terms

- **Name:** privacy_and_terms/check_user
- **Request:**
  - **Method:** GET
  - **URL:** [{{base url}}/api/privacy_and_terms/check_user](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }


## Update Privacy by ID

- **Name:** privacy_and_terms/updateOne/:privacy_id
- **Request:**
  - **Method:** PUT
  - **URL:** [{{base url}}/api/privacy_and_terms/updateOne/:privacy_id](#)
  - **Headers:**
    ```json
    {
      "Authorization": "jwt_token"
    }
  - **Body:**
    ```json
    {
      "title": "Privacy Policy 4",
      "priority": 2,
      "description": "This is a sample privacy policy document. 2",
      "version": "1.0.2",
      "privacyFor": "BOTH",
      "type": "PRIVACY",
      "points": [
        {
          "title": "Introduction 2",
          "description": "Brief introduction to the privacy policy. 2",
          "list": [
            {
              "title": "Data Collection 2",
              "icon": "📊"
            },
            {
              "title": "Data Processing",
              "icon": "⚙️"
            }
          ]
        }  
      ]
    }
    ```
  - **URL Parameters:**
    ```json
    {
      "privacy_id": ""
    }
    ```



   

   
