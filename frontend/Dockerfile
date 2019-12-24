#### Stage 1: Build the react application
FROM 172.42.42.200:18082/node:12.4.0-alpine as build

LABEL César Magalhães <ceanma@gmail.com>

# Configure the main working directory inside the docker image. 
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT commands.
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install the dependencies. 
# This is a separate step so the dependencies will be cached unless changes to one of those two files are made.
COPY .npmrc package.json package-lock.json ./
RUN echo "registry=http://172.42.42.200:18081/repository/npm-group/" >> .npmrc

RUN npm install --loglevel verbose

# Copy the main application
COPY . ./

# Arguments
ARG API
ARG PROFILE=test
RUN sed -i "s+API_URL+${API}+g" src/environments/environment.${PROFILE}.ts

# Build the application
RUN npm run build

#### Stage 2: Serve the React application from Nginx 
FROM 172.42.42.200:18082/nginx:1.17.0-alpine

LABEL César Magalhães <ceanma@gmail.com>

# Arguments
ARG API
ENV API=${API}

# Copy the react build from Stage 1
COPY --from=build /app/dist/cadferias /var/www

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to the Docker host, so we can access it from the outside.
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]