# Ride-Sharing-api
>NOTE: You must have **Node 16+ and npm** installed.

1- SSH into your server and install node and pm2  

```sh
sudo apt-get install nodejs

```
2- Install pm2  

```sh
sudo npm install -g pm2
```

3- Copy the repository to your server and move into the repository
```sh
git clone  https://github.com/zac-09/ride-sharing
cd ride-sharing
```

4- Edit the .env file and make the changes below

 | Variable | Type | Description |
| --- | --- | --- |
| `PORT` | int | API key for making requests to the backend |
| `MONGO_URI` | string | connect URI to your mongo instance |
| `SECRET_KEY` | string | key used to sign JWT tokens |


*Example*
```
SECRET_KEY=awesome long key
```


5- Install  modules

```sh
npm install
```
6- start application

```sh
npm run start
```

7- Api Documentation
 this API is well documentation using Post man - please find an online copy of the documentation [here](https://documenter.getpostman.com/view/17983518/2s9YC7UCBi#68fd01c9-a606-4631-8138-53a525edaa55)

8- Api Hosting
 this API has been hosted on a dedicated so if you want to save yourself the hustle of hosting and running the app see  [here](https://ride-sharing.onrender.com)

# End