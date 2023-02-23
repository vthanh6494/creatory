## Hong Anh Assignment

### Run local 
- git clone repo
- run ```yarn``` in terminal to install dependencies.
- run ```yarn dev``` in terminal to run local and the project will run at ```localhost:3000```

### 1. Auth - url - ```/```

- Login with username/password ```admin/admin```

##### Usecase:
- when logined, save localstorage with key-value: ```{ "authorization": "true"}```, then redirect user to view page.
- sending empty request to API, showing "wrong username/password" to user.
- getting error from API, showing "Something went wrong" to user

### 2. Create - url - ```/create```

##### Usecase:
- creating successfully, showing "Your account has been created successfully.", and showing link ```Go to home page```
- Submitting empty fields or wrong format, showing messege according to field to user.
- getting error from API, showing "Something went wrong. Please try again" to user

### 3. View - url - ```/details```

##### Usecase:
- Have not logined (don't have key-value: ```{ "authorization": "true"}``` in localstorage, showing ```LoginComponent``` and text "Please login first"
- User logined, but there is no data, showing text "There is no item"
- User logined and data is returned, showing table of data with pagination and page size. Change page number (offset) or page size (limit), force fetch API with new offset and limit.


```
# creatory
