# basically fire
This pet project is a WIP and is intended to be a launch pad for personal projects. It originally used Firebase for persistence, hence the randomness of the name :)

## Running the service

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
* Remove Material UI dependenc to update to React 16 (build custom theme)
* Improve CSS Module support in dev mode
* Finish production build process
* Code split on routes (if necessary)
* Include Jest to promote testing
* Precommit hooks for linting



