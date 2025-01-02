#Deploy this three-tier blog-writing application using docker-compose
---
##Pre-requisite:
###1. Docker
   ```sudo apt install docker.io```
   Then add the user to the docker daemon,
   ```sudo usermod -aG docker <username-of-your-machine>```
Then restart the machine to reflect the change.

###2. Docker-Compose
   ```sudo apt install docker-compose```
   
#Steps to run the docker-compose command:
---
Step 1 : git clone\
Step 2 : Move inside the project directory\
Step 3 : Run this command,\
```docker-compose up -d```

**Access the application through, localhost:3000**

##Tech Stack:
---
**Frontend**: *Reactjs*
**Backend**: *Django*
**Database**: *mongodb*
**Containerization**: *Docker* 

##Workflow of my three-tire application:
---
- *Home page* is the index page, which has a grid of blogs each having a cover image, description along with published date.
- *Axios* fetches all the blogs from db and render it on home page.
- When a particular blog is clicked, *title of that blog* is send as a prop to filter the blog's content.
- Then using useNavigate hook, we navigate to *documentation page* along with *title, cover image and its content as a state*.
- Using *useLocation* hook we destruct the objects in the *documentation page*.
- In *documentation page*, it dynamically renders content of that blog with *switch-case* logic. *In-page navigation* is provided using *AnchorLink component*.
- Spaces and line breaks formatting are handled in *documentation page*.
- In *home page*, it has a *write-blog* button. Admin only have authorization to write blogs. When the *write-blog* btn is clicked, it navigates to the *Authentication Page*.
- If authenticated, then admin is take to *cover page* or else navigates to the *home page*.
- In *cover page* we can add *title*, *description* and *cover image* for our blog.
- When the *save btn* is clicked, *axios* make *post request* to django endpoints. It has a content type of 'multipart/form-data' because of the combination of *json string and image file*.
- Django *urls.py* check its endpoints and its corresponding *views* are called. It has two views that is *headerView* for handle *cover page* and *inputfieldView* for handle *content page*.
- After performing *serialization* objects are stored in db and send *status code* as a response to *axios*.
- Add media root and media urls in *settings.py* and *urls.py* to serve static images.
- After saving the *cover page*, it navigates to *content page* along with state of *blog title*.
- Here *blog title* is used as a unique identifier to filter the contents.
- *Content page* has *Add heading*, *Add Text*, *Add Code*, *Add image* buttons.
- *Content page* dynamically renders input field with the *switch-case* logic and *Fly-in* animation is applied for input fields.
- *Image preview* is available when uploading the image in the *content page*.
- *Monaco editor* is added, when we write a code.
- When the *Publish Blog* is clicked, it makes a *post request* to django endpoints. Where *image file* is set as a *base64* encoded string.
- In django, *inputfieldView* handles the *content page* request. *Decode the base64* string into image file with blog-title as a name.
- After performing *serialization*, it stores object in a db and send *status code* as a response to axios.
- Using *docker-compose*, we deploy this three-tier application as a *Containerized blog writing application*.

##Defining Frontend Dockerfile
---
1. Use node:20-alpine as a base image
2. Define workdirectory as 'app'
3. Copy source code from host machine to the container
4. Copy all package.json file to the 'app' inside the container
5. Run npm install to install all the packages for this application
6. Expose 3000 as a port
7. Command to start the forntend

##Inside package.json file:
---
1. **monaco editor** : Browser based code editor.
2. **axios** : javascript library used to make http requests. Provides a promise based API for handling requests and responses.
3. **ReactDOM** : It is the library responsible for rendering react components into the DOM.
4. **reactjs** : Opensource javascript library for building user interfaces especially for single-page-application by reusable components.

##Building frontend Dockerfile
---
```docker build -t frontend-blog:version1 . ```

##Creating Network and Volume
---
**1. Create network**
   ```docker network create <network-name>```\
**2. Create a volume**
   ```docker volume create <volume-name>```

##Need for Network:
---
Our host machine has a separate network and our docker container has a separate network. We know that docker has a minimal operating system.
They access resource from the host machine. For that docker initially creates a default bridge network to access resource from host to container.
When having a more than one container, we need a network to communicate with each other. Instead of connecting all the containers by default bridge network, we 
create a dedicated network that will communicate with all other containers. So, the default network will communicate with one container. While, all other 
containers are communicated through newly created network. This ensures security.

