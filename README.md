# SinBin

A blog created by Golang and React

## Dependency
- Golang
- MongoDB
- Docker(deploy)

## Usage
Get

```
go get github.com/soyking/SinBin
go build
./SinBin

# for post
export BLOG_CODE=your code
```

Build

```
cd static
npm install
npm run watch
```

Deploy

```
# change the {{code}} in Dockerfile
./deploy.sh
```