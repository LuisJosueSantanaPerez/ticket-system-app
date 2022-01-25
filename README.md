# Ticket System App 🎟

**Description:**

It is a basic system in which an employee logs in, can create, update and delete tickets, can create an employee, and then can generate a report to obtain the hours worked.

**Feature:**

- **Login:**

  ![Screenshot from 2022-01-23 01-02-38.png](documentation/Screenshot_from_2022-01-23_01-02-38.png)

- **Create a ticket:**

  ![Screenshot from 2022-01-23 01-04-40.png](documentation/Screenshot_from_2022-01-23_01-04-40.png)

- **Create employees:**

 ![Screenshot from 2022-01-25 14-24-03.png](documentation/Screenshot_from_2022-01-25_14-24-03.png)
    
- **Create Time entries:**

  ![Screenshot from 2022-01-23 01-04-56.png](documentation/Screenshot_from_2022-01-23_01-04-56.png)
  ![Screenshot from 2022-01-23 01-07-16.png](documentation/Screenshot_from_2022-01-23_01-07-16.png)
  ![Screenshot from 2022-01-23 01-07-21.png](documentation/Screenshot_from_2022-01-23_01-07-21.png)

- **Reports(Worked):**

  ![Screenshot from 2022-01-23 13-27-49.png](documentation/Screenshot_from_2022-01-23_13-27-49.png)
    
- **Technology I use:**

The ticket system uses Vue Framework, Vue JS is a progressive Javascript framework for developing user interfaces. This framework bases its main core on the view layer with the model-view-controller pattern, allowing to relate the presentation layer with the logical layer of the project in an easy and efficient way.

**Before you start:**
If you have not configured the api it is recommended that you go here [Ticket System Api](https://github.com/Darknet17/ticket-system-api "").

**Installation:**

1. **Clone the repository:**
    
    [`$ https://github.com/Darknet17/ticket-system-app`](https://github.com/Darknet17/ticket-system-app)


 2.  **Execute:** 

```bash
$ npm install
$ npm run serve
# or run the next command for production
$ npm run build
```

 3.  **Add your file** `.env` **:**

 ```bash
 $ cp env.example .env
 ```

 4. **API entry point:**

add your entry point to connect to the api

`VUE_APP_URL_API=http://webserver/api/v1/` <br>

**Docker:**

Now let's build the Docker image of our application: 

```bash
$ docker build -t ticket-system-app/dockerize-ticket-system-app .
```

Now let's build the Docker image of our application:

```bash
$ docker run -it -p 80:80/tcp --rm ticket-system-app/dockerize-ticket-system-app:latest
```

**important**

After you have done the backend and frontend configuration, the user and password is :
`
email:admin@admin.com and password: admin1234
`
then if you want to change it, you log in and go to the employee part and change it to the one you like.
