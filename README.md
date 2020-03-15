# CLIENT SIDE IMPLEMENTATION JSON UPLOADER

## 
### Installation
npm install

### AFTER-INSTALL
node index
PORT: 8080 

## IMPLEMENTATION
This is a simple in-memory implementation of JSON uploader. Please note that I have not used passport.js for authentication. The idea of using passport.js is standardized through key-matching, but for efficiency of prototype.

I used axios headers and bcrypt.js. Using Passport is fundamentally similar with one exception - passport communicates through cookies, whereas my implementation uses individually hashed request to authenticate for each separate measure. Since this is separate from 'needing' to provide.

Think of this as a workaround for traditionally used authentication systems. It is just as secure (no plain-text passwords over the network) however, since bcrypt is not meant for password encryption, it is not used.
However, for the sake of this implementation, I have used it anyway.No front end designed for the RPS. EVERYTHING IS AUTOMATED. Think of this as a connectionless communication protocol.

It is quick, secure, however, there is no authentication network setup to maintain connectivity.
Ofcourse over the next iteration, there can be many implementational changes, however, that would be through introduction of a middleware, adding a security layer, reducing in-memory load and using a better file format.

**This implementation has been tested and is fully functional.**

The communication between this server and the aws server occurs through axios on a single endpoint. This is also not a good practice, because single endpoints tend to suffer from performance penalties.

Node.js is not a good programming language for multi-threaded operations. I am open to discussing various alternatives that can be used.

We get a response notification about whether the entry has been inserted into the database or if we were unable to do so. Each entry has its corresponding author (think RPi id), and that can be used for identification of different RPis. A good practice here would be to generate a per-device database thus allowing different RPis to remain entirely separate from each other. This is a similar practice as used in virtualization and cloud computing.

## PERSONAL NOTES

This is by no means a production level code. This is a solution that is intended to solve the problem.
Two things I would have done differently, if I was not travelling -
* Implementing a file stream instead of in-memory fileread.
* Implementing a middleware through helmet and cors
* Implementing a database to support authentication
That being said, the current implementation is efficient and quick and authentication-prone. With the exceptional absence of an external authentication endpoint, there is nothing to worry about from implementation standpoint.


## AUTHOR: ADVAIT AMBESKAR

