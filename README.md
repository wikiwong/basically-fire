# basically fire
This pet project is a WIP and is intended to be a launch pad for personal projects. It originally used Firebase for persistence, that's why it's `basically-fire`

## Note!
I haven't touched this project in years and have not been keeping up with the Firebase project

## MongoDB

[install](https://docs.mongodb.com/getting-started/shell/installation/) and run:

```
sudo mongod
```

## Node

This project was built using Node 8 and NPM5


```
git clone https://github.com/wikiwong/basically-fire.git`

npm i

npm run dev

```

## Docker

```
docker build -t mytag .

docker run -p 8080:8080 mytag

```

## Plans

* Compose MongoDB container with Node service for easy deploy to cloud services
* Switch to styled components
* Finish production build process
* Code split on routes (if necessary)
* Include Jest to promote testing
* Precommit hooks for linting