##Need for Volume:
---
Without volume, datas are not in persistant. After the container lifecycle, the datas are also deleted. 
With volume, we can make sure to data persistant by creating a volume in the host machine and attach it with the container.
So, after the docker lifecycle the datas are available in the host volume as a local drive. 
We can share this volume throughout the organization. We can also connect a single volume to multiple container.
**Source : "/var/lib/docker/volumes/<volume-name>/_data" inside the host**
**Destination: "/data/db" inside the container**


##Difference between Volume and Bind Mount:
---
Bind mount will create a directory and shares with the container. It binds with the container. So it can't be shared with others. 
But it has a advantage of direct access inside the host machine and the container. It is dependent on that particular host directory. It will reflect the change to container from the host filesystem.
For ex: We create a directory inside /media/ on the host and bind it to the container. We must ensure this path exists and remains consistent whenever we use it.

Whereas, volumes will create a logical storage and attach it with containers. Volumes are completely managed by docker and decoupled from the
host machine, that makes volumes independent and portable. While volumes are managed by Docker, their data can still be accessed on the host machine.


##Inspect Command:
---
```docker volume inspect <volume_name>``` \
```docker network inspect <network_name>```


##Run the frontend container
---

```docker run --name=<container-name> --network=<network-name> -d -p 3000:3000 <frontend-image-name>```

##Defining the Backend Dockerfile:
---

1. Use python:3.10-slim as a base image
2. Define the workdirectory as 'app'
3. copy the source code from host machine to the app
4. copyt the requirements.txt file to the app, which contains the dependencies for this django application
5. RUN pip install -r requirements.txt
6. Expose 8000 as a backend port.
7. Fixing entry point as a python3
8. Then CMD to run this backend application.

##Difference between EntryPoint and CMD:
---

Entrypoint is something, we are fixing to run this application. Here 'python3' is the entry point to run this application and it can't be changed.
While, through CMD we can pass command line arguments to override the parameters. For ex, in CMD I defined this application to run on port 8000 but 
in your machine some other application is running on that same port, for that you can change the port to run this container in your host.
By passing 8000 as a command line argument, it can be dynamically triggered to run the application.


##Requirements.txt file:
---

Using one command, you can get the dependencies needed for your application.\
Move inside the virtual environment directory and give this command,\
```pip freeze > requirements.txt```

##Inside the requirements.txt file:
---
1. **django** : python webframework
2. **django-cors-headers** : It is a Cross-Origin-Resource-sharing. That will allow the other hosts to access our application and vice-versa. We set the hosts which we want to allow.
3. **djangorestframeword** : DRF is toolkit for building Web API's in django. It makes easy to create RESTful API's by providing a set of tools for serialization, authentication, viewsets, routes and more.
4. **pillow** : Python Imaging Library, for image processing tasks. Ex: image uploads
5. **pymongo** : It is a python library for connect to mongoDB.
6. **pytz** : Timezone calculation

##Build the Backend Dockerfile:
---
```docker build -t backend-blog:version1 . ```

##Create a Volume for backend that stores media files:
---
```docker volume create media-volume```

##Run the Backend container:
---
```docker run --name=<container-name> --network=<network-name> --mount source=<volume-name>,target=/app/media -d -p 8000:8000 <backend-image>```

**Here /media is the directory name inside the django app to store the media and /app is the workdir of the container.**


##To access the backend container:
---
```docker exec -it <container-name> bash```

##Run the Mongodb container:
---
```docker run --name=<container-name> --network=<network-name> --mount source=<volume-name>,target=/data/db -d -p 27017:27017 mongo:latest```

##To access the documents inside the mongodb container, make your that your MongoDB container is running:
---
```mongosh --host 0.0.0.0:27017```

##Dump data inside the mongodb container:
---
```docker exec <mongodb-container-name> sh -c 'exec mongodump -d <db-name> --archive' > /location of the host/backup.archive```

##Restore the dumped data:
---
```mongorestore --uri="mongodb://localhost:27017" --archive=/location of the host/backup.archive```

**Now you can access the data right from your local mongodb.**


Defining Docker-Compose file:
---
No need to build and run each container separately. With docker-compose, we specify all the instructions to run this application in a single go. 
Here we specify,
  - Volumes
  - Networks
  - Ports
  - Build




