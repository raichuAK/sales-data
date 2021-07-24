# Render Sales data
## Technical Stack
  * Webcomponent
  * Web dev server
  * Express
## Install nodejs
**Nodejs & git is assumed to be latest & already installed**
_Prefer Docker or self installation depending on workstation_

## Setup of the solution
This application uses port at 8000 & 3000; so keep them available. Kill ( if neccessary ) any running process using these port
You can use
```bash
fuser -k 3000/tcp
```
OR
```
kill -9 $(lsof -t -i:3000)
```

Kill process at 8000
```bash
fuser -k 8000/tcp
```
OR
```
kill -9 $(lsof -t -i:8000)
```

### The code needs to be checked out/cloned/downloaded from 
```bash
git clone https://github.com/raichuAK/sales-data.git
```
Navigate to work directory
```
cd sales-data
```
Do npm install or yarn install
```
npm install
```


##### Run main application
The flow of network:
WebDevServer running at port 8000 --(proxy is used)---> API Express Server running on 3000 

To start the application
```nodejs
npm run web
```
*By default web page is opened in your default browser at http://localhost:8000/public*

#### Optional debug steps
You can check API connection at 
- http://localhost:3000/api/top5perMonth
- http://localhost:3000/api/top30price
- http://localhost:3000/api/makePercent
- http://localhost:3000/api/avgPrice

### Run test tool
```npm
npm run test
```
