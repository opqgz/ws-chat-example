# Websocket Client-Server Chat
Here is example where shown server and client sides. Participants connecting and disconnecting logging, sending messages and saving them until the next server restart.

# Installing
Open your command shell and type following:
```sh
$ npm install
```

# Starting
Wait until previous command ends, then type
```sh
$ npm run start
```

# Using
Open your web-browser and go to `http://localhost:8080/`
Have fun!

# Advantages and Disadvantages
- Nice design
- Message and user join/leaving logging
- Messages saves only until you restart server
- No authorization, as login used participant `IP`
- Not made for public use, it is just example