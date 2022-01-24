# Ticket System App

**Description:**

It is a basic system in which an employee logs in, can create, update and delete tickets, can create an employee, and then can generate a report to obtain the hours worked.

**Feature:**

- **Login:**

  ![Screenshot from 2022-01-23 01-02-38.png](Ticket-System-App/Screenshot_from_2022-01-23_01-02-38.png)
    
- **Create a ticket:**

  ![Screenshot from 2022-01-23 01-04-40.png](Ticket-System-App/Screenshot_from_2022-01-23_01-04-40.png)

- **Create employees:**

- ![Screenshot from 2022-01-23 08-08-88](Ticket-System-App/Screenshot_from_2022-01-23_08-08-88.png)
    
- **Create Time entries:**

  ![Screenshot from 2022-01-23 01-04-56.png](Ticket-System-App/Screenshot_from_2022-01-23_01-04-56.png)
    

- **Reports(Worked):**

  ![Screenshot from 2022-01-23 13-27-49.png](Ticket-System-App/Screenshot_from_2022-01-23_13-27-49.png)
    
- **Technology I use:**

The ticket system uses Vue Framework, Vue JS is a progressive Javascript framework for developing user interfaces. This framework bases its main core on the view layer with the model-view-controller pattern, allowing to relate the presentation layer with the logical layer of the project in an easy and efficient way.

**Installation:**

1. **Clone the repository:**
    
    [`https://github.com/Darknet17/ticket-system-app`](https://github.com/Darknet17/ticket-system-app)
    

 2.  **Execute:** 

```
$ npm install
$ npm run serve
# or run the next command for production
$ npm run build
```

 3.  **Add your file** `.env` **:**

 `cp env.example .env`

 4. **API entry point:**

add your entry point to connect to the api

`VUE_APP_URL_API=http://127.0.0.1:8000/api/v1/`

**Docker:**

Now let's build the Docker image of our application: 

`docker build -t ticket-system-app/dockerize-ticket-system-app .`

Now let's build the Docker image of our application:

`docker run -it -p 80:80/tcp --rm ticket-system-app/dockerize-ticket-system-app:latest`
