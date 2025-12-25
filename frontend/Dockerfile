FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port 3000
EXPOSE 3000

# Run Next.js in dev mode
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
